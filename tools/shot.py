"""Headless screenshots at given scroll offsets via Chrome DevTools Protocol.
usage: python shot.py <url> <width> <height> <out_prefix> <scrollY,...> [js-before]
"""
import sys, json, time, subprocess, base64, urllib.request, os, tempfile, shutil
import websocket

url, W, H, prefix = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
scrolls = sys.argv[5].split(',')
init_wait = float(sys.argv[7]) if len(sys.argv) > 7 else 3.5
pre_js = sys.argv[6] if len(sys.argv) > 6 else ''
port = 9333
profile = tempfile.mkdtemp(prefix='cdp_')
chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome, '--headless=new', f'--remote-debugging-port={port}', f'--user-data-dir={profile}',
                         f'--window-size={W},{H}', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
                         '--disable-gpu', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    for _ in range(50):
        try:
            tabs = json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json'))
            page = next(t for t in tabs if t['type'] == 'page'); break
        except Exception: time.sleep(0.2)
    ws = websocket.create_connection(page['webSocketDebuggerUrl'], suppress_origin=True)
    mid = 0
    def send(method, params=None):
        global mid
        mid += 1
        ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}}))
        while True:
            msg = json.loads(ws.recv())
            if msg.get('id') == mid: return msg.get('result', msg)
    def ev(expr):
        r = send('Runtime.evaluate', {'expression': expr, 'awaitPromise': True, 'returnByValue': True})
        return r.get('result', {}).get('value')
    send('Page.enable'); send('Runtime.enable')
    send('Page.addScriptToEvaluateOnNewDocument', {'source': "window.__errs=[];window.addEventListener('error',e=>__errs.push(e.message+' @'+(e.filename||'')+':'+e.lineno));"})
    send('Emulation.setDeviceMetricsOverride', {'width': W, 'height': H, 'deviceScaleFactor': 1, 'mobile': W < 700})
    send('Page.navigate', {'url': url})
    time.sleep(init_wait)
    ev("document.documentElement.style.scrollBehavior='auto'; document.fonts.ready.then(()=>1)")
    if pre_js: ev(pre_js)
    for y in scrolls:
        if str(y).startswith('t'):
            time.sleep(int(y[1:]) / 1000)
        elif str(y).startswith('e'):
            ev(f"window.scrollTo(0, ({y[1:]})); new Promise(r=>setTimeout(r,60))")
        elif str(y).startswith('s'):
            ev(f"window.scrollTo(0,{y[1:]}); new Promise(r=>setTimeout(r,60))")
        else:
            ev(f"window.scrollTo(0,{y}); new Promise(r=>setTimeout(r,900))")
        shot = send('Page.captureScreenshot', {'format': 'jpeg', 'quality': 80})
        out = f'{prefix}_{y}.jpg'
        open(out, 'wb').write(base64.b64decode(shot['data']))
        print('saved', out, ev('window.scrollY'))
    errs = ev("(window.__errs||[]).join('|')")
    if errs: print('JS ERRORS:', errs)
finally:
    proc.kill(); shutil.rmtree(profile, ignore_errors=True)

"""Print the ribbon's dash state (drawn / reeled-in lengths) at given scroll offsets, headless.
usage: python probe.py <url> <width> <height> <scrollY,...>
"""
import sys, json, time, subprocess, urllib.request, tempfile, shutil, websocket
url, W, H = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
scrolls = [int(s) for s in sys.argv[4].split(',')]
port=9335; profile=tempfile.mkdtemp(prefix='cdp_')
proc=subprocess.Popen([r'C:\Program Files\Google\Chrome\Application\chrome.exe','--headless=new',f'--remote-debugging-port={port}',f'--user-data-dir={profile}',f'--window-size={W},{H}','--hide-scrollbars','--no-first-run','--disable-gpu','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
    for _ in range(50):
        try:
            tabs=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json')); page=next(t for t in tabs if t['type']=='page'); break
        except Exception: time.sleep(0.2)
    ws=websocket.create_connection(page['webSocketDebuggerUrl'],suppress_origin=True); mid=0
    def send(m,p=None):
        global mid; mid+=1; ws.send(json.dumps({'id':mid,'method':m,'params':p or {}}))
        while True:
            r=json.loads(ws.recv())
            if r.get('id')==mid: return r.get('result',r)
    def ev(e):
        r=send('Runtime.evaluate',{'expression':e,'awaitPromise':True,'returnByValue':True}); return r.get('result',{}).get('value', r)
    send('Page.enable'); send('Emulation.setDeviceMetricsOverride',{'width':W,'height':H,'deviceScaleFactor':1,'mobile':False})
    send('Page.navigate',{'url':url}); time.sleep(3.5)
    ev("document.documentElement.style.scrollBehavior='auto'")
    print(ev("""(()=>{const inv=document.getElementById('inverted').getBoundingClientRect().top+scrollY; const bl=document.querySelector('.giant .bl').getBoundingClientRect().top+scrollY; const g=document.getElementById('works-grid'); const gr=g.getBoundingClientRect(); return JSON.stringify({vh:innerHeight, blockTop:inv, baseline:bl, gridTop:gr.top+scrollY, gridBottom:gr.bottom+scrollY, lowerLen:document.getElementById('rib-lower').getTotalLength(), funnelLen:document.getElementById('rib-funnel').getTotalLength(), lowerD:document.getElementById('rib-lower').getAttribute('d')})})()"""))
    for y in scrolls:
        ev(f"window.scrollTo(0,{y}); new Promise(r=>setTimeout(r,1000))")
        print(y, ev("""(()=>{const f=document.getElementById('rib-funnel'), l=document.getElementById('rib-lower'); const bl=document.querySelector('.giant .bl').getBoundingClientRect().top; return JSON.stringify({baselineVy:bl, lower:[l.style.strokeDasharray,l.style.strokeDashoffset], funnel:[f.style.strokeDasharray,f.style.strokeDashoffset]})})()"""))
finally:
    proc.kill(); shutil.rmtree(profile, ignore_errors=True)

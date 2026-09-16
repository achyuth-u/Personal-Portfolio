"""Write the glyph data from logo-data.json into ../logo.js (the `const LOGO = {...};` line).
Run glyphs.py first if the name or the font changed. The ink-trap fill polygons (`fix`) of A and Y
are kept from the existing logo.js. Checks that nothing else in logo.js is touched.
"""
import json, re, os
here = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(here, 'logo-data.json')))
path = os.path.join(here, '..', 'logo.js')
src = open(path, encoding='utf-8').read()
m = re.search(r"const LOGO = (\{.*?\});\n", src, re.S)
old = json.loads(m.group(1))
fixes = {i: L['fix'] for i, L in enumerate(old['letters']) if L.get('fix')}
lastH = [L for L in data['letters'] if L['ch'] == 'H'][-1]
letters = []
for i, L in enumerate(data['letters']):
    entry = {'ch': L['ch'], 'd': L['d'], 'masks': L['masks']}
    if i in fixes: entry['fix'] = fixes[i]
    letters.append(entry)
logo = {'width': data['width'], 'capH': data['capH'], 'stemX': lastH['rightStemX'], 'stemW': lastH['stem'], 'letters': letters}
out = src[:m.start(1)] + json.dumps(logo, separators=(',', ':')) + src[m.end(1):]
open(path, 'w', encoding='utf-8').write(out)
print('logo.js updated' if out != src else 'logo.js unchanged (data identical)')

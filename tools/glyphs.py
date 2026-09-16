"""Extract 'ACHYUTH' outlines from Sora ExtraBold + derive per-letter writing skeletons.
Outputs logo-data.json (font units, y-down, baseline at y=0, cap top at y=-730)."""
import json, math
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

SRC = 'Sora.ttf'; INST = 'Sora-800.ttf'
TEXT = 'ACHYUTH'
f = TTFont(SRC)
inst = instancer.instantiateVariableFont(f, {'wght': 800})
inst.save(INST)
font = TTFont(INST)
gs = font.getGlyphSet()
cmap = font.getBestCmap()
UPM = font['head'].unitsPerEm
CAPH = font['OS/2'].sCapHeight

# ---- shape with HarfBuzz (kerning like the browser) ----
blob = hb.Blob.from_file_path(INST); face = hb.Face(blob); hbf = hb.Font(face)
buf = hb.Buffer(); buf.add_str(TEXT); buf.guess_segment_properties()
hb.shape(hbf, buf, {'kern': True, 'liga': True})
order = font.getGlyphOrder()
pos = []; x = 0
for info, p in zip(buf.glyph_infos, buf.glyph_positions):
    pos.append((order[info.codepoint], x + p.x_offset, p.x_advance)); x += p.x_advance
TOTAL_W = x

# ---- flatten a glyph into polylines (font units, y-up, glyph-local) ----
def flatten(gname, steps=12):
    rec = RecordingPen(); gs[gname].draw(rec)
    contours = []; cur = []; last = None
    for op, args in rec.value:
        if op == 'moveTo':
            if cur: contours.append(cur)
            cur = [args[0]]; last = args[0]
        elif op == 'lineTo':
            cur.append(args[0]); last = args[0]
        elif op == 'qCurveTo':
            pts = list(args)
            if pts[-1] is None: pts = pts[:-1]
            # implied on-curve points between consecutive off-curve points
            offs = pts[:-1]; end = pts[-1]
            p0 = last
            for i, c in enumerate(offs):
                if i < len(offs) - 1:
                    nxt = offs[i + 1]; p2 = ((c[0] + nxt[0]) / 2, (c[1] + nxt[1]) / 2)
                else:
                    p2 = end
                for s in range(1, steps + 1):
                    t = s / steps
                    cur.append(((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p2[0],
                                (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p2[1]))
                p0 = p2
            last = end
        elif op == 'curveTo':
            c1, c2, p3 = args; p0 = last
            for s in range(1, steps + 1):
                t = s / steps
                cur.append(((1-t)**3*p0[0] + 3*(1-t)**2*t*c1[0] + 3*(1-t)*t*t*c2[0] + t**3*p3[0],
                            (1-t)**3*p0[1] + 3*(1-t)**2*t*c1[1] + 3*(1-t)*t*t*c2[1] + t**3*p3[1]))
            last = p3
        elif op in ('closePath', 'endPath'):
            if cur: contours.append(cur); cur = []
    if cur: contours.append(cur)
    return contours

def edges(contours):
    for c in contours:
        for i in range(len(c)):
            yield c[i], c[(i + 1) % len(c)]

def ray_hits(contours, origin, direction):
    """distances t>0 where ray origin+t*dir crosses the outline, sorted, with winding direction."""
    ox, oy = origin; dx, dy = direction; ts = []
    for (x1, y1), (x2, y2) in edges(contours):
        ex, ey = x2 - x1, y2 - y1
        den = dx * ey - dy * ex
        if abs(den) < 1e-9: continue
        t = ((x1 - ox) * ey - (y1 - oy) * ex) / den
        u = ((x1 - ox) * dy - (y1 - oy) * dx) / den
        if t > 0 and 0 <= u < 1: ts.append((t, 1 if den > 0 else -1))
    return sorted(ts)

def _spans(hits):
    """nonzero-winding ink intervals along a ray (Sora overlaps contours, so even-odd is wrong)."""
    out = []; w = 0; start = None
    for t, d in hits:
        prev = w; w += d
        if prev == 0 and w != 0: start = t
        elif prev != 0 and w == 0 and start is not None: out.append((start, t)); start = None
    return out

def spans_h(contours, y):
    return [(-5000 + a, -5000 + b) for a, b in _spans(ray_hits(contours, (-5000, y), (1, 0)))]

def spans_v(contours, x):
    return [(-5000 + a, -5000 + b) for a, b in _spans(ray_hits(contours, (x, -5000), (0, 1)))]

def mid(s): return (s[0] + s[1]) / 2
def bbox(contours):
    xs = [p[0] for c in contours for p in c]; ys = [p[1] for c in contours for p in c]
    return min(xs), min(ys), max(xs), max(ys)

def ring_midline(contours, center, a0, a1, step=4):
    """polar scan from center between angles (deg): midpoint of the OUTERMOST ink span on each ray."""
    pts = []; a = a0
    while (a <= a1 if a1 > a0 else a >= a1):
        r = math.radians(a); d = (math.cos(r), math.sin(r))
        sp = _spans(ray_hits(contours, center, d))
        if sp:
            t_in, t_out = sp[-1]
            m = (t_in + t_out) / 2
            pts.append((center[0] + d[0] * m, center[1] + d[1] * m, t_out - t_in))
        a += step if a1 > a0 else -step
    return pts

def extend(p, q, e):
    """point beyond p, away from q, by e."""
    vx, vy = p[0] - q[0], p[1] - q[1]; L = math.hypot(vx, vy) or 1
    return (p[0] + vx / L * e, p[1] + vy / L * e)

def line_intersect(p1, p2, p3, p4):
    x1, y1 = p1; x2, y2 = p2; x3, y3 = p3; x4, y4 = p4
    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den
    py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den
    return (px, py)

def poly_d(pts):
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)

def smooth_d(pts):
    """Catmull-Rom → cubic Bézier through points."""
    if len(pts) < 3: return poly_d(pts)
    d = f'M{pts[0][0]:.1f} {pts[0][1]:.1f}'
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i > 0 else pts[i]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}'
    return d

# ---- skeletons (glyph-local, y-up) ----
def skeleton(ch, contours):
    x0, y0, x1, y1 = bbox(contours)
    H = y1 - y0
    strokes = []  # (points-or-d, width, kind)
    if ch == 'H':
        sp = spans_h(contours, y0 + H * 0.15); l, r = sp[0], sp[-1]   # below the crossbar: two clean stems
        stem = l[1] - l[0]; cx = (mid(l) + mid(r)) / 2
        bar = [s for s in spans_v(contours, cx)][0]
        e = stem * 0.55
        strokes.append(([ (mid(l), y1 + e), (mid(l), y0 - e) ], stem * 1.45))
        strokes.append(([ (mid(l), mid(bar)), (mid(r), mid(bar)) ], (bar[1] - bar[0]) * 1.5))
        strokes.append(([ (mid(r), y1 + e), (mid(r), y0 - e) ], stem * 1.45))
        meta = {'stem': stem, 'rightStemX': mid(r), 'leftStemX': mid(l)}
    elif ch == 'A':
        lo = spans_h(contours, y0 + H * 0.12); hi = spans_h(contours, y0 + H * 0.55)
        # leg centrelines from two samples each
        L1, L2 = (mid(lo[0]), y0 + H * 0.12), (mid(hi[0]), y0 + H * 0.55)
        R1, R2 = (mid(lo[-1]), y0 + H * 0.12), (mid(hi[-1]), y0 + H * 0.55)
        apex = line_intersect(L1, L2, R1, R2)
        leg_w = (lo[0][1] - lo[0][0])
        e = leg_w * 0.6
        legL = extend(L1, apex, e); legR = extend(R1, apex, e)
        strokes.append(([legL, apex, legR], leg_w * 1.25))
        cx = (x0 + x1) / 2
        vs = spans_v(contours, cx)  # bottom span = crossbar (below the counter)
        bar = vs[0]
        by = mid(bar); bl = spans_h(contours, by)
        strokes.append(([(bl[0][0] + (leg_w * 0.3), by), (bl[-1][1] - (leg_w * 0.3), by)], (bar[1] - bar[0]) * 1.5))
        meta = {'stem': leg_w}
    elif ch == 'T':
        stem_sp = spans_h(contours, y0 + H * 0.4)[0]; stem = stem_sp[1] - stem_sp[0]; sx = mid(stem_sp)
        bar = spans_v(contours, x0 + 40)[-1]; by = mid(bar); bt = bar[1] - bar[0]
        strokes.append(([(x0 - bt * 0.3, by), (x1 + bt * 0.3, by)], bt * 1.4))
        strokes.append(([(sx, by), (sx, y0 - stem * 0.55)], stem * 1.45))
        meta = {'stem': stem}
    elif ch == 'Y':
        top = spans_h(contours, y0 + H * 0.93); midd = spans_h(contours, y0 + H * 0.72)
        L1, L2 = (mid(top[0]), y0 + H * 0.93), (mid(midd[0]), y0 + H * 0.72)
        R1, R2 = (mid(top[-1]), y0 + H * 0.93), (mid(midd[-1]), y0 + H * 0.72)
        j = line_intersect(L1, L2, R1, R2)
        stem_sp = spans_h(contours, y0 + H * 0.15)[0]; stem = stem_sp[1] - stem_sp[0]; sx = mid(stem_sp)
        arm_w = top[0][1] - top[0][0]; e = arm_w * 0.6
        strokes.append(([extend(L1, j, e), j, extend(R1, j, e)], arm_w * 1.2))
        strokes.append(([(j[0], j[1] + stem * 0.2), (sx, y0 - stem * 0.55)], stem * 1.45))
        meta = {'stem': stem}
    elif ch == 'U':
        sp = spans_h(contours, y0 + H * 0.75); l, r = sp[0], sp[-1]; stem = l[1] - l[0]
        cx = (mid(l) + mid(r)) / 2
        # bowl: polar scan around a centre roughly at stem-bottom height
        inner_w = r[0] - l[1]
        cy = y0 + inner_w * 0.5 + stem * 0.5
        ring = ring_midline(contours, (cx, cy), 180, 360, 6)
        pts = [(mid(l), y1 + stem * 0.55), (mid(l), cy)] + [(p[0], p[1]) for p in ring] + [(mid(r), cy), (mid(r), y1 + stem * 0.55)]
        strokes.append((pts, stem * 1.45, 'smooth'))
        meta = {'stem': stem}
    elif ch == 'C':
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        ring = ring_midline(contours, (cx, cy), 26, 334, 4)
        pts = [(p[0], p[1]) for p in ring]
        thick = sum(p[2] for p in ring) / len(ring)
        pts = [extend(pts[0], pts[1], thick * 0.9)] + pts + [extend(pts[-1], pts[-2], thick * 0.9)]
        strokes.append((pts, thick * 1.35, 'smooth'))
        meta = {'stem': thick}
    return strokes, meta

# ---- build output (convert to y-down, absolute x) ----
out = {'upm': UPM, 'capH': CAPH, 'width': TOTAL_W, 'letters': []}
for i, (gname, gx, adv) in enumerate(pos):
    ch = TEXT[i]
    pen = SVGPathPen(gs); tp = TransformPen(pen, (1, 0, 0, -1, gx, 0)); gs[gname].draw(tp)
    d = pen.getCommands()
    contours = flatten(gname)
    strokes, meta = skeleton(ch, contours)
    masks = []
    for s in strokes:
        pts, w = s[0], s[1]; kind = s[2] if len(s) > 2 else 'poly'
        P = [(gx + x, -y) for x, y in pts]
        masks.append({'d': smooth_d(P) if kind == 'smooth' else poly_d(P), 'w': round(w, 1)})
    letter = {'ch': ch, 'd': d, 'x': gx, 'adv': adv, 'masks': masks, 'stem': round(meta['stem'], 1)}
    if ch == 'H': letter['rightStemX'] = round(gx + meta['rightStemX'], 1); letter['leftStemX'] = round(gx + meta['leftStemX'], 1)
    out['letters'].append(letter)
json.dump(out, open('logo-data.json', 'w'), indent=1)
for L in out['letters']:
    print(L['ch'], 'x', L['x'], 'adv', L['adv'], 'stem', L['stem'], 'masks', [(m['w'], len(m['d'])) for m in L['masks']], L.get('rightStemX', ''))
print('total width', TOTAL_W, 'capH', CAPH)

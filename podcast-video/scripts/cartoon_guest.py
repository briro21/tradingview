"""Ubah foto narasumber jadi potret kartun stiker untuk thumbnail.

Usage: python scripts/cartoon_guest.py foto.jpg public/thumbs/guestN.png x0 y0 x1 y1
(x0..y1 = area crop di foto sumber, mis. thumbnail maxres episode asli 1280x720)
Butuh: pip install opencv-python-headless rembg (model rembg ~1 GB diunduh sekali).
"""
import sys, cv2, numpy as np
from PIL import Image
from rembg import remove

src, out, x0, y0, x1, y1 = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
im = Image.open(src).convert("RGB").crop((x0, y0, x1, y1))
# Perbesar agar detail cukup untuk ukuran thumbnail.
scale = 900 / im.height
im = im.resize((int(im.width * scale), 900), Image.LANCZOS)
cut = remove(im)  # RGBA, latar dihapus
a = np.array(cut)
rgb = cv2.cvtColor(a[:, :, :3], cv2.COLOR_RGB2BGR)
alpha = a[:, :, 3]

# 1) Haluskan warna (cel-shading) sambil menjaga tepi.
smooth = rgb.copy()
for _ in range(4):
    smooth = cv2.bilateralFilter(smooth, 9, 60, 9)
# 2) Kuantisasi warna (k-means) agar tampak seperti ilustrasi.
Z = smooth.reshape(-1, 3).astype(np.float32)
_, lab, cen = cv2.kmeans(Z, 18, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0), 3, cv2.KMEANS_PP_CENTERS)
quant = cen.astype(np.uint8)[lab.flatten()].reshape(smooth.shape)
quant = cv2.addWeighted(quant, 0.75, smooth, 0.25, 0)
# 3) Garis tinta dari tepi.
gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)
gray = cv2.medianBlur(gray, 7)
edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 10)
# Buang bintik kecil (noise) agar kulit bersih; sisakan garis yang panjang.
inv = 255 - edges
n, lab2, stats, _ = cv2.connectedComponentsWithStats(inv, 8)
keep = np.zeros_like(inv)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] >= 60:
        keep[lab2 == i] = 255
edges = 255 - keep
toon = cv2.bitwise_and(quant, quant, mask=edges)
toon = cv2.addWeighted(toon, 0.8, quant, 0.2, 0)
# 4) Saturasi + kontras sedikit naik.
hsv = cv2.cvtColor(toon, cv2.COLOR_BGR2HSV).astype(np.float32)
hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.25, 0, 255)
hsv[:, :, 2] = np.clip((hsv[:, :, 2] - 128) * 1.12 + 128 + 6, 0, 255)
toon = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

# 5) Stiker: outline hitam + putih di sekeliling siluet.
m = (alpha > 128).astype(np.uint8) * 255
pad = 40
toon = cv2.copyMakeBorder(toon, pad, pad, pad, pad, cv2.BORDER_CONSTANT, value=0)
m = cv2.copyMakeBorder(m, pad, pad, pad, pad, cv2.BORDER_CONSTANT, value=0)
white = cv2.dilate(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (29, 29)))
black = cv2.dilate(white, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11)))
outrgb = np.zeros_like(toon)
outrgb[white > 0] = (255, 255, 255)
outrgb[m > 0] = toon[m > 0]
outa = black.copy()
outrgb[(black > 0) & (white == 0)] = (20, 20, 20)
res = np.dstack([cv2.cvtColor(outrgb, cv2.COLOR_BGR2RGB), outa])
Image.fromarray(res).save(out)
print("saved", out, res.shape)

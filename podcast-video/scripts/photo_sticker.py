"""Potret foto asli (bukan kartun) sebagai stiker: latar dihapus, garis tepi putih + bayangan tipis.

Usage: python scripts/photo_sticker.py foto.jpg out.png x0 y0 x1 y1 [--mirror]
Pakai hanya foto berlisensi bebas (mis. Wikimedia Commons CC BY / CC BY-SA) dan catat atribusinya.
"""
import sys

import cv2
import numpy as np
from PIL import Image, ImageOps
from rembg import remove

src, out, x0, y0, x1, y1 = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
im = Image.open(src).convert("RGB").crop((x0, y0, x1, y1))
scale = 1000 / im.height
im = im.resize((int(im.width * scale), 1000), Image.LANCZOS)
cut = np.array(remove(im))
alpha = cut[:, :, 3]
# buang pulau kecil di mask (sisa latar)
n, lab, st, _ = cv2.connectedComponentsWithStats((alpha > 128).astype(np.uint8))
if n > 1:
    keep = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
    alpha = np.where(lab == keep, alpha, 0).astype(np.uint8)
pad = 30
H, W = alpha.shape
A = np.zeros((H + 2 * pad, W + 2 * pad), np.uint8); A[pad:pad + H, pad:pad + W] = alpha
rgb = np.zeros((H + 2 * pad, W + 2 * pad, 3), np.uint8); rgb[pad:pad + H, pad:pad + W] = cut[:, :, :3]
# sedikit kontras/saturasi agar foto "pop" di panggung gelap
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV).astype(np.float32)
hsv[:, :, 1] *= 1.08; hsv[:, :, 2] = np.clip((hsv[:, :, 2] - 128) * 1.08 + 132, 0, 255)
rgb = cv2.cvtColor(np.clip(hsv, 0, 255).astype(np.uint8), cv2.COLOR_HSV2RGB)
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))
border = cv2.dilate((A > 128).astype(np.uint8) * 255, k)
border = cv2.GaussianBlur(border, (5, 5), 0)
outimg = np.zeros((A.shape[0], A.shape[1], 4), np.uint8)
outimg[:, :, :3] = 255; outimg[:, :, 3] = border
a = (A.astype(np.float32) / 255)[:, :, None]
outimg[:, :, :3] = (rgb * a + outimg[:, :, :3] * (1 - a)).astype(np.uint8)
# potong rata di bawah (stiker berdiri di tepi bawah frame)
img = Image.fromarray(outimg)
if "--mirror" in sys.argv:
    img = ImageOps.mirror(img)
img.save(out)
print(out, img.size)

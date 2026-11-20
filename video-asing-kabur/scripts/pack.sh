#!/bin/bash
# Kemas satu video ke out/siap-upload/<no>-<slug>/: scripts/pack.sh 19 pesangon
cd "$(dirname "$0")/.."
n=$1; s=$2; d=out/siap-upload/$n-$s; mkdir -p $d
v=out/what-if-$s-send.mp4; [ -f $v ] || v=out/what-if-$s.mp4
ln -f $v $d/$n-video-$s.mp4; ln -f youtube/$s.md $d/judul-deskripsi-tag.md; ln -f input/$s/vo_$s.srt $d/subtitle.srt
for i in 1 2 3; do ln -f youtube/$s-thumb-$i.png $d/thumbnail-$i.png; done; ls -la $d

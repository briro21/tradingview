#!/bin/sh
# Efek suara sederhana yang disintesis sendiri (bebas hak cipta).
set -e
cd "$(dirname "$0")/../public/sfx"
ffmpeg -v error -y -f lavfi -i "anoisesrc=color=pink:d=0.6:a=0.6" -af "highpass=f=300,lowpass=f=4000,afade=t=in:d=0.25,afade=t=out:st=0.3:d=0.3" whoosh.wav
ffmpeg -v error -y -f lavfi -i "sine=f=55:d=1.4" -af "volume=2.5,afade=t=out:st=0.05:d=1.3" boom.wav
ffmpeg -v error -y -f lavfi -i "sine=f=1320:d=0.7" -af "afade=t=out:st=0.02:d=0.65,volume=0.6" ding.wav
ffmpeg -v error -y -f lavfi -i "sine=f=2000:d=0.03" -af "volume=0.7" tick.wav
ffmpeg -v error -y -f lavfi -i "sine=f=70:d=0.18" -af "afade=t=out:st=0.02:d=0.16,volume=3" thump.wav
ffmpeg -v error -y -f lavfi -i "aevalsrc=0.4*sin(2*PI*(500+1500*t)*t):d=0.5" -af "afade=t=out:st=0.3:d=0.2" riser.wav
ffmpeg -v error -y -f lavfi -i "aevalsrc=0.35*sin(2*PI*110*t)*(0.6+0.4*sin(2*PI*0.2*t))+0.25*sin(2*PI*164.8*t)*(0.6+0.4*sin(2*PI*0.13*t))+0.2*sin(2*PI*220*t)*(0.5+0.5*sin(2*PI*0.07*t)):d=60" -af "lowpass=f=900,afade=t=in:d=3,afade=t=out:st=57:d=3" pad.wav
ls

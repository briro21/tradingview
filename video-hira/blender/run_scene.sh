#!/bin/bash
# usage: run_scene.sh NAME SAMPLES RES OUTDIR
cd "$(dirname "$0")"; mkdir -p "$4"
SCENE=$1 /opt/blender/blender -b -P scenes.py -- "$4/$1_" $2 $3 2>&1 | grep -E "Error|Traceback|line [0-9]+, in|Exception" -A2 | head -12

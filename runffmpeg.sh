#!/bin/bash
ffmpeg -i $2 -vf drawtext="fontfile=Xpressive.ttf: text='$1': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.5: boxborderw=5: x=(w-text_w)/10: y=(h-text_h)*4/5" -codec:a copy $3 -y

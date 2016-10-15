#!/bin/bash
ffmpeg -i $2 -ss $4 -t $5 -vf drawtext="fontfile=NotoSansCJKtc-Regular.otf: text='$1': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.5: boxborderw=5: x=(w-text_w)/10: y=(h-text_h)*4/5" -codec:a copy -async 1 -strict -2 $3 -y

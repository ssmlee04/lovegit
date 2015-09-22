#!/bin/sh
RANDOM=$(shuf -i 200-70000 -n 1)
echo $RANDOM  > temp.txt
git add -A
git commit -m '.'
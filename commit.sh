#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu" ]]; then
    # linux
    RANDOM=$(shuf -i 200-70000 -n 1)
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
	RANDOM=$(shuf -i 200-70000 -n 1)
elif [[ "$OSTYPE" == "cygwin" ]]; then
    # POSIX compatibility layer and Linux environment emulation for Windows
	RANDOM=$(shuf -i 200-70000 -n 1)
elif [[ "$OSTYPE" == "msys" ]]; then
    # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
	RANDOM=$(shuf -i 200-70000 -n 1)
elif [[ "$OSTYPE" == "win32" ]]; then
    # I'm not sure this can happen.
	RANDOM=$(shuf -i 200-70000 -n 1)
elif [[ "$OSTYPE" == "freebsd"* ]]; then
    # ...
	RANDOM=$(shuf -i 200-70000 -n 1)
else
    # Unknown.
    RANDOM=$(shuf -i 200-70000 -n 1)
fi
echo $RANDOM  > temp.txt
git add -A
git commit -m '.'
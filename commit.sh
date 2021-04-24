#!/bin/sh

if [ $# -eq 2 ]; then
  git add . && git commit -m "$1" && git push origin "$2"
elif [ $# -eq 1 ]; then
  git add . && git commit -m "$1" && git push origin main
elif [ $# -eq 0 ]; then
  echo "Please Submit a commit Message"
else
  echo  "You have submitted too many parameters"
fi

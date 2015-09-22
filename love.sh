#!/bin/sh
STRING="Hello World"
#print variable on a screen
COMMIT=$1
DATE=$2
EMAIL=$3

git filter-branch -f --env-filter \
    "if [ \$GIT_COMMIT = ${COMMIT} ]
     then
         export GIT_AUTHOR_DATE='$DATE'
         export GIT_COMMITTER_DATE='$DATE'
         export GIT_AUTHOR_EMAIL='$EMAIL'
         export GIT_COMMITTER_NAME='$EMAIL'
     fi"

# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'
# echo 123 > 123.txt
# git add -A
# git commit -m '123'
# echo 234 > 123.txt
# git add -A
# git commit -m '123'

#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

git init
git config user.name "CMTV"
git config user.email "newpetya@inbox.ru"

git remote add upstream "https://$GH_TOKEN@github.com/mc-modding/mc-modding-book.git"
git fetch upstream
git reset upstream/gh-pages

echo "mcmodding.ru" > CNAME

touch .

git add -A .
git commit -m "Automatic book generation based on ${rev}"
git push -q upstream HEAD:gh-pages
#!/bin/bash
npm run build
git add content
git commit -m "Update content"
git add docs
git commit -m "Update docs"
git push

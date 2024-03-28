#!/bin/bash
npm run build
git add content
git commit -m "Update content"
git add public 
git commit -m "Update public"
git push

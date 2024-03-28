const fs = require("fs");
const path = require('path');

const about = require("./about");
const config = require("./config");
const home = require("./home");
const list = require("./list");
const posts = require("./posts");
const tagList = require("./tag_list");

function formatDate(date, locale = 'en-US', options = { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric',
  //hour: 'numeric',
 // minute: '2-digit',
 // hour12: false // This is the key change for 24-hour format
}) {
return date.toLocaleDateString(locale, options);
}

function copyDirectoryRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true }); // Ensure destination exists
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath); 
    }
  }
}

// Set the current date, time, and version in the config.
config.date_time = formatDate(new Date());
config.version = require("../package.json").version;

console.log(config);

// remove the public directory
if (fs.existsSync(config.dev.outdir)) fs.rmdirSync(config.dev.outdir, { recursive: true });
fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
const postArray  = posts.createPostPages();

home.createPagenation(postArray);
list.createAllPostsPage(postArray);
tagList.createTagPages(postArray);
about.createAboutPage();

// copy the static directory to public directory
copyDirectoryRecursive('./static/images', './public/images');
copyDirectoryRecursive('./themes/archie/assets', './public');

// create CNAME file for github pages
if (config.githubCNAME)
  fs.writeFileSync(`${config.dev.outdir}/CNAME`, config.githubCNAME);


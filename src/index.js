#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const config = require("./mod/config");
config.date_time = formatDate(new Date());
config.version = require("../package.json").version;

const home = require("./home");
const allPosts = require("./all_posts");
const posts = require("./posts");
const tagList = require("./tag_list");
const Page = require("./page");

function formatDate(
  date,
  locale = "en-US",
  options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    //hour: 'numeric',
    // minute: '2-digit',
    // hour12: false // This is the key change for 24-hour format
  },
) {
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

function build() {
  // remove the public directory
  if (fs.existsSync(config.dev.outdir))
    fs.rmdirSync(config.dev.outdir, { recursive: true });
  fs.mkdirSync(config.dev.outdir);

  // Create posts in docs/posts
  const postArray = posts.createPostPages();

  home.createPagenation(postArray);
  allPosts.createAllPostsPage(postArray);
  tagList.createTagPages(postArray);

  const aboutPage = new Page("archie", config);
  aboutPage.readSource("about.md");
  aboutPage.generateOutput("page.html", "about");

  // copy the static directory to public directory
  copyDirectoryRecursive("./static/images", "./public/images");
  copyDirectoryRecursive("./themes/archie/assets", "./public");

  // create CNAME file for github pages
  if (config.githubCNAME)
    fs.writeFileSync(`${config.dev.outdir}/CNAME`, config.githubCNAME);

  console.log("Build completed successfully");
}

(() => {
  // Check if 'server' is provided as a runtime argument
  if (process.argv.includes("server")) {
    const express = require("express");

    // Initialize the Express application
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Define a route for the root of the server
    app.use(express.static(config.dev.outdir));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    build();
  }
})();

const fs = require("fs");

const posts = require("./posts");
const about = require("./about");
const config = require("./config");
const home = require("./home");
const list = require("./list");
const tagPage = require("./tag");
const tagList = require("./tag_list");

// Read all markdown articles from content/posts and sort them by date
const articles = posts.renderArticles();

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
posts.createPosts(articles);

home.createPagenation(articles);
list.createAllPostsPage(articles);

const tagMap = tagList.createTagListPage(articles);

for (let [tag, posts] of tagMap) {
  tagPage.createTagPage(tag, posts);
}

// Create about page
about.createAbout(config.dev.about);


const fs = require("fs");

const postMethods = require("./posts");
const aboutMethod = require("./about");
const config = require("./config");
const addHomePage = require("./homepage");
const addListPage = require("./list");

function gatherTags(posts) {
  const tags = new Set();
  posts.forEach(post => {
    const tagArray = post.attributes.tags.split(",");
    tagArray.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// Read all markdown articles from content/posts and sort them by date
const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => postMethods.readArticle(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
postMethods.createPosts(posts);

addHomePage(posts);
addListPage(posts);

// Create tags page
const tags = gatherTags(posts);
console.log(tags);

// Create about page
const about = aboutMethod.readAbout(config.dev.about);
aboutMethod.createAbout(about);


const fs = require("fs");

const postMethods = require("./posts");
const aboutMethod = require("./about");
const config = require("./config");
const addHomePage = require("./homepage");
const createAllPostsPage = require("./list");
const createTagPage = require("./tag");
const createTagListPage = require("./tag_list");
const { create } = require("domain");

function gatherTags(posts) {
  const tags = new Map(); // Changed to a Map
  posts.forEach(post => {
    const tagArray = post.attributes.tags.split(",");
    tagArray.forEach(tag => {
      tag = tag.trim(); // Remove leading and trailing whitespace
      if (!tags.has(tag)) {
        tags.set(tag, []); // Initialize an empty array for new tags
      }
      tags.get(tag).push({path: post.path,
        title: post.attributes.title, date: post.attributes.date, description: post.attributes.description
      });
    });
  });
 
  // Convert Map to desired output 
  return tags;
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
createAllPostsPage(posts);

// Create tags page
const tagMap = gatherTags(posts);
console.log(tagMap);

/*tagMap.forEach((value, key) => {
  console.log(`Key: ${key}, Values: ${value}`);
});*/

createTagListPage(tagMap);

for (let [tag, posts] of tagMap) {
  console.log(tag, posts);
  createTagPage(tag, posts);
}

// Create about page
const about = aboutMethod.readAbout(config.dev.about);
aboutMethod.createAbout(about);


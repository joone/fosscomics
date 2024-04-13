const fs = require("fs");

const tagPage = require("./tag");

function gatherTags(posts) {
  const tags = new Map(); // Changed to a Map
  posts.forEach((post) => {
    // const tagArray = post.attributes.tags.split(",");
    post.tags.forEach((tag) => {
      if (!tags.has(tag)) {
        tags.set(tag, []); // Initialize an empty array for new tags
      }
      tags.get(tag).push({
        path: post.path,
        title: post.title,
        date: post.date,
        description: post.description,
      });
    });
  });

  // Convert Map to desired output
  return tags;
}

function createTagPages(articles, pageBase) {
  //tagArray = Array.from(tags.keys());

  const tagMap = gatherTags(articles);

  let tagArray = [];
  for (let [tag, posts] of tagMap) {
    //console.log(tag, posts);
    tagArray.push({
      name: tag,
      path: tag.replace(/\s+/g, "_"),
      count: posts.length,
    });
  }

  tagArray.sort((a, b) => a.name.localeCompare(b.name));

  if (!fs.existsSync(`${pageBase.config.dev.outdir}/tags/`))
    fs.mkdirSync(`${pageBase.config.dev.outdir}/tags/`);

  const data = { tags: tagArray, pageTitle: "All tags" };
  (pageBase.url = `${pageBase.config.blogsite}/tag_list.html`),
    (pageBase.title = `${pageBase.config.blogName}: ${data.pageTitle}`),
    fs.writeFile(
      `${pageBase.config.dev.outdir}/tags/index.html`,
      pageBase.generateHTML("./themes/archie/layouts/tag_list.html", data),
      (e) => {
        if (e) throw e;
        console.log(`tags/index.html for tags was created successfully`);
      },
    );

  for (let [tag, posts] of tagMap) {
    tagPage.createTagPage(tag, posts, pageBase);
  }
}

module.exports = {
  createTagPages: createTagPages,
};

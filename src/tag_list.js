const fs = require("fs");

const PageBase = require("./mod/page_base");
const TagPage = require("./tag");

module.exports = class TagList extends PageBase {
  constructor(config) {
    super(config);
  }

  gatherTags(posts) {
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

  createPages(articles, pageBase) {
    //tagArray = Array.from(tags.keys());

    const tagMap = this.gatherTags(articles);

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

    if (!fs.existsSync(`${this.config.dev.outdir}/tags/`))
      fs.mkdirSync(`${this.config.dev.outdir}/tags/`);

    const data = { tags: tagArray, pageTitle: "All tags" };
    (this.url = `${this.config.blogsite}/tag_list.html`),
      (this.title = `${this.config.blogName}: ${data.pageTitle}`),
      fs.writeFile(
        `${this.config.dev.outdir}/tags/index.html`,
        this.generateHTML("./themes/archie/layouts/tag_list.html", data),
        (e) => {
          if (e) throw e;
          console.log(`tags/index.html for tags was created successfully`);
        },
      );

    const tagPage = new TagPage(this.config);
    for (let [tag, posts] of tagMap) {
      tagPage.createPages(tag, posts);
    }
  }
};

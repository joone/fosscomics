const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

const listpage = (posts, pageTitle) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="/styles/fonts.css">
        <link rel="stylesheet" href="/styles/main.css">
        <link rel="icon" type="image/png" href="/images/favicon.png">
        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}: ${pageTitle}</title>
        ${common.openGraph(
          "website",
          config.blogName,
          `${config.blogsite}/posts.html`,
          `${config.blogName}: ${pageTitle}`,
          config.blogDescription,
          config.image,
        )}
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  <a href="/">Home</a>
                  ${pageTitle}
                  <a href="/about">About</a>
                  <a href="/tags">Tags</a>
                </nav>
            </header>
              <h1 class="page-title">${pageTitle}</h1>
              <ul class="posts">
                ${posts
                  .map(
                    (post) => `<li class="post">
                    <a href="/${post.path}">${post.title}</a><span class="meta">
                        ${new Date(post.date).toDateString()}</span>
                    </li>`,
                  )
                  .join("")}
              </ul>
            <footer>
              ${common.footer()}
            </footer>
        </div>
    </body>
</html>
`;

const createAllPostsPage = (posts) => {
  const pageTitle = "All posts";
  if (!fs.existsSync(`${config.dev.outdir}/all_posts/`))
    fs.mkdirSync(`${config.dev.outdir}/all_posts/`);
  fs.writeFile(
    `${config.dev.outdir}/all_posts/index.html`,
    listpage(posts, pageTitle),
    (e) => {
      if (e) throw e;
      console.log(`posts.html was created successfully`);
    },
  );
};

module.exports = {
  createAllPostsPage: createAllPostsPage,
};

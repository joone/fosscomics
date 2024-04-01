const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // For US English format
}

const homepage = (posts, prev, next) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/fonts.css">
        <link rel="stylesheet" href="/styles/main.css">
        <link rel="icon" type="image/png" href="/images/favicon.png">
        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}</title>
        <meta name="description" content="${config.blogDescription}" />
        ${common.openGraph(
          "website",
          config.blogName,
          config.blogsite,
          config.blogName,
          config.blogDescription,
          config.image,
        )}
        <! -- Twitter Card -->
        ${common.twitterCard(
          "summary",
          config.siteTwitter,
          config.authorTwitter,
          config.blogName,
          config.blogDescription,
          config.image,
        )}
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  Home
                  <a href="/all_posts">All posts</a>
                  <a href="/about">About</a>
                  <a href="/tags">Tags</a>
                </nav>
            </header>

            <main class="list">
              <div class="site-description">
                <p>Comics about Free and Open Source Software</p>
              </div>
                ${posts
                  .map(
                    (post) => `<section class="list-item">
                    <h1><a href="/${post.path}">${
                      post.attributes.title
                    }</a></h1>
                        <time>${formatDate(new Date(post.attributes.date))}</time>
                      <div class="responsive-image">
                         <img src="/${post.path}/images/${post.attributes.image}" alt="${post.attributes.title}">
                      </div>
                      <div class="description">${post.attributes.description}</div>
                      <a class="readmore" href="/${post.path}">Read more ⟶</a>
                    </section>`,
                  )
                  .join("")}
              <ul class="pagination">
                <span class="page-item page-prev">
                ${prev ? `<a href="/page/${prev}.html" class="page-link" aria-label="Previous"><span aria-hidden="true">← Prev</span></a>` : `<span class="page-link disable-link" aria-label="Previous"><span aria-hidden="true">← Prev</span></span>`}
                </span>
                <span class="page-item page-next">
                ${next ? `<a href="page/${next}.html" class="page-link" aria-label="Next"><span aria-hidden="true">Next →</span></a>` : `<span class="page-link disable-link" aria-label="Next"><span aria-hidden="true">Next →</span></span>`}
                </span>
              </ul>
            </main>
            <footer>
              ${common.footer()}
            </footer>
        </div>
    </body>
</html>
`;

const createHomePage = (posts) => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), (e) => {
    if (e) throw e;
    console.log(`index.html for home was created successfully`);
  });
};

const createPagenation = (posts) => {
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);

  if (fs.existsSync(`${config.dev.outdir}/page`))
    fs.rmdirSync(`${config.dev.outdir}/page`, { recursive: true });

  fs.mkdirSync(`${config.dev.outdir}/page`);

  // copy content/page/1.html to docs/page/1.html
  if (fs.existsSync(`${config.dev.content}/page/1.html`))
    fs.copyFileSync(
      `${config.dev.content}/page/1.html`,
      `${config.dev.outdir}/page/1.html`,
    );

  for (let i = 0; i < numPages; i++) {
    const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage);

    let filePath;
    if (i === 0) {
      filePath = `${config.dev.outdir}/index.html`;
    } else {
      filePath = `${config.dev.outdir}/page/${i + 1}.html`;
    }
    const prev = i - 1 >= 0 ? i : null;
    const next = i + 1 < numPages ? i + 2 : null;

    console.log("prev", prev, "next", next);
    fs.writeFile(`${filePath}`, homepage(pagePosts, prev, next), (e) => {
      if (e) throw e;
      console.log(`page/${i + 1}.html was created successfully`);
    });
  }
};

module.exports = {
  createHomePage: createHomePage,
  createPagenation: createPagenation,
};

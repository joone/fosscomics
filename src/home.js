const config = require("./config");
const fs = require("fs");

const homepage = (posts, prev, next) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/styles/fonts.css">
        <link rel="stylesheet" href="/assets/styles/main.css">
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M0CWE9F5HJ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M0CWE9F5HJ');
        </script>
        <title>${config.blogName}</title>
        <meta name="description" content="${config.blogDescription}" />
        <meta property="article:author" content="${config.authorName}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${config.blogsite}" />
        <meta property="og:title" content="${config.blogName}" />
        <meta property="og:description" content="${config.blogDescription}" />
        <meta property="og:image" content="${config.image}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="${config.blogsite}" />
        <meta name="twitter:title" content="${config.blogName}" />
        <meta name="twitter:description" content="${config.blogDescription}" />
        <meta name="twitter:image" content="${config.image}" />
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  <a href="/">Home</a>
                  <a href="/posts.html">All posts</a>
                  <a href="/about.html">About</a>
                  <a href="/tags">Tags</a>
                </nav>
            </header>

            <main class="list">
              <div class="site-description">
                <p>Comics about Free and Open Source Software</p>
              </div>
                ${posts
                  .map(
                    post => `<section class="list-item">
                    <h1><a href="./${post.path}">${
                      post.attributes.title
                    }</a></h1>
                        <time>${new Date(
                          post.attributes.date
                        ).toDateString()}</time>
                      <div class="responsive-image">
                         <img src="/${post.path}/images/${post.attributes.image}" alt="${post.attributes.title}">
                      </div>
                      <div class="description">${post.attributes.description}</div>
                    </section>`
                  )
                  .join("")}
            </main>
            <nav role="navigation" class="post-navigation">
              <h1 class="assistive-text">Post navigation</h1>
              ${prev ? `<div class="nav-previous"><a href="/page/${prev}.html"><span class="meta-nav">←</span>prev</a></div>` : `<div class="nav-previous disable-link"><span class="meta-nav">←</span>prev</div>`}
              ${next ? `<div class="nav-next"><a href="page/${next}.html">next<span class="meta-nav">→</span></a></div>` : `<div class="nav-next disable-link">next<span class="meta-nav">→</span></div>`}
            </nav>

            <footer>
              <div style="display:flex">
                <a class="soc" href="https://github.com/joone/fosscomics" rel="me" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                <a class="border"></a><a class="soc" href="https://twitter.com/fosscomics/" rel="me" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a class="border"></a>
              </div>
              <div class="footer-info">
                ${`© ${new Date().getFullYear()} ${
                  config.authorName
                } |  <a href="https://github.com/joone/archie">Archie Theme</a> | Built with <a href="https://github.com/joone/fosscomics">fosscomics</a>`}
              </div>
            </footer>
        </div>
    </body>
</html>
`;

const createHomePage = posts => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), e => {
    if (e) throw e;
    console.log(`index.html for home was created successfully`);
  });
};

const createPagenation = posts => {
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);


  if (fs.existsSync(`${config.dev.outdir}/page`))
    fs.rmdirSync(`${config.dev.outdir}/page`, { recursive: true });

  fs.mkdirSync(`${config.dev.outdir}/page`);

   // copy content/page/1.html to docs/page/1.html
   if (fs.existsSync(`${config.dev.content}/page/1.html`))
   fs.copyFileSync(`${config.dev.content}/page/1.html`, `${config.dev.outdir}/page/1.html`);

  for (let i = 0; i < numPages; i++) {
    const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage);

    let filePath;
    if (i === 0) {
      filePath = `${config.dev.outdir}/index.html`;
    } else {
      filePath = `${config.dev.outdir}/page/${i + 1}.html`;
    }
    const prev = i-1 >= 0 ? i : null;
    const next = i+1 < numPages ? i + 2: null;

    console.log('prev', prev, 'next', next)
    fs.writeFile(`${filePath}`, homepage(pagePosts, prev, next), e => {
        if (e) throw e;
        console.log(`page/${i + 1}.html was created successfully`);
      }
    );
  }
}

module.exports = {
  createHomePage: createHomePage,
  createPagenation: createPagenation
};


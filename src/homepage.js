const config = require("./config");
const fs = require("fs");

const homepage = posts => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="./assets/styles/fonts.css">
        <link rel="stylesheet" href="./assets/styles/main.css">
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M0CWE9F5HJ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M0CWE9F5HJ');
        </script>
        <title>${config.blogName}</title>
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  Home
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
                      <div class="description">${post.attributes.description}</div>
                    </section>`
                  )
                  .join("")}
            </main>

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
    console.log(`index.html was created successfully`);
  });
};

module.exports = createHomePage;

const googleAnalytics = (trackingId) => {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${trackingId}");
        </script>`;
};

// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
const twitterCard = (card, site, creator, title, description, image) => {
  return `<meta name="twitter:card" content="${card}" />
        <meta name="twitter:site" content="${site}" />
        <meta name="twitter:creator" content="${creator}" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />`;
};

// https://ogp.me/
const openGraph = (
  type,
  siteName,
  url,
  title,
  description,
  image,
  articleObj,
) => {
  const result = `<meta property="og:type" content="${type}" />
        <meta property="og:site_name" content="${siteName}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />`;

  if (type === "article" && articleObj) {
    return (
      result +
      `
        <meta property="article:author" content="${articleObj.authorName}" />
        <meta property="article:published_time" content="${articleObj.publishedDate}" />
        ${articleObj.tags.map((tag) => `<meta property="article:tag" content="${tag}">`).join("\n        ")}`
    );
  }
  return;
};

module.exports = {
  googleAnalytics,
  twitterCard,
  openGraph,
};

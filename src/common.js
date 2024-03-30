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

module.exports = {
  googleAnalytics,
  twitterCard,
};

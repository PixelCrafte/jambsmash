/** @type {import('next-sitemap').IConfig} */
// import products from './components/products';
// import allGuides from './components/guides';

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.jambsmash.co.zw',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  trailingSlash: false,
    exclude: [
        '/not-found',
        '/error',
    ],
}
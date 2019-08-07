// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { onCreateBabelConfig } = require('./gatsby/onCreateBabelConfig');
const { onCreateWebpackConfig } = require('./gatsby/onCreateWebpackConfig');
const { onCreateNode } = require('./gatsby/onCreateNode');
const { onCreateDevServer } = require('./gatsby/onCreateDevServer');
const { onCreatePage } = require('./gatsby/onCreatePage');
const { createPages } = require('./gatsby/createPages');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateBabelConfig = onCreateBabelConfig; // babel
exports.onCreateWebpackConfig = onCreateWebpackConfig; // aliases
exports.onCreateNode = onCreateNode; // node transformations
exports.onCreateDevServer = onCreateDevServer; // netlify CMS setup
exports.onCreatePage = onCreatePage; // dynamic pages setup
exports.createPages = createPages; // automatic pages

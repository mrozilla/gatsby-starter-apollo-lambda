// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreatePage = ({ page, actions }) => {
  // serve the src/pages/app.js file
  if (page.path.match(/^\/app/)) {
    // for all pages with url or /u/*
    page.matchPath = '/u/*'; // eslint-disable-line no-param-reassign

    actions.createPage(page);
  }
};

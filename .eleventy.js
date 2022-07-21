const htmlMinifier = require('html-minifier');

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  eleventyConfig.addPassthroughCopy('./src/images/**/*');
  eleventyConfig.addPassthroughCopy('./src/favicon.svg');

  eleventyConfig.addTransform('minifyHtml', (content, outputPath) => {
    if (outputPath && (outputPath.endsWith('.html') || outputPath.endsWith('.xml'))) {
      return htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
    }

    return content;
  });

  return {
    dir: {
      input: './src'
    },
    templateFormats: [
      'njk'
    ]
  };
};
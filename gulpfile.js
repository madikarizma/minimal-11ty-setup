const { dest, series, src, watch } = require('gulp');
const del = require('del');
const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const srcDir = './src';
const outputDir = './dist';

const deleteOutputDirectory = () => {
  return del([
    outputDir
  ]);
};

const bundleCss = () => {
  return src(`${srcDir}/css/main.css`)
    .pipe(postcss())
    .pipe(rename('bundle.css'))
    .pipe(dest(`${outputDir}/css/`));
};

const bundleJavaScript = async () => {
  const bundle = await rollup({
    input: `${srcDir}/js/main.js`,
    plugins: [
      nodeResolve()
    ]
  });

  return bundle.write({
    file: `${outputDir}/js/bundle.js`,
    format: 'iife',
    plugins: [
      terser()
    ]
  });
};

const watchDevTasks = () => {
  watch([
    'tailwind.config.js',
    `${srcDir}/**/*.css`,
    `${srcDir}/**/*.js`,
    `${srcDir}/**/*.njk`
  ], bundleCss);

  watch([
    `${srcDir}/**/*.js`
  ], bundleJavaScript);
};

exports.devTasks = series(
  deleteOutputDirectory,
  bundleCss,
  bundleJavaScript,
  watchDevTasks
);

exports.buildTasks = series(
  deleteOutputDirectory,
  bundleCss,
  bundleJavaScript
);
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    files: `${buildFolder}/files/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{svg,jpg,jpeg,png,gif,webp}`,
  },
  clean: [`${buildFolder}/`],
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: "",
};

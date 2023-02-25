import gulp from "gulp";
// импорт рутей
import { path } from "./gulp/config/path.js";
// импорт плагинов
import {plugins } from "./gulp/config/plugin.js"

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
};

import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import{reset} from './gulp/tasks/reset.js'
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { fontsStyle,otfToTtf,ttfToWoff } from "./gulp/tasks/fonts.js";

function watcher() { // следит за файлами
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task("default", dev);

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from "gulp-rename" // переименование файлов
import cleanCss from "gulp-clean-css" // Сжфтие css файла
import webpcss from "gulp-webpcss" // Вывод WEB изображений // не будет работать без npm i -D webp-converter@2.2.3
import autoprefixer from "gulp-autoprefixer" // Добавление вендарных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиазапросов

const sass = gulpSass(dartSass)

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          massege: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(webpcss(
        {
            webpClass: '.webp',
            moWebpClass: '.no-webp'
        }
    ))
    .pipe(autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true,
    }))
    // Раскоментить если нужен не сжатый файл
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};

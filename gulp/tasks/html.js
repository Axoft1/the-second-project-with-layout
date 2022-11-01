import fileinclude from "gulp-file-include"; // собирает все html в один html
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // сжимает изображение в один формат
import versionNumber from "gulp-version-number"; // не позволяет кэшировать в браузере

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          massege: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileinclude())
    .pipe(webpHtmlNosvg())
    .pipe(
      versionNumber({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
};

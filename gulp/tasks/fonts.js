import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cd);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeigth = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeigth.toLowerCase() === "thin") {
              fontWeigth = 100;
            } else if (fontWeigth.toLowerCase() === "extralight") {
              fontWeigth = 200;
            } else if (fontWeigth.toLowerCase() === "light") {
              fontWeigth = 300;
            } else if (fontWeigth.toLowerCase() === "regular") {
              fontWeigth = 400;
            } else if (fontWeigth.toLowerCase() === "medium") {
              fontWeigth = 500;
            } else if (fontWeigth.toLowerCase() === "semibold") {
              fontWeigth = 600;
            } else if (fontWeigth.toLowerCase() === "bold") {
              fontWeigth = 700;
            } else if (
              fontWeigth.toLowerCase() === "extrabold" ||
              fontWeigth.toLowerCase() === "heavy"
            ) {
              fontWeigth = 800;
            } else if (fontWeigth.toLowerCase() === "black") {
              fontWeigth = 900;
            } else {
              fontWeigth = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeigth};\n\t font-style: normal;\n}\r\n`,
              cd
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("Фаил уже scss/fonts.scss существует. Удалите файл");
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cd() {}
};

import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // Сообщения (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from 'gulp-newer'

export const plugins = {
  notify: notify,
  plumber: plumber,
  browsersync: browsersync,
  newer: newer,
};

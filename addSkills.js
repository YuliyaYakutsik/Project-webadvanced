'use strict';

/*
 Задача скрипта - создать базу навыков
*/

//подключаем модули
const mongoose = require('mongoose');
const config = require('./config');
const skills = require('./models/skills.json');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:12345@ds149221.mlab.com:49221/yuliyayakutsik');
// mongoose
//   .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
//     user: config.db.user,
//     pass: config.db.password
//   })
//   .catch(e => {
//     console.error(e);
//     throw e;
//   });

require('./models/db-close');
require('./models/skills');
let Model = mongoose.model('skills');
Model.remove({}).then(() => {
  skills.forEach(item => {
    let recordDb = new Model({ section: item.name, items: item.items });
    recordDb.save().then(
      //обрабатываем и отправляем ответ в браузер
      i => {
        console.log('Запись успешно добавлена');
      },
      e => {
        //если есть ошибки, то получаем их список и так же передаем в шаблон
        const error = Object.keys(e.errors)
          .map(key => e.errors[key].message)
          .join(', ');

        console.log('При добавление записи произошла ошибка: ' + error);
      }
    );
  });
});
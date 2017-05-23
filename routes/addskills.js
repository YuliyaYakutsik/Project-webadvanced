'use strict';

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    //то всё хорошо :)
    return next();
  }
  //если нет, то перебросить пользователя на главную страницу сайта
  res.redirect('/');
};

router.post('/', (req, res) => {
  //получаем модель навыков
  let Model = mongoose.model('skills');
  //создаем массив, в который будем складывать навыки, которые нужно сохранить
  let models = req.body;
  let prom = [];
  let count = 0;
  for (let i in models) {
    prom[count++] = Model.update(
      { section: i },
      {
        $set: {
          items: models[i]
        }
      }
    );
  }
  Promise.all(prom).then(
    data => {
      res.json({ status: 'Навыки успешно обновлены' });
    },
    e => {
      //если есть ошибки, то получаем их список и так же передаем в шаблон
      const error = Object.keys(e.errors)
        .map(key => e.errors[key].message)
        .join(', ');
      res.json({
        status: 'При добавление записи произошла ошибка: ' + error
      });
    }
  );
});

module.exports = router;
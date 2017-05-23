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

router.get('/', isAdmin, function(req, res) {
  let obj = {
    title: 'Admin page'
  };
  Object.assign(obj, req.app.locals.settings);
  let Model = mongoose.model('skills');
  Model.find({}).then(
    items => {
      Object.assign(obj, { items: items });
      res.render('pages/admin', obj);
    },
    e => {
      console.log(e.message);
    }
  );
});

module.exports = router;
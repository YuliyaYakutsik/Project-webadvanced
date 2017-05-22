'use strict';

const express = require('express');
const router = express.Router();
const content = require('../content.json');
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

router.get('/', isAdmin, function (req, res) {
  let obj = {
    title: 'Admin page',
    skills: content.skills
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});

module.exports = router;
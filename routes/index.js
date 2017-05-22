'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'Main page'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

module.exports = router;
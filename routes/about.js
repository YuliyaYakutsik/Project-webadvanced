'use strict';

const express = require('express');
const content = require('../models/skills.json');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  let obj = {
    title: 'About page'
  };
  Object.assign(obj, req.app.locals.settings);
  let Model = mongoose.model('skills');
  Model
  	.find()
  	.then(items => {
      Object.assign(obj, { items: items });
      res.render('pages/about', obj);
    },
    e => {
      console.log(e.message);
    }
  );
});

module.exports = router;
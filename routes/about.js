const express = require('express');
const content = require('../content.json');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'About page',
    skills: content.skills
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/about', obj);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  let obj = {
    title: 'Blog page'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model1 = mongoose.model('pic');
  Model1
    .find()
    .then(pics => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      Object.assign(obj, {pics: pics});
    });
  const Model2 = mongoose.model('blog');
    //получаем список записей в блоге из базы
  Model2
    .find()
    .then(items => {
    	// обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
    	// записей в блоге
    	Object.assign(obj, {items: items});
    	res.render('pages/blog', obj);
	});
});

module.exports = router;
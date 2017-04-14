'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function() {
      return $.gulp.src('./source/sprite/*.{png,gif}')
      .pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        imgPath: '../../images/sprite.png'
      }))
      .pipe($.gp.if('*.png', $.gulp.dest('./source/images/')))
      .pipe($.gp.if('*.scss', $.gulp.dest('./source/style/common/')));
  })
};
// const gulp = require("gulp");
//
// // 画像を圧縮するプラグインの読み込み
// const imagemin = require("gulp-imagemin");
// const mozjpeg = require("imagemin-mozjpeg");
// const pngquant = require("imagemin-pngquant");
// const changed = require("gulp-changed");
//
// // srcImgフォルダのjpg,png画像を圧縮して、distImgフォルダに保存する
// gulp.task("default", function() {
//   return gulp
//     .src("./img/*.{png,jpg}") // srcImgフォルダ以下のpng,jpg画像を取得する
//     .pipe(changed("dest")) // srcImg と distImg を比較して異なるものだけ圧縮する
//     .pipe(
//       imagemin([
//         pngquant({
//           quality: "70-85", // 画質
//           speed: 1 // スピード
//         }),
//         mozjpeg({
//           quality: 85, // 画質
//           progressive: true
//         })
//       ])
//     )
//     .pipe(gulp.dest("./dest/")); //保存
// });

var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

var imageminOption = [
  imageminPngquant({ quality: '65-80' }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'default', gulp.series( gulp.parallel('imagemin'),function() {
  return gulp
    .src( './img/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './dest' ) );
});

// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminPngquant = require('imagemin-pngquant');
// // const imageminGifsicle = require('imagemin-gifsicle');
// // const imageminSvgo = require('imagemin-svgo');
// imagemin(['src/*.{jpg,png}'], 'dest', {
//   plugins: [
//     imageminMozjpeg({ quality: 80 }),
//     imageminPngquant({ quality: '65-80' })
//   ]
// }).then(function() {
//   console.log('Images optimized');
// });

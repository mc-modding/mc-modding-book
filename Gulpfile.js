global.is_local = process.argv.includes('-local');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify_js = require('gulp-uglify');
const babel = require('gulp-babel');
const scss_css = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');
const cache = require('gulp-cache');

/**
 * Moving all 'must-have' folders with files to site root directory
 */
gulp.task('move-must-have', [
    'move-must-have.handle',
    'move-must-have.handle-logotype',
    'move-must-have.handle-scripts',
    'move-must-have.handle-styles'
]);

/**
 * Building site index
 */
gulp.task('build-index', ['build-index.handle-images',]);

/**
 * Building all books for all Minecraft versions and APIs
 */
gulp.task('build-books', [
    'build-books.handle-article-images',
    'build-books.move-article-files',
    'build-books.handle-scripts',
    'build-books.handle-styles',
]);

/* ================================================================================================================== */
/* MOVE 'MUST-HAVE' tasks */
/* ================================================================================================================== */

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving and compressing logotype textures */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('move-must-have.handle-logotype', () => {
    return gulp.src('site/must-have/logotype/**/*.{png,gif,jpg,jpeg}')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(imagemin())
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}/logotype`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving 'must-have' folders/files */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('move-must-have.handle', () => {
    return gulp.src(['site/must-have/**/*',
        '!site/must-have/logotype/**/*',
        '!site/must-have/_*/',
        '!site/must-have/_*/**/*',
        '!site/must-have/g-*/',
        '!site/must-have/g-*/**/*'
    ])
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving JS scripts */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('move-must-have.handle-scripts', () => {
    return gulp.src('site/must-have/g-scripts/**/*.js')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(concat('global.min.js', {newLine: ''}))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify_js())
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}g-scripts/`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving styles */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('move-must-have.handle-styles', () => {
    return gulp.src('site/must-have/g-styles/**/*.scss')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(scss_css())
        .pipe(concat('global.min.css', {newLine: ''}))
        .pipe(autoprefixer())
        .pipe(clean_css())
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}g-styles/`));
});

/* ================================================================================================================== */
/* BUILD INDEX tasks */
/* ================================================================================================================== */

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving JS scripts */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-index.handle-images', () => {
    return gulp.src('site/index/**/*.{png,gif,jpg,jpeg}')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(cache(imagemin()))
        .pipe(gulp.dest((global.is_local ? 'compiled/' : '')));
});

/* ================================================================================================================== */
/* BUILD BOOKS tasks */
/* ================================================================================================================== */

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving article images */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-article-images', () => {
    return gulp.src('book/**/*.{png,gif,jpg,jpeg}')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}book`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving all other article files */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.move-article-files', () => {
    return gulp.src(['book/**/!(*.png|*.gif|*.jpg|*.jpeg|article.md|config.yml)'])
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}book`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving JS scripts */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-scripts', () => {
    return gulp.src('site/book/scripts/**/*.js')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(concat('book.min.js', {newLine: ''}))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify_js())
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}book/scripts/`));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving styles */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-styles', () => {
    return gulp.src('site/book/styles/**/*.scss')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(scss_css())
        .pipe(concat('book.min.css', {newLine: ''}))
        .pipe(autoprefixer())
        .pipe(clean_css())
        .pipe(gulp.dest(`${(global.is_local ? 'compiled/' : '')}book/styles`));
});
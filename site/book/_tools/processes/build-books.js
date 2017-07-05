/**
 * Building all books
 */

global.is_local = process.argv.includes('-local');

/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const mkdirp =          require('mkdirp');
const rimraf =          require('rimraf');
const utils =           require('../../../../tools/modules/utils');
const mustache_render = require('../../../../tools/modules/mustache-render');

/* Requiring views */
const nav_view =        require('../views/nav.view');
const header_view =     require('../views/header.view');
const article_view =    require('../views/article.view');
const head_view =       require('../views/head.view');

/* Global site config */
const CONFIG = utils.get_config('./');

/* Cleaning 'book' directory */
if(global.is_local) {
    rimraf.sync(`compiled/book`);
    CONFIG.url = `${process.cwd()}/compiled`;
}

/* Generating book pages */
let versions_dirs = utils.get_directories(`book`);
versions_dirs.forEach((version_dir) => {

    let APIs_dirs = utils.get_directories(`book/${version_dir}`);
    APIs_dirs.forEach((API_dir) => {

        let categories_dirs = utils.get_config(`book/${version_dir}/${API_dir}`)['categories-order'];
        categories_dirs.forEach((category_dir, category_index, categories_array) => {

            let articles_dirs = utils.get_config(`book/${version_dir}/${API_dir}/${category_dir}`)['articles-order'];
            articles_dirs.forEach((article_dir, article_index, articles_array) => {

                let previous_article_link = null,
                    next_article_link =     null;

                if(article_index !== 0) {
                    previous_article_link = `${CONFIG.url}/book/${version_dir}/${API_dir}/${category_dir}/${articles_dirs[article_index - 1]}`;
                } else {
                    if(category_index !== 0) {
                        previous_article_link = `${CONFIG.url}/book/${version_dir}/${API_dir}/${categories_array[category_index - 1]}/${utils.get_config(`book/${version_dir}/${API_dir}/${categories_array[category_index - 1]}`)['articles-order'][0]}`;
                    }
                }

                if(article_index !== articles_array.length - 1) {
                    next_article_link = `${CONFIG.url}/book/${version_dir}/${API_dir}/${category_dir}/${articles_dirs[article_index + 1]}`;
                } else {
                    if(category_index !== categories_array.length - 1) {
                        next_article_link = `${CONFIG.url}/book/${version_dir}/${API_dir}/${categories_array[category_index + 1]}/${utils.get_config(`book/${version_dir}/${API_dir}/${categories_array[category_index + 1]}`)['articles-order'][0]}`;
                    }
                }

                build_book(version_dir, API_dir, category_dir, article_dir, {
                    next_article_link: next_article_link,
                    previous_article_link: previous_article_link
                });

            });

        });

    });

});

function build_book(version_dir, API_dir, category_dir, article_dir, next_previous_articles) {

    let view = Object.assign({},
        nav_view(version_dir, API_dir, category_dir, article_dir),
        header_view(version_dir, API_dir),
        article_view(version_dir, API_dir, category_dir, article_dir, next_previous_articles),
        head_view(version_dir, API_dir, category_dir, article_dir)
    );

    /* Saving page */
    let path = `${(global.is_local ? 'compiled/' : '')}book/${version_dir}/${API_dir}/${category_dir}/${article_dir}`;

    mkdirp.sync(path);

    fs.writeFileSync(`${path}/index.html`, mustache_render('site/book/templates/index.mustache', view));
}
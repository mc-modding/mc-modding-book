/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const utils =           require('../../../../tools/modules/utils');

/* Global site config */
const CONFIG = utils.get_config('./');

if(global.is_local) { CONFIG.url = `${process.cwd()}/compiled`; }

module.exports = (par_version_dir, par_API_dir, par_category_dir, par_article_dir) => {

    /* View to return */
    let view = {

        version_choose: {
            release: {
                show: false,
                versions: []
            },
            beta: {
                show: false,
                versions: []
            },
            alpha: {
                show: false,
                versions: []
            }
        },

        APIs: [],

        categories: []
    };

    /* -------------------------------------------------------------------------------------------------------------- */
    /* Handling versions */
    /* -------------------------------------------------------------------------------------------------------------- */
    let versions_dirs = utils.get_directories('book');
    versions_dirs.sort(utils.compare_versions).reverse().forEach((version_dir) => {

        let version_config = utils.get_config(`book/${version_dir}`);

        let index_category = utils.index_category(version_dir, version_config['default-api-dir']);
        let index_article = utils.index_article(version_dir, version_config['default-api-dir'], index_category);

        let version_link = `${CONFIG.url}/book/${version_dir}/${version_config['default-api-dir']}/${index_category}/${index_article}`;

        let version_option = `<option value="${version_link}" ${(version_dir === par_version_dir ? 'selected' : '')}>${version_config.number}</option>`;

        switch (version_config['dev-state']) {
            case 'Release':
                view.version_choose.release.show = true;
                view.version_choose.release.versions.push(version_option);
                break;
            case 'Beta':
                view.version_choose.beta.show = true;
                view.version_choose.beta.versions.push(version_option);
                break;
            case 'Alpha':
                view.version_choose.alpha.show = true;
                view.version_choose.alpha.versions.push(version_option);
                break;
        }

    });

    /* -------------------------------------------------------------------------------------------------------------- */
    /* Handling version APIs */
    /* -------------------------------------------------------------------------------------------------------------- */
    let APIs_dirs = utils.get_directories(`book/${par_version_dir}`);
    APIs_dirs.forEach((API_dir) => {

        let API_config = utils.get_config(`book/${par_version_dir}/${API_dir}`);

        let index_category = utils.index_category(par_version_dir, API_dir);
        let index_article = utils.index_article(par_version_dir, API_dir, index_category);

        let API_link = `${CONFIG.url}/book/${par_version_dir}/${API_dir}/${index_category}/${index_article}`;

        let API_option = `<option value="${API_link}" ${(API_dir === par_API_dir ? 'selected' : '')}>${API_config['api-name']}</option>`;

        view.APIs.push(API_option);

    });

    /* -------------------------------------------------------------------------------------------------------------- */
    /* Handling categories and articles */
    /* -------------------------------------------------------------------------------------------------------------- */
    let categories_config = utils.get_config(`book/${par_version_dir}/${par_API_dir}`);

    categories_config['categories-order'].forEach((category_dir, i) => {

        let category_config = utils.get_config(`book/${par_version_dir}/${par_API_dir}/${category_dir}`);

        let category_link = `${CONFIG.url}/book/${par_version_dir}/${par_API_dir}/${category_dir}/${utils.index_article(par_version_dir, par_API_dir, category_dir)}`;

        let category_obj = {
            title: category_config['category-title'],
            link: category_link,
            selected: category_dir === par_category_dir,
            separator: i !== categories_config['categories-order'].length,
            articles: []
        };

        if(category_config['articles-order'].length !== 1) {
            category_config['articles-order'].forEach((article_dir) => {

                let article_config = utils.get_config(`book/${par_version_dir}/${par_API_dir}/${category_dir}/${article_dir}`);

                let article_link = `${CONFIG.url}/book/${par_version_dir}/${par_API_dir}/${category_dir}/${article_dir}`;

                let article_obj = {
                    title: article_config['title'],
                    link: article_link,
                    selected: category_obj.selected && (article_dir === par_article_dir)
                };

                category_obj.articles.push(article_obj);

            });
        }

        view.categories.push(category_obj);

    });

    return view;

};
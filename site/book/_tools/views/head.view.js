/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const showdown =        require('showdown');
const utils =           require('../../../../tools/modules/utils');

/* Global site config */
const CONFIG = utils.get_config('./');

if(global.is_local) { CONFIG.url = `${process.cwd()}/compiled`; }

module.exports = (par_version_dir, par_API_dir, par_category_dir, par_article_dir) => {

    let view = {
        title: '',
        description: '',
        site_root: `${CONFIG.url}`,
        book_root: `${CONFIG.url}/book`,
        url: `${CONFIG.url}/book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}`,
        og_img: ''
    };

    let article_config = utils.get_config(`book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}`);

    view.title = article_config.title;
    view.description = (article_config.description).replace(/(\r\n|\n|\r)/gm,'');

    return view;

};
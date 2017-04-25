/**
 * Building site index
 */

global.is_local = process.argv.includes('-local');

/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const mkdirp =          require('mkdirp');
const rimraf =          require('rimraf');
const showdown =        require('showdown');
const utils =           require('../../../../tools/modules/utils');
const mustache_render = require('../../../../tools/modules/mustache-render');

/* Requiring views */
const nav_view =        require('../../../book/_tools/views/nav.view');
const header_view =     require('../../../book/_tools/views/header.view');
const article_view =    require('../../../book/_tools/views/article.view');
const head_view =       require('../../../book/_tools/views/head.view');

/* Global site config */
const CONFIG = utils.get_config('./');

if(global.is_local) { CONFIG.url = `${process.cwd()}/compiled`; }

/* ------------------------------------------------------------------------------------------------------------------ */
/* Getting default Minecraft version and API */
/* ------------------------------------------------------------------------------------------------------------------ */

let versions_config = utils.get_config(`book`);
let default_version_dir = versions_config['default-version-dir'];

let API_config = utils.get_config(`book/${default_version_dir}`);
let default_API = API_config['default-api-dir'];

/* ------------------------------------------------------------------------------------------------------------------ */
/* Building index page */
/* ------------------------------------------------------------------------------------------------------------------ */

showdown.extension('targetlink', function() {
    return [{
        type: 'html',
        regex: /(<a [^>]+?)(>.*<\/a>)/g,
        replace: '$1 target="_blank"$2'
    }];
});

let converter = new showdown.Converter({extensions: ['targetlink']});

converter.setOption('ghCompatibleHeaderId', true);

let view = Object.assign({},
    nav_view(default_version_dir, default_API),
    header_view(default_version_dir, default_API),
    {
        // Article view
        link: `https://github.com/mc-modding/mc-modding-book/blob/master/site/index/index.md`,
        article: utils.add_anchor_links(converter.makeHtml(fs.readFileSync(`site/index/index.md`, { encoding: 'UTF-8' })))
    },
    {
        // Head view
        title: 'Создение модов для Minecraft',
        description: 'Подробный и понятный учебник по созданию своего мода для Minecraft. Научитесь создавать все: от блока до целого измерения!',
        site_root: `${CONFIG.url}`,
        book_root: `${CONFIG.url}/book`,
        url: `${CONFIG.url}`,
        og_img: `${CONFIG.url}/favicon_standart.png`
    }
);

/* Saving page */
fs.writeFileSync(`${(global.is_local ? 'compiled/' : '')}index.html`, mustache_render('site/book/templates/index.mustache', view));
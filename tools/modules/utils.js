/**
 * Useful functions
 */
const fs = require('fs');
const path = require('path');
const yml = require('js-yaml');

let e = module.exports = {};

e.get_directories = (path_to_scan) => {
    return fs.readdirSync(path_to_scan).filter(file => fs.statSync(path.join(path_to_scan, file)).isDirectory());
};

e.get_config = (path_to_config_dir) => {
    return yml.safeLoad(fs.readFileSync(path.join(path_to_config_dir, '/config.yml'), { encoding: 'UTF-8' }));
};

e.add_anchor_links = (article) => {
    let pattern = /(<h[1-6].*?id=")([^"]*?)(".*?>)(.+?)(<\/h[1-6]>)/g;

    article = article.replace(pattern, `$1$2$3$4<a title="Ссылка на этот раздел" href="#$2"><i class="material-icons">link</i></a>$5`);

    return article;
};

e.index_category = (version_dir, api_dir) => {

    let categories_config = e.get_config(`book/${version_dir}/${api_dir}`);

    let categories_list = categories_config['categories-order'];

    return categories_list[0];
};

e.index_article = (version_dir, api_dir, category_dir) => {

    let articles_config = e.get_config(`book/${version_dir}/${api_dir}/${category_dir}`);

    let articles_list = articles_config['articles-order'];

    return articles_list[0];

};

e.compare_versions = (a, b) => {
    let i, diff;
    let regExStrip0 = /(\.0+)+$/;
    let segmentsA = a.replace(regExStrip0, '').split('.');
    let segmentsB = b.replace(regExStrip0, '').split('.');
    let l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff) {
            return diff;
        }
    }
    return segmentsA.length - segmentsB.length;
};
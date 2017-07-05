/* Requiring modules */
const fs =              require('fs');
const showdown =        require('showdown');
const utils =           require('../../../../tools/modules/utils');

/* Global site config */
const CONFIG = utils.get_config('./');

if(global.is_local) { CONFIG.url = `${process.cwd()}/compiled`; }

module.exports = (par_version_dir, par_API_dir, par_category_dir, par_article_dir, next_previous_articles) => {

    /* Converting MD to HTML */
    showdown.extension('targetlink', function() {
        return [{
            type: 'html',
            regex: /(<a [^>]+?)(>.*<\/a>)/g,
            replace: '$1 target="_blank"$2'
        }];
    });

    let converter = new showdown.Converter({extensions: ['targetlink']});

    converter.setOption('ghCompatibleHeaderId', true);
    converter.setOption('tables', true);

    /* Looking for contributors */
    let article_config = utils.get_config(`book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}`);

    let contributors = [];

    if(article_config['contributors'] !== undefined) {

        article_config['contributors'].forEach((contributor) => {

            if(!contributor.name) { return; }

            contributors.push({
                name: contributor.name,
                github: contributor.github,
                role: (contributor.role ? contributor.role : 'Автор')
            });
        })

    }

    return {
        link: `https://github.com/mc-modding/mc-modding-book/blob/master/book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`,
        article: utils.add_anchor_links(converter.makeHtml(fs.readFileSync(`book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`, { encoding: 'UTF-8' }))),
        contributors: contributors,
        version: `v${CONFIG.version}`,
        next_previous_articles: next_previous_articles
    };

};
/* Requiring modules */
const fs =              require('fs');
const showdown =        require('showdown');
const utils =           require('../../../../tools/modules/utils');

module.exports = (par_version_dir, par_API_dir, par_category_dir, par_article_dir) => {

    showdown.extension('targetlink', function() {
        return [{
            type: 'html',
            regex: /(<a [^>]+?)(>.*<\/a>)/g,
            replace: '$1 target="_blank"$2'
        }];
    });

    let converter = new showdown.Converter({extensions: ['targetlink']});

    converter.setOption('ghCompatibleHeaderId', true);

    return {
        link: `https://github.com/mc-modding/mc-modding-book/blob/master/book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`,
        article: utils.add_anchor_links(converter.makeHtml(fs.readFileSync(`book/${par_version_dir}/${par_API_dir}/${par_category_dir}/${par_article_dir}/article.md`, { encoding: 'UTF-8' })))
    };

};
/* Requiring modules */
const fs =              require('fs');
const path =            require('path');
const utils =           require('../../../../tools/modules/utils');

/* Global site config */
const CONFIG = utils.get_config('./');

if(global.is_local) { CONFIG.url = `${process.cwd()}/compiled`; }

module.exports = (par_version_dir, par_API_dir) => {

    let index_category = utils.index_category(par_version_dir, par_API_dir);
    let index_article = utils.index_article(par_version_dir, par_API_dir, index_category);

    let view = {
        book_index: `${CONFIG.url}/book/${par_version_dir}/${par_API_dir}/${index_category}/${index_article}`,
        site_url: CONFIG.url,
        logotype_cube_sides: []
    };

    let textures_dirs = utils.get_directories('site/must-have/logotype');

    let random_dir = textures_dirs[Math.floor(Math.random() * textures_dirs.length)];

    if((fs.readdirSync(`${CONFIG.url}/logotype/${random_dir}`)).includes('all.png')) {
        ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach((side) => {

            view.logotype_cube_sides.push({
                link: `${CONFIG.url}/logotype/${random_dir}/all.png`,
                side: side
            });

        });
    } else {
        ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach((side) => {

            view.logotype_cube_sides.push({
                link: `${CONFIG.url}/logotype/${random_dir}/${side}.png`,
                side: side
            });

        });
    }

    return view;

};
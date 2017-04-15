const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

/**
 * Rendering .mustache template with automatically merged partials
 *
 * @param {string} path_to_template Path to template .mustache file
 * @param {{}} view Mustache view object
 *
 * @returns {string} Result of mustache.render() method
 */
module.exports = (path_to_template, view) => {
    let partials = handle_partials(path_to_template);

    let template;
    try {
        template = fs.readFileSync(path_to_template, { encoding: 'UTF-8' });
    } catch (err) { return ''; }

    return mustache.render(template, view, partials);
};

/**
 * Returning recursively created array of partials based on given template
 *
 * @param {string} path_to_template Path to next partial .mustache template
 * @param {{}} partials Array of partials
 * @param {string|null} partial Partial name
 *
 * @returns {{}} Array of partials to be used as third parameter in mustache.render() method
 */
function handle_partials(path_to_template, partials = {}, partial = null) {
    path_to_template = path.normalize(path_to_template);

    let partial_caller_dir = path.dirname(path_to_template);


    let template_contents;
    try {
        template_contents = fs.readFileSync(path_to_template, { encoding: 'UTF-8' });

        if(partial) {
            partials[partial] = template_contents;
        }

        let template_partials = find_partials(template_contents);
        template_partials.forEach((partial) => {
            return handle_partials(
                path.normalize(`${partial_caller_dir}/${partial}.mustache`),
                partials,
                partial
            );
        });
    } catch (err) {
        return partials;
    }

    return partials;
}

/**
 * Finding all partials in give template
 *
 * @param {string} template_contents Template file contents as utf-8 string
 *
 * @returns {Array} Array of partials
 */
function find_partials(template_contents) {
    let pattern = /{{>(.*?)}}/g;

    let match;

    let partials = [];

    while(match = pattern.exec(template_contents)) {
        partials.push(match[1].trim());
    }

    return partials;
}
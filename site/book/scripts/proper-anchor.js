/**
 * Proper anchor linking
 */

const TOP_MARGIN = 20;

function adjustAnchor() {
    const $anchor = $(':target');
    const fixedElementHeight = $('header').outerHeight();
    if ($anchor.length > 0)
        window.scrollTo(0, $anchor.offset().top - fixedElementHeight - TOP_MARGIN);
}
$(window).on('hashchange load', adjustAnchor);

$(() => {
    $('body').on('click', "a[href^='#']", function (ev) {
        if (window.location.hash === $(this).attr('href')) {
            ev.preventDefault();
            adjustAnchor();
        }
    });
});
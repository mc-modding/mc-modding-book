/**
 * Site menu call-button controller
 */
{
    /**
     * Is site menu showing right now?
     *
     * @type {boolean}
     */
    let is_site_menu_showing = false;

    /**
     * DOM element of button that calls site menu
     *
     * @type {Object}
     */
    let site_menu_caller;

    /**
     * DOM element that contains all menu items
     *
     * @type {Object}
     */
    let vertical_site_menu;

    $(() => {
        init_site_menu_caller();

        site_menu_caller.click(() => {
            toggle_vertical_site_menu();
        });

        $(window).click((e) => {
            if (!$(e.target).closest('.menu-item').length && !$(e.target).closest('.show-menu').length) {
                close_vertical_site_menu();
            }
        });
    });

    /**
     * Init variables connected to site menu caller
     */
    function init_site_menu_caller() {
        site_menu_caller = $('.show-menu');
        vertical_site_menu = $('.site-menu.transformable');
    }

    function open_vertical_site_menu() {
        vertical_site_menu.addClass('shown');
        site_menu_caller.addClass('active');
        is_site_menu_showing = true;
    }

    function close_vertical_site_menu() {
        vertical_site_menu.removeClass('shown');
        site_menu_caller.removeClass('active');
        is_site_menu_showing = false;
    }

    function toggle_vertical_site_menu() {
        (is_site_menu_showing ? close_vertical_site_menu() : open_vertical_site_menu());
    }
}
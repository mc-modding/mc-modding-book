/**
 * Site book navigation call-button controller
 */
{
    /**
     * Is book navigation showing right now?
     *
     * @type {boolean}
     */
    let is_book_nav_showing = false;

    /**
     * DOM element that represents book navigation
     *
     * @type {Object}
     */
    let book_nav;

    /**
     * DOM button that calls book navigation
     *
     * @type {Object}
     */
    let call_nav_button;

    $(() => {
        init_book_nav_caller();

        call_nav_button.click(() => {
            toggle_book_nav();
        });

        $(window).click((e) => {
            if (!$(e.target).closest(call_nav_button).length && !$(e.target).closest('nav').length) {
                close_book_nav();
            }
        });
    });

    /**
     * Init variables connected to book navigation caller
     */
    function init_book_nav_caller() {
        book_nav = $('nav');
        call_nav_button = $('.show-book-nav').find('.menu-item');
    }

    /**
     * Show book navigation
     */
    function open_book_nav() {
        book_nav.addClass('shown');
        call_nav_button.addClass('active');
        $('article').addClass('darker');
        is_book_nav_showing = true;
    }

    /**
     * Hide book navigation
     */
    function close_book_nav() {
        book_nav.removeClass('shown');
        call_nav_button.removeClass('active');
        $('article').removeClass('darker');
        is_book_nav_showing = false;
    }

    /**
     * Toggle book navigation
     */
    function toggle_book_nav() {
        (is_book_nav_showing ? close_book_nav() : open_book_nav());
    }
}
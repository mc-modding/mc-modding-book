const LAYOUT_WIDTH = {
    MINI: 445,
    MOBILE: 650,
    TABLET: 850,
    STRETCH: 1100
};

class Layout {
    /**
     * Проверка текущей разметки сайта
     *
     * @param layout ширина сайта в пикселях.
     *
     * @see Layout
     *
     * @returns {boolean}
     */
    static is_layout(layout) {
        return window.matchMedia(`(max-width: ${layout}px)`).matches;
    }
}
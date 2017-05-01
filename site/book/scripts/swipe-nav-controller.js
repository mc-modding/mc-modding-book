let nav, article;

let tolerance = 20;

let nav_width;

$(window).resize(() => {
    nav_width = nav.outerWidth();
});

$(() => {
    nav = $('nav');
    article = $('article');

    nav_width = nav.outerWidth();

    let hammer_article = new Hammer(article.get(0), {
        dragLockToAxis: true,
        dragBlockHorizontal: true
    });
    let hammer_nav = new Hammer(nav.get(0), {
        dragLockToAxis: true,
        dragBlockHorizontal: true
    });

    /* -------------------------------------------------------------------------------------------------------------- */
    /* Обработка свайпов */
    /* -------------------------------------------------------------------------------------------------------------- */

    /* Открытие навигации свайпом */
    hammer_article.on('swiperight', e => {
        let start_X = e.changedPointers[0].clientX - e.deltaX;

        if(Utils.between(start_X, 0, tolerance)) {
            open_nav();
        }
    });

    /* Закрытие навигации свайпом */
    hammer_nav.on('swipeleft', () => {
        close_nav();
    });

    /* -------------------------------------------------------------------------------------------------------------- */
    /* Обработка перемещений */
    /* -------------------------------------------------------------------------------------------------------------- */

    /* Открытие навигации перемещением */
    hammer_article.on('panleft panright', e => {
        if(nav.hasClass('shown')) {
            return;
        }

        let start_X = e.changedPointers[0].clientX - e.deltaX;

        if(Utils.between(start_X, 0, tolerance)) {
            nav.addClass('moving');
        }

        if(nav.hasClass('moving') && nav_right() <= nav_width) {
            nav_right((e.changedPointers[0].clientX > nav_width ? nav_width : e.changedPointers[0].clientX));
        }
    });

    /* Закрытие навигации перемещением */
    hammer_nav.on('panleft panright', e => {
        if(!nav.hasClass('shown')) {
            return;
        }

        if(e.isFinal) {
            return;
        }

        console.log(e);

        nav.addClass('moving');

        if(nav_right() <= nav_width) {
            nav_right((nav_width + e.deltaX > nav_width ? nav_width : nav_width + e.deltaX));
        }
    });

    /* Отмена перемещения */
    hammer_article.on('panend pancancel', () => {
        nav.removeClass('moving');

        if(nav.hasClass('shown')) {
            return;
        }

        if(nav_right() > nav_width/2) {
            open_nav();
        } else {
            close_nav();
        }
    });
    hammer_nav.on('panend pancancel', () => {
        nav.removeClass('moving');

        if(!nav.hasClass('shown')) {
            return;
        }

        if(nav_right() < nav_width/2) {
            close_nav();
        } else {
            open_nav();
        }
    });
});

function open_nav() {
    clean_nav();
    nav.addClass('shown');
}

function close_nav() {
    clean_nav();
}

/** Полная очистка навигации от любых стилей */
function clean_nav() {
    nav.removeClass().css('left', '');
}

/**
 * Получение позиции правого края навигации. Если передан аргумент, то устанавливает
 * правый край в заданную точку относительно левой границы окна.
 *
 * @param {number|null} value Положение правой границы навигации относительно левой границы окна
 *
 * @return {number|null}
 */
function nav_right(value = null) {
    if(value === null) {
        let nav_pos = nav.position();

        return nav_pos.left + nav_width;
    } else {
        nav.css('left', `${value - nav_width}px`);
    }
}
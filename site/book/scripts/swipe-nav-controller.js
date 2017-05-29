/* ------------------------------------------------------------------------------------------------------------------ */
/* Переменные */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * Открыто ли меню в данный момент
 *
 * @type {boolean}
 */
let is_opened = false;

/**
 * Происходит ли перемещение меню пальцем в данный момент
 *
 * @type {boolean}
 */
let is_moving = false;

/**
 * jQuery DOM элемент навигации
 */
let nav;

/**
 * jQuery DOM элемент тела сайта
 */
let article;

/**
 * jQuery DOM элемент шапки сайта
 */
let header;

/**
 * Ширина области в пикселях от начала экрана, в которой возможно открыть навигацию
 *
 * @type {number}
 */
let open_tolerance = 20;

/**
 * Ширина навигации
 *
 * @type {number}
 */
let nav_width;

let hammer_article = null, hammer_nav = null;

/* ------------------------------------------------------------------------------------------------------------------ */
/* Обработка событий */
/* ------------------------------------------------------------------------------------------------------------------ */

/* Изменение размеров окна браузера */
$(window).resize(() => {
    nav_width = $(nav).outerWidth();

    if (window.matchMedia("(max-width: 850px)").matches) {
        console.log('ВКЛЮЧАЕМ');
        enable_touch();
    } else {
        console.log('ВЫКЛЮЧАЕМ');
        disable_touch();
    }
});

$(() => {
    if (window.matchMedia("(max-width: 850px)").matches) {
        enable_touch();
    } else {
        disable_touch();
    }
});

function disable_touch() {
    if(hammer_article) {
        hammer_article.destroy();
    }

    if(hammer_nav) {
        hammer_nav.destroy();
    }
}

function enable_touch() {
    delete Hammer.defaults.cssProps.userSelect;

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

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* Обработка свайпов */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

    /* Открытие навигации свайпом */
    hammer_article.on('swiperight', e => {
        let start_X = e.changedPointers[0].clientX - e.deltaX;

        if(Utils.between(start_X, 0, open_tolerance)) {
            open_nav();
        }
    });

    /* Закрытие навигации свайпом */
    hammer_nav.on('swipeleft', () => {
        close_nav();
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* Обработка перемещений */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

    /* Открытие навигации перемещением */
    hammer_article.on('panleft panright', e => {
        if(is_opened) {
            return;
        }

        if(!is_moving) {
            if(Utils.between(e.changedPointers[0].clientX - e.deltaX, 0, open_tolerance)) {
                enable_moving();
            }
        } else {
            darker_step();
            nav_right((e.changedPointers[0].clientX > nav_width ? nav_width : e.changedPointers[0].clientX));
        }
    });

    /* Закрытие навигации перемещением */
    hammer_nav.on('panleft panright', e => {
        if(e.isFinal) {
            return;
        }

        if(!is_moving) {
            enable_moving();
        } else {
            darker_step();
            nav_right((nav_width + e.deltaX > nav_width ? nav_width : nav_width + e.deltaX));
        }
    });

    /* Прекращение открытия навигации */
    hammer_article.on('panend pancancel', () => {
        disable_moving();

        if(nav.hasClass('shown')) {
            return;
        }

        if(nav_right() > nav_width/2) {
            open_nav();
        } else {
            close_nav();
        }
    });

    /* Прекращение закрытия навигации */
    hammer_nav.on('panend pancancel', () => {
        disable_moving();

        if(!nav.hasClass('shown')) {
            return;
        }

        if(nav_right() < nav_width/2) {
            close_nav();
        } else {
            open_nav();
        }
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    /* Остальные обработчики */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

    /* Вызов навигации по клику */
    $('.menu-button').click(() => {
        open_nav();
    });

    /* Закрытие навигации по клику вне меню */
    $('article, header').click(e => {
        if(!$(e.target).hasClass('menu-button') && is_opened) {
            close_nav();
        }
    });
}

$(() => {



});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Функции */
/* ------------------------------------------------------------------------------------------------------------------ */

/** Открытие навигации */
function open_nav() {
    clean_nav();
    nav.addClass('shown');
    article.addClass('darker');
    is_opened = true;
}

/** Закрытие навигации */
function close_nav() {
    clean_nav();
    article.removeClass('darker');
    is_opened = false;
}

/** Включение перемещения пальцем */
function enable_moving() {
    nav.addClass('moving');
    is_moving = true;
}

/** Выключение перемещения пальцем */
function disable_moving() {
    nav.removeClass('moving');
    is_moving = false;
}

/** Полная очистка навигации от любых стилей */
function clean_nav() {
    article.css('filter', '');
    nav.removeClass().css('left', '');
}

/** Затемнение фона при открытии/закрытии навигации */
function darker_step() {
    let brightness = 1-(nav_right()/(2*nav_width));

    article.css('filter', `brightness(${brightness})`);
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
/**
 * Контроллер включения/выключения отображения статей в категориях
 */

let categories;

let opened_array = [];

$(() => {
    categories = $('.category');

    opened_array = get_opened_array();

    init_opened_array();

    init_actual_state();

    categories.each((index, element) => {
        if($(element).find('.category-articles').children().length === 0) {
            $(element).find('.visibility-switcher').remove();
        }
    });

    let visibility_switcher = $('.visibility-switcher');

    visibility_switcher.click((e) => {
        let cat_class = $(e.target).closest('.visibility-switcher').attr('class').match(/switcher-[0-9]+/)[0];
        toggle_category_visibility(cat_class);
    });
});

/**
 * Показ/сокрытие категории
 *
 * @param cat_class Класс конкретного переключателя
 */
function toggle_category_visibility(cat_class) {
    let visibility_switcher = $(`.visibility-switcher.${cat_class}`).get(0);

    if(!visibility_switcher) return;

    let visibility_switcher_svg = Snap(visibility_switcher);

    let vertical_rect = visibility_switcher_svg.select('.vertical-rect');

    if($(visibility_switcher).hasClass('closed')) {
        $(visibility_switcher).closest('.category').find('.category-articles').stop().slideDown(200);
        vertical_rect.stop().animate({
            transform: 'r90 256, 256'
        }, 200);

        opened_array.push(parseInt(cat_class.match(/\d+$/)[0]));
        save_opened_array();
    } else {
        $(visibility_switcher).closest('.category').find('.category-articles').stop().slideUp(200);
        vertical_rect.stop().animate({
            transform: 'r0 256, 256'
        }, 200);

        opened_array = opened_array.filter((element) => {
            return element !== parseInt(cat_class.match(/\d+$/)[0]);
        });
        save_opened_array();
    }

    $(visibility_switcher).toggleClass('closed');
}

/**
 * Инициализация и созранение массива индексов закрытых категорий.
 */
function init_opened_array() {
    categories.each((index, element) => {
        if($(element).find('.category-article').hasClass('selected')) {
            if(!opened_array.includes(index))
                opened_array.push(index);
        }
    });

    save_opened_array();
}

/**
 * Сохранение массива индексов закрытых категорий
 */
function save_opened_array() {
    localStorage.setItem('opened_array_' + book_id, JSON.stringify(opened_array));
}

/**
 * Получение массива индексов закртых категорий
 */
function get_opened_array() {
    if(localStorage.getItem('opened_array_' + book_id) === null) {
        return [];
    }

    return JSON.parse(localStorage.getItem('opened_array_' + book_id));
}

/**
 * Начальная установка видимости категорий
 */
function init_actual_state() {
    opened_array.forEach((element, index, array) => {
        if(!categories.get(element)) {
            return;
        }

        set_switcher_to_opened(element);
        $(categories.get(element)).find('.visibility-switcher').toggleClass('closed');
        $(categories.get(element)).find('.category-articles').show();
    });

    for(let i = 0; i < categories.length; i++) {
        if(!opened_array.includes(i)) {
            $(categories.get(i)).find('.category-articles').hide();
        }
    }
}

/**
 * Перевод значка переключения видимости в положение "Открыто"
 *
 * @param category_index Индекс категории
 */
function set_switcher_to_opened(category_index) {
    let switcher_svg = Snap($(categories.get(category_index)).find('.visibility-switcher').get(0));

    switcher_svg.select('.vertical-rect').attr({
        transform: 'r90 256, 256'
    });
}
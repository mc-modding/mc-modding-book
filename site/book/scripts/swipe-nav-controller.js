let nav;

let start_tolerance = 10;

let can_open = false;

$(() => {
    nav = $('nav');

    $('body').swipe({
        swipeStatus: (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) => {
            if(event.touches[0]) {
                if(Utils.between(event.touches[0].clientX, 0, start_tolerance)) {
                    can_open = true;
                }
            }
        },
        swipeRight: (event, direction, distance, duration, fingerCount, fingerData) => {
            if(can_open) {
                nav.removeClass().addClass('shown');
                call_nav_button.addClass('active');
                $('article').addClass('darker');
            }
        },
        threshold: 25
    });

    nav.swipe({
        swipeLeft: (event, direction, distance, duration, fingerCount, fingerData) => {
            can_open = false;
            nav.removeClass();
            $('article').removeClass('darker');
            call_nav_button.removeClass('active');
        },
        threshold: 25
    });
});
let nav;

let start_tolerance = 10;

let can_open = false;

let swipe_body = {
    swipeStatus: (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) => {
        if(Layout.is_layout(LAYOUT_WIDTH.TABLET)) {
            console.log(event);
            //if(Utils.between(event.touches[0].clientX, 0, start_tolerance)) {
                can_open = true;
            //}
        }
    },
    swipeRight: (event, direction, distance, duration, fingerCount, fingerData) => {
        if(can_open) {
            $('nav').removeClass().addClass('shown');
            call_nav_button.addClass('active');
            $('article').addClass('darker');
        }
    },
    threshold: 25
};

let swipe_nav = {
    swipeLeft: (event, direction, distance, duration, fingerCount, fingerData) => {
        can_open = false;
        $('nav').removeClass();
        $('article').removeClass('darker');
        call_nav_button.removeClass('active');
    },
    threshold: 25
};

$(window).resize(() => {
    activate_swipe_if();
});

$(() => {
    activate_swipe_if();
});

function activate_swipe_if() {
    if(Layout.is_layout(LAYOUT_WIDTH.TABLET)) {
        console.log('SWIPE ACTIVATED!');
        $('body').swipe(swipe_body);
        $('nav').swipe(swipe_nav);
    } else {
        console.log('SWIPE DESTROYED!');
        $('body').swipe('destroy');
        $('nav').swipe('destroy');
    }
}
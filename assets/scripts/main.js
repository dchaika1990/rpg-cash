$(document).ready(function () {

    // Toggle btm
    $('.toggle').on('click', function (e) {
        e.stopPropagation();
        // $('.dropdown').each(function () {
        //     $(this).removeClass('active');
        // });

       $(this).find('.dropdown').toggleClass('active')
    });

    $(document).on('click', function () {
        $('.dropdown').each(function () {
            $(this).removeClass('active');
        });
    });

    $('.dropdown li').on('click',function (e) {
        e.stopPropagation();
        $(this).closest('.dropdown').removeClass('active');
    });

    // Banner slider
    $('.layout__slider_content').slick({
        dots: true,
        slidesToShow: 1
    });

    // Slider btns

    $('.slider-prev').click(function () {
       $('.slick-prev').click();
        chageActive();

    });

    $('.slider-next').click(function () {
        $('.slick-next').click();
        chageActive();
    });

    // Slider dots
    $('.layout__slider_dots div').on('click', function (e) {
        var data = $(this).attr('data-number');
        $('#' + data).click();
        chageActive();
    });

    // Slider load
    $(window).on('load', function () {
        chageActive();
    });

    function chageActive() {
        $('.layout__banner .slick-dots li').each(function () {
            if ( $(this).hasClass('slick-active') ) {
                var id = $(this).children().attr('id');

                $('.dot').each(function () {
                   $(this).removeClass('active');
                });

                $('[data-number="' + id + '"]').addClass('active');
            }
        })
    }

});
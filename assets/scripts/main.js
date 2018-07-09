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
        chnageActive();

    });

    $('.slider-next').click(function () {
        $('.slick-next').click();
        chnageActive();
    });

    // Slider dots
    $('.layout__slider_dots div').on('click', function (e) {
        var data = $(this).attr('data-number');
        $('#' + data).click();
        chnageActive();
    });

    function chnageActive() {
        $('.layout__banner .slick-dots li').each(function () {
            if ( $(this).hasClass('slick-active') ) {
                var id = $(this).children().attr('id');
                // $('.layout__banner').find('[data-number=id]').addClass('active');
                console.log(id);
                // console.log( $('.layout__slider_dots .dot').attr('data-number', id));
                console.log( $('[data-number=id]').html() )
            }
        })
    }

});
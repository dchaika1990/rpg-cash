$(document).ready(function () {

    //Mobile nav
    $('.nav-bar__btn').on('click', function (e) {
        e.stopPropagation();
        $('.nav-bar__dropdown').addClass('active');
        $('.overflow').addClass('active');
        $('.nav-list_dropdown').removeClass('open');
    });

    $(window).on('click', function (e) {
        e.stopPropagation();
        $('.nav-bar__dropdown').removeClass('active');
        $('.overflow').removeClass('active');
    });

    $('.icon-close').on('click', function (e) {
        e.stopPropagation();
        $('.nav-bar__dropdown').removeClass('active');
        $('.overflow').removeClass('active');
    });
    
    $('.aside-bar').on('click', function (e) {
        e.stopPropagation();
        $(this).find('.list-hover').toggle();
    });

    $('.aside-bar > ul li').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('open');
        $(this).children('.list-hover').toggleClass('open');
    });

    $('.nav-list').on('click', function () {
        if ( $(window).width() < 1024 ){
            $('.nav-list_dropdown').toggleClass('open');
        }
        $('.nav-list_dropdown li').each(function () {
            $(this).children('.list-hover').removeClass('open');
        });
    });

    $('.nav-list_dropdown li').on('click', function () {
        $(this).toggleClass('open');
        $(this).children('.list-hover').toggleClass('open');
    });

    // Toggle btm
    $('.toggle').on('click', function (e) {
        e.stopPropagation();

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
    $('.layout__banner .layout__slider_content').slick({
        dots: true,
        slidesToShow: 1
    });

    // Banner slider btns next / prev

    var countClickNext = 0;
    var countClickPrev = 0;

    function showBtnsDots() {
        if ( countClickNext ) {
            $('.slider_dots-next').addClass('show')
        } else if (!countClickNext) {
            $('.slider_dots-next').removeClass('show')
        }

        if ( countClickPrev ) {
            $('.slider_dots-prev').addClass('show')
        } else if (!countClickPrev) {
            $('.slider_dots-prev').removeClass('show')
        }

        if ( $(window).width() > 1440 ) {
            $('.slider_dots-prev').removeClass('show');
            $('.slider_dots-next').removeClass('show')
        }
    }

    var countRounds = function () {
        $('.layout__slider_dots').css({
            'left': '0',
            'right': 'auto'
        });

        countClickPrev = 0;

        var widthBoxScrollBody = $('.layout__banner .layout__slider_wrap').width();
        var lengthBoxScrollBody = $('.layout__slider_dots .dot-wrap').length;
        var countShownBlocks = Math.floor(widthBoxScrollBody/230);

        countClickNext = lengthBoxScrollBody - countShownBlocks;
        // console.log(countClickPrev, countClickNext, widthBoxScrollBody, lengthBoxScrollBody, countShownBlocks);
    };

    $('.slider_dots-next').on('click', function (e) {
        e.preventDefault();

        if ( countClickNext == 1 ) {
            $('.layout__slider_dots').animate({'right': '0'}).css('left', 'auto');
            countClickNext--;
            countClickPrev++;
        } else if ( countClickNext > 0 ) {
            $('.layout__slider_dots').animate({'left': '-=230'});

            countClickNext--;
            countClickPrev++;
        } else {
            return false
        }
        console.log(countClickNext, countClickPrev);
    });

    $('.slider_dots-prev').on('click', function (e) {
        e.preventDefault();

        if ( countClickPrev == 1 ) {
            $('.layout__slider_dots').animate({'left': '0'}).css('right', 'auto');
            countClickNext++;
            countClickPrev--;
        } else if ( countClickPrev > 0 ) {
            $('.layout__slider_dots').animate({'right': '-=230'});

            countClickNext++;
            countClickPrev--;
        } else {
            return false
        }
        console.log(countClickNext, countClickPrev);
    });

    $(window).on('load', function () {
        if ( $(window).width() < 1440 ) countRounds();
        showBtnsDots()
    });

    $(window).on('resize', function () {
        if ( $(window).width() < 1440 ) countRounds();
        showBtnsDots()
    });

    $('.slider_dots-prev, .slider_dots-next').on('click', function () {
        showBtnsDots()
    });


    // Slider btns

    $('.slider-prev').click(function () {
       $(this).parent().parent().find('.layout__slider_content').find('.slick-prev').click();
        changeActive();

    });

    $('.slider-next').click(function () {
        $(this).parent().parent().find('.layout__slider_content').find('.slick-next').click();
        changeActive();
    });

    // Slider dots
    $('.layout__slider_dots div').on('click', function (e) {
        var data = $(this).attr('data-number');
        $('#' + data).click();
        changeActive();
    });

    // Slider load
    $(window).on('load', function () {
        changeActive();
    });

    function changeActive() {
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

    // Goods slider
    $('.layout__slider_big_wrap .layout__slider_content').slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Clipping goods

    function clippingGoods( html , count ) {
        html.each(function () {
            var good = $(this).find('.best-good');
            if ( good.length > count ){
                var notNeedTags =  good.splice(count);
                for ( var i = 0; i <  notNeedTags.length; i++ ){
                    notNeedTags[i].remove();
                }

                $(this).find('.layout__content').append('<div class="layout__content_link"><a href="#" class="btn btn-default">ПОКАЗАТЬ ЕЩЕ</a></div>')
            }
        })
    }

    $(window).on('load',function () {
       if ( $(window).width() < 1024 ) clippingGoods( $('.layout__goods.best'), 4)
    });

});
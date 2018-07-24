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

       $(this).find('.dropdown-btn').toggleClass('active')
    });

    $(document).on('click', function () {
        $('.dropdown').each(function () {
            $(this).removeClass('active');
        });
    });

    $('.dropdown li').on('click',function (e) {
        e.stopPropagation();
        $(this).closest('.dropdown-btn').removeClass('active');
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
            'right': 'inherit'
        });

        countClickPrev = 0;

        var widthBoxScrollBody = $('.layout__banner .layout__slider_wrap').width();
        var lengthBoxScrollBody = $('.layout__slider_dots .dot-wrap').length;
        var countShownBlocks = Math.floor(widthBoxScrollBody/230);

        countClickNext = lengthBoxScrollBody - countShownBlocks;
    };

    $('.slider_dots-next').on('click', function (e) {
        e.preventDefault();

        var wrapper = $('.layout__slider_wrap').width();
        var childrenLength = $('.layout__slider_dots').children().length;
        var childrenWidth = $('.dot-wrap').width();
        var dotsBlock = childrenLength * childrenWidth;

        var transkateX = (dotsBlock - wrapper) / countClickNext ;


        if ( countClickNext == 1 ) {
            // $('.layout__slider_dots').animate({'right': '0'}).css('left', 'inherit');
            $('.layout__slider_dots').animate({'left': '-' + transkateX + 'px' });
            countClickNext--;
            countClickPrev++;
        } else if ( countClickNext > 0 ) {
            // $('.layout__slider_dots').animate({'left': '-=230'});
            $('.layout__slider_dots').animate({'left': '-' + transkateX + 'px' });
            countClickNext--;
            countClickPrev++;
        } else {
            return false
        }

    });

    $('.slider_dots-prev').on('click', function (e) {
        e.preventDefault();

        var wrapper = $('.layout__slider_wrap').width();
        var childrenLength = $('.layout__slider_dots').children().length;
        var childrenWidth = $('.dot-wrap').width();
        var dotsBlock = childrenLength * childrenWidth;

        var transkateX = (dotsBlock - wrapper) / countClickPrev ;


        if ( countClickPrev == 1 ) {
            // $('.layout__slider_dots').animate({'left': '0'}).css('right', 'inherit');
            $('.layout__slider_dots').animate({'left': 0});
            countClickNext++;
            countClickPrev--;
        } else if ( countClickPrev > 0 ) {
            // $('.layout__slider_dots').animate({'right': '-=230'});
            $('.layout__slider_dots').animate({'left': '+=' + transkateX + 'px' });
            countClickNext++;
            countClickPrev--;
        } else {
            return false
        }

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
                breakpoint: 650,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // With two products
    $('.layout__slider_small_wrap .layout__slider_content').slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Goods slider Biggest
    $('.layout__slider_biggest_wrap .layout__slider_content').slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Clipping goods

    function clippingGoods( html , findHtml, count ) {
        $(html).each(function () {
            var good = $(this).find(findHtml);
            goodsArr = [].slice.call( good );
            goodsArr.forEach(function (elem) {
                elem.classList.remove('hidden');
            });

            if ( good.length > count ){
                for ( var i = goodsArr.length - 1; i >= count; i-- ){
                    goodsArr[i].classList.add('hidden');
                }
            }
        })
    }

    $(window).on('load',function () {
        if ( $(window).width() <= 1321 ) clippingGoods( '.layout__goods.best', '.best-good', 6);
        if ( $(window).width() < 1145 ) clippingGoods( '.layout__goods.best','.best-good', 4);
        if ( $(window).width() < 1025 ) clippingGoods( '.layout__goods.best','.best-good', 6);
        if ( $(window).width() < 866 ) clippingGoods( '.layout__goods.best','.best-good', 4);
        if ( $(window).width() > 768 ) clippingGoods( '.layout__aside-content','.layout__news_block', 4);
        if ( $(window).width() < 768 ) clippingGoods( '.layout__aside-content','.layout__news_block', 3);
    });

    $(window).on('resize',function () {
        if ( $(window).width() > 1321 ) clippingGoods( '.layout__goods.best','.best-good', 8);
        if ( $(window).width() <= 1321 ) clippingGoods( '.layout__goods.best','.best-good', 6);
        if ( $(window).width() < 1145 ) clippingGoods( '.layout__goods.best','.best-good', 4);
        if ( $(window).width() < 1025 ) clippingGoods( '.layout__goods.best','.best-good', 6);
        if ( $(window).width() < 866 ) clippingGoods( '.layout__goods.best','.best-good', 4);
        if ( $(window).width() > 768 ) clippingGoods( '.layout__aside-content','.layout__news_block', 4);
        if ( $(window).width() < 768 ) clippingGoods( '.layout__aside-content','.layout__news_block', 3);
    });

    // FormStyler
    $('select, [type="checkbox"], [type="radio"], [type="number"]').styler({
        selectSearch: true,
    });

    // Option block price checked

    $('.option-block label').on('click', function () {
        var priceBlock = $(this).closest('.option-block').children('.option-block__price');
        $(this).prev().hasClass('checked') ? priceBlock.addClass('checked') : priceBlock.removeClass('checked');

    });

    $('.option-block .jq-checkbox').on('click', function () {
        var priceBlock = $(this).closest('.option-block').children('.option-block__price');
        $(this).hasClass('checked') ? priceBlock.addClass('checked') : priceBlock.removeClass('checked');
    });

    // Pay select
    $('.jq-selectbox__dropdown li').on('click', function () {
        $(this).closest('.jq-selectbox').find('.jq-selectbox__select-text').attr('data-jqfs-class', '' );
       if ( $(this).attr('data-jqfs-class') ) {
           var attr = $(this).attr('data-jqfs-class');
           $(this).closest('.jq-selectbox').find('.jq-selectbox__select-text').attr('data-jqfs-class', attr );
       } else {
           return false;
       }
    });

    // Change place of card name

    function changeTitlePlace() {
        var needTitle = $('.product-content .product-title').html();
        $('.card-option .product-title').html( needTitle );
    }

    $(window).on('load resize', function () {
       if ( $(window).width() < 1025 )  changeTitlePlace();
    });

    // Catalog

    // Goods

    $(window).on('load resize', function () {
        if ( $(window).width()  > 607 ){
            clippingGoods( '.catalog .layout__content', '.best-good', 12 );
        } else {
            clippingGoods( '.catalog .layout__content', '.best-good', 7 );
        }
    });

    var stepDesctop = 12;
    var stepMob = 7;

    function addGoods( step, num ) {
        clippingGoods( '.catalog .layout__content', '.best-good', num + step );
    }

    $('.catalog .layout__add-content').on('click', function () {
        if ( $(window).width()  > 607 ) {
            addGoods( stepDesctop, 12 );
            stepDesctop += 12;
        } else {
            addGoods( stepMob, 7 );
            stepMob += 7;
        }

    });

    // Turn off links goods

    $('.catalog .best-good__content').on('click',function (e) {
        if ( $(window).width() < 1024 )  e.preventDefault();
    });

    // Text about

    $(window).on('load', function () {
        clippingGoods( '.layout__text-about', 'section', 2 );
    });

    var stepAboutText = 2;

    $('.catalog .layout__text-about button').on('click', function () {
        clippingGoods( '.catalog .layout__text-about', 'section', 2 + stepAboutText );
        stepAboutText += 2;
    });

});
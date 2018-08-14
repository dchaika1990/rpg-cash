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
        $('.modal').removeClass('active');
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
       $(this).find('.dropdown-btn').toggleClass('active');
       $(this).toggleClass('open');
    });

    $(document).on('click', function () {
        $('.dropdown').each(function () {
            $(this).removeClass('active');
        });
    });

    $('.toggle li').on('click',function (e) {
        e.stopPropagation();
        var dataPya = $(this).children().attr('data-pay');
        var value = $(this).children().attr('data-value');
        $(this).closest('.toggle').find('.btn-toggle').html($(this).html());
        $(this).closest('.toggle').removeClass('open');
        $(this).closest('.dropdown-btn').removeClass('active');
        $(this).closest('.toggle').parent().find('input[type="hidden"]').attr({
            'data-pay': dataPya,
            'value':value
        })
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


        var transkateX = dotsBlock - wrapper - (countClickNext - 1) * childrenWidth ;

        if ( countClickPrev == 0 ) {
            $('.layout__slider_dots').animate({'left': '-' + transkateX + 'px' });
            countClickNext--;
            countClickPrev++;
        } else if ( countClickPrev > 0 ) {
            $('.layout__slider_dots').animate({'left': '-=230'});
            countClickNext--;
            countClickPrev++;
        } else {
            return false
        }

        console.log(transkateX, countClickPrev);

    });

    $('.slider_dots-prev').on('click', function (e) {
        e.preventDefault();

        if ( countClickPrev == 1 ){
            $('.layout__slider_dots').animate({'left': 0});
            countClickNext++;
            countClickPrev--;
        } else if ( countClickPrev > 0 ) {
            $('.layout__slider_dots').animate({'left': '+=230'});
            countClickNext++;
            countClickPrev--;
        } else {
            return false;
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

    //Sale-set
    $('.layout__slider_big_wrap-set .layout__slider_content').slick({
        dots: false,
        infinite: true
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
        if ( $(window).width()  > 667 ) {
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

    // Delete icon

    $('.icon-delete').on('click', function () {
       $(this).closest('.basket__preview').remove();
    });

    // Create inputs

    $('.basket__forms__left .basket__forms__title_btn').on('click', function () {
        var formGroups = $(this).closest('.basket__forms__left').find('.form-group');
        if ( $(this).attr('data-times') == 2 ) {
            $(this).attr('data-times', 1);

            formGroups.each(function () {
                var val = $(this).find('input').val();
                $(this).children().remove();
                $(this).append('<span>' + val + '</span>');
            });

        } else {
            $(this).attr('data-times', 2);

            formGroups.each(function () {
                var val = $(this).find('span').text();
                $(this).children().remove();
                $(this).append('<input value="' + val + '">');
            });
        }
    });

    $('.basket__forms__right .basket__forms__title_btn').on('click', function () {
        $(this).closest('.basket__forms__right').find('.option-block__wrap').toggleClass('show');
    });

    // Cabinet

    var countOrderBlocks = 3;
    clippingGoods( '.cabinet .order-wrap', '.order-wrap__block', 3 );

    $('.order-wrap__button button').on('click', function () {
        countOrderBlocks += 4;
        clippingGoods( '.cabinet .order-wrap', '.order-wrap__block', countOrderBlocks );
    });

    $('.cabinet .data-change').on('click', function () {
        var inputs = $(this).closest('.cabinet__block_content').find('.cabinet__block_inputs');

        if ( $(this).attr('data-times') == 2 ){
            $(this).attr('data-times', 1);
            inputs.each(function () {
                var val = $(this).find('input').val();
                var inputsType = $(this).attr('type');
                $(this).children('input').remove();
                $(this).append('<span>' + val + '</span>');
                $(this).find('span:last-child').attr('data-type', inputsType).addClass('inputs');
            });

        } else {
            $(this).attr('data-times', 2);

            inputs.each(function () {
                var val = $(this).find('.inputs').text();
                var inputsType = $(this).attr('data-type');
                $(this).children('.inputs').remove();
                $(this).append('<input value="' + val + '">');
                $(this).find('input').attr('type', inputsType);

                if ( $(this).hasClass('mask-tel') ) $(this).find('input').mask('9-(999)-999-99-99');
                if ( $(this).hasClass('mask-date') ) $(this).find('input').mask("99.99.9999", {placeholder: "дд.мм.гггг" });
            });
        }
    });

    // Tabs

    var tabsAside = function(self) {
        var data = self.attr('data-tab');
        if ( !data.length ) return false;
        $('.layout__content .tab-wrapper').each(function () {
            $(this).addClass('hidden');
        });
        $('.layout__content .tab-wrapper' + '.' + data).removeClass('hidden');
    };

    $('.tab-header li').on('click', function () {
        tabsAside($(this));
    });

    $('.aside-bar.tab-header').on('click', 'li', function () {
        tabsAside($(this));
    });

    // Mobile-aside

    function cloneAside() {
        var aside = $('.desktop > ul');
        $('.mobile-aside').append( aside.clone() );
    }

    $(window).on('load', function () {
        cloneAside();
    });

    // Reviews

    $('.review-block').each(function () {
        var allText = $(this).find('.review-block__text p').text();
        var cuttingText = allText.slice(0,184) + '...';
        $(this).find('.review-block__text p').addClass('hide');
        $(this).find('.review-block__text').append('<p>' + cuttingText + '</p>');
    });

    function hideText() {
        $('.review-block').each(function () {

            $(this).find('.review-block__text p:first-child').addClass('hide');
            $(this).find('.review-block__text p:nth-child(2)').removeClass('hide');
            $(this).find('.review-block__content').removeClass('open');
            $(this).find('.review-block__link button').attr('data-count', 2).text('читать далее');
        });
    }

    $('.review-block__link button').on('click', function (e) {
        e.stopPropagation();
        $(this).closest('.review-block__content').find('.review-block__text p').toggleClass('hide');
        $(this).closest('.review-block__content').toggleClass('open');

        if ( $(this).attr('data-count') == 1 ) {
            $(this).attr('data-count', 2);
            $(this).text('читать далее');
        } else {
            hideText();
            $(this).closest('.review-block__content').find('.review-block__text p').toggleClass('hide');
            $(this).closest('.review-block__content').toggleClass('open');
            $(this).attr('data-count', 1);
            $(this).text('скрыть');

        }

    });


    var stepDesctopRev = 0;

    $(window).on('load resize', function () {
        if ( $(window).width()  >= 1323 ){
            stepDesctopRev = 9;
            clippingGoods( '.reviews .layout__content', '.review-block', 9 );
        } else if( $(window).width()  <= 642 ){
            stepDesctopRev = 5;
            clippingGoods( '.reviews .layout__content', '.review-block', 5 );
        } else if( $(window).width()  <= 983 ){
            stepDesctopRev = 8;
            clippingGoods( '.reviews .layout__content', '.review-block', 8 );
        }  else if( $(window).width()  <= 1007 ){
            stepDesctopRev = 9;
            clippingGoods( '.reviews .layout__content', '.review-block', 9 );
        } else if ( $(window).width()  < 1340 ) {
            stepDesctopRev = 8;
            clippingGoods( '.reviews .layout__content', '.review-block', 8 );
        }
    });

    function addRev( step, num ) {
        clippingGoods( '.reviews .layout__content', '.review-block', num + step );
    }

    $('.reviews .layout__add-content').on('click', function () {
        if ( $(window).width()  >= 1340 ) {
            addRev( 9,  stepDesctopRev);
            stepDesctopRev += 9;
        } else  if ( $(window).width()  <= 642 ){
            addRev( 5,  stepDesctopRev);
            stepDesctopRev += 5;
        } else  if ( $(window).width()  <= 983 ){
            addRev( 8,  stepDesctopRev);
            stepDesctopRev += 8;
        } else  if ( $(window).width()  <= 1024 ){
            addRev( 9,  stepDesctopRev);
            stepDesctopRev += 9;
        } else if ( $(window).width()  < 1340 ){
            addRev( 8,  stepDesctopRev);
            stepDesctopRev += 8;
        }

    });

    // Products list

    var stepDesctopProducts = 0;

    function addProducts( step, num ) {
        clippingGoods( '.products-list .layout__content', '.good-wrap', num + step );
    }

    $(window).on('load resize', function () {
        if ( $( window ).width() >= 1322 ) {
            stepDesctopProducts = 19;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 19 );
        } else if ( $( window ).width() <= 619 ) {
            stepDesctopProducts = 5;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 5 )
        } else if ( $( window ).width() <= 745 ) {
            stepDesctopProducts = 11;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 11 );
        } else if ( $( window ).width() <= 800 ) {
            stepDesctopProducts = 11;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 11 );
        } else if ( $( window ).width() <= 1024 ) {
            stepDesctopProducts = 14;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 14 );
        } else if ( $( window ).width() <= 1079 ) {
            stepDesctopProducts = 11;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 11 );
        } else if ( $( window ).width() <= 1321 ) {
            stepDesctopProducts = 14;
            clippingGoods( '.products-list .layout__content', '.good-wrap', 14 );
        }
    });

    $('.products-list .good-wrap.else').on('click', function () {
        if ( $( window ).width() >= 1322 ) {
            addProducts( 16,  stepDesctopProducts);
            stepDesctopProducts += 16;
        } else if ( $( window ).width() <= 619 ) {
            addProducts( 6,  stepDesctopProducts);
            stepDesctopProducts += 6;
        } else if ( $( window ).width() <= 745 ) {
            addProducts( 10,  stepDesctopProducts);
            stepDesctopProducts += 10;
        } else if ( $( window ).width() <= 800 ) {
            addProducts( 10,  stepDesctopProducts);
            stepDesctopProducts += 10;
        } else if ( $( window ).width() <= 1024 ) {
            addProducts( 15,  stepDesctopProducts);
            stepDesctopProducts += 15;
        } else if ( $( window ).width() <= 1079 ) {
            addProducts( 10,  stepDesctopProducts);
            stepDesctopProducts += 10;
        } else if ( $( window ).width() <= 1321 ) {
            addProducts( 15,  stepDesctopProducts);
            stepDesctopProducts += 15;
        }
    });



    $('.product-aside li').on('click', function () {
        $(this).children('.dropdown').slideToggle();
    });

    $('.aside-bar.product-aside').on('click', 'li', function (e) {
        e.stopPropagation();
        $(this).toggleClass('open');
        $(this).children('.dropdown').slideToggle();
        console.log(e.target)
    });


    // Reset btn

    $('.filter .btn-default').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.filter')[0].reset();
        $('input:checkbox').trigger('refresh');
        $('input:radio').trigger('refresh');
    });

    $('.filter .icon-arrow-down').on('click', function () {
       $(this).closest('.form-group').find('.form-wrap').slideToggle();
       $(this).closest('.form-group').toggleClass('open');
    });


    // Change place of filter

    $(window).on('load resize', function () {
        var asideFilter = $('.filter');
        if ( $(window).width() > 1024  ) {
            if ( !($('.aside-bar.desktop .filter').length) ){
                $('.aside-bar.desktop').append(asideFilter);
            }
        } else if ( $(window).width() <= 1024 ){
            if ( !($('.layout__filter .filter').length) ){
                $('.layout__filter').append(asideFilter);
            }
        }
    });

    //Triangle of filter

    $(window).on('load resize', function () {
        var filterWidth = $('.layout__filter').width();
        $('.triangle').css({
            'border-right': filterWidth / 2 + 'px solid transparent',
            'border-left': filterWidth / 2 + 'px solid transparent'
        });
    });

    $('.layout__filter .btn-show').on('click', function () {
        $(this).parent().find('.filter').slideToggle();
        $(this).parent().toggleClass('close');
       if ( $(this).attr('data-count', 1) ){
           $(this).attr('data-count', 2).text('скрыть фильтр')
       } else {
           $(this).attr('data-count', 1).text('открыть фильтр')
       }
    });

    $('.products-list .good-wrap .good-img a, .products-list .good-wrap .good-title a').on('click', function (e) {
       e.preventDefault();
    });

    // Modals

    $('.icon-link.login,.icon-login').on('click', function (e) {
        e.stopPropagation();
        $('.overflow').addClass('active');
        $('.modal.login').addClass('active');
    });

    $('.btn-registration, .btn-register').on('click', function (e) {
        e.stopPropagation();
        $('.overflow').addClass('active');
        $('.modal.active').removeClass('active');
        $('.modal.registration').addClass('active');
    });

    $('.layout__form-reviews .btn-primary').on('click', function (e) {
        e.stopPropagation();
        $('.overflow').addClass('active');
        $('.modal.active').removeClass('active');
        $('.modal.review').addClass('active');
    });

    $('.modal').on('click', function (e) {
        e.stopPropagation();
    });

    $('.modal__close').on('click', function () {
        $('.overflow').removeClass('active');
        $('.modal.active').removeClass('active');
    });

    $('.modal input[type="tel"]').mask("+7(999)-999-99-99", {placeholder: "+7(___)-___-__-__" });

    // Validation

    $('.modal .send').on('click', function (e) {
        e.preventDefault();
        var form = $(this).closest('form');
        var password = form.find('input[name="password"]');
        var confirmPassword = form.find('input[name="confirmPassword"]');
        var email = form.find('input[name="email"]');
        var select = form.find('select');

        form.find('.invalid').each(function () {
            $(this).removeClass('invalid')
        });


        form.find('.required').each(function () {
            var self = $(this);

           if ( !(self.val()) ){
               self.parent().addClass('invalid');
           }
        });

        if ( password.length && confirmPassword.length ){
            if ( password.val() != confirmPassword.val() ) {
                password.parent().addClass('invalid');
                confirmPassword.parent().addClass('invalid');
            }
        }

        if ( email.length ) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( !re.test(String(email.val()).toLowerCase()) ){
                email.parent().addClass('invalid');
            }
        }

        if ( select.length ) {
            if (select.parent().hasClass('changed') ) {
                select.parent().parent().removeClass('invalid');
            }
        }

        if ( form.find('.invalid').length ){
            return false;
        } else {
            $(this).closest('form')[0].reset();
            $('.modal.active').removeClass('active');
            $('.overflow').removeClass('active');
            $('input:checkbox').trigger('refresh');
        }
    });

    // VK

    if ( document.getElementById('vk_groups') )  {
        var script = document.createElement("script");
        script.src = "https://vk.com/js/api/openapi.js?156";
        script.async = true;
        script.addEventListener('load', function () {
            VK.Widgets.Group("vk_groups", {mode: 3}, 20003922)
        });
        document.getElementsByTagName("script")[0].parentNode.appendChild(script);
    }

});
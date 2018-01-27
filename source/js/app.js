var preloader = (function () {
    var percentsTotal = 0,
        preloader = $('.preloader');


    var imgPath = $('*').map(function (index, element) {
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';

        if (background != 'none')
        {
            path = background.replace('url("', '').replace('")', '');
        }

        if (img)
        {
            path = $(element).attr('src');
        }

        if (path) return path;

    });

    var setPercent = function (total, current) {
        var percent = Math.ceil(current / total * 100);

        $('.preloader__percents').text(percent + '%');

        if (percent >= 100)
        {
            preloader.fadeOut();
        }
    };

    var loadImages = function (images) {
        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {

            var fakeImage = $('<img>', {
                attr : {
                    src : img
                }
            });

            fakeImage.on('load error', function () {
                percentsTotal++;
                setPercent(images.length, percentsTotal);
            });

        });
    };

    return {
        init: function () {
            var imgs = imgPath.toArray();

            loadImages(imgs);
        }
    }
} ());

var slider = (function () {

    var duration = 700,
        inProcess = false;

    var moveSlide = function (container, direction) {
        var items = container.find('.slider__item'),
            activeItem = items.filter('.active'),
            counter = activeItem.index(),
            direction = direction == 'down' ? 100 : -100;

        counter--;

        if (counter >= items.length) counter = 0;
        if (counter < 0) counter = items.length-1;

        var reqItem = items.eq(counter);

        activeItem.animate({
            'top' : direction + '%'
        },duration);

        reqItem.animate({
            'top' : '0'
        },duration, function () {
            activeItem.removeClass('active').css('top', direction * (-1) + '%');
            $(this).addClass('active');
            inProcess = false;
        });
    };

    var moveShow = function (container) {
        var items = container.find('.slide-show__item'),
            activeItem = items.filter('.active'),
            counter = activeItem.index(),
            containerText = container.find('.about-work__title'),
            containerTech = container.find('.about-work__tech'),
            containerUrl = container.find('.about-work__url');

        counter --;

        var reqItem = items.eq(counter),
            textNew = reqItem.find('.slide-show__text').text();
            techNew = reqItem.find('.slide-show__tech').text();
            urlNew = reqItem.find('.slide-show__url').text();

        containerText.fadeOut(duration/2, function () {
            containerText.text(textNew);
            containerText.fadeIn(duration/2);
        });

        containerTech.fadeOut(duration/2, function () {
            containerTech.text(techNew);
            containerTech.fadeIn(duration/2);
        });

        activeItem.fadeOut(duration/2, function () {
            containerUrl.attr('href', urlNew);

            reqItem.fadeIn(duration/2);
            activeItem.removeClass('active');
            reqItem.addClass('active');

        });

    };


    return {
        init: function () {
            $('.slider__btn-arrow').on('click', function (e) {
                e.preventDefault();

                if (!inProcess)
                {
                    inProcess = true;
                    moveSlide($('.slider_first'), 'down');
                    moveSlide($('.slider_opposite'), 'up');

                    moveShow($('.works__sliders'))
                }
            })
        }
    }

} ());

var menuBlog = (function () {
    let menuItems = $('.menu__item'),
        buttonMobileMenu = $('.blog__btn-mobile'),
        flag = true;

    let scrollMenu = function (container) {

        $(document).scroll(function () {
            let wrapperOffset = container.offset().top,
                articleContainer = $('.article'),
                menu = $('.blog__menu');

            let offset;

            for(let i = 0; i < articleContainer.length; i++) {
                offset = articleContainer.eq(i).offset();

                if(window.scrollY >= offset.top-300) {
                    menuItems.removeClass('active');
                    menuItems.eq(i).addClass('active');
                }else {
                    break;
                }
            }

            if((window.scrollY > wrapperOffset) && (window.innerWidth > 768)) {
                menu.addClass('blog__menu_fixed');
            } else {
                menu.removeClass('blog__menu_fixed');
            }


            if((window.scrollY > wrapperOffset-300) && (window.innerWidth < 768)) {
                buttonMobileMenu.css({'opacity': '1', 'visibility' : 'visible'});

            } else {

                buttonMobileMenu.css({'opacity': '0', 'visibility' : 'hidden'});
            }


        });

    };

    menuItems.on('click',function () {
        let scrollBlogDeffered = $.Deferred(),
            offset = $(this).attr('data-article-offset'),
            aside = $('.blog__aside');


        if (flag) {
            flag = false;
            $('body,html').animate({
                scrollTop: offset
            },500, function () {
                scrollBlogDeffered.resolve()
            });

            aside.removeClass('blog__aside_active');
        }
        scrollBlogDeffered.done(function(){
            flag = true;
        })
    });

    $(window).resize(function() {
        setDataArticleOffset();
    });

    //фунция заполняет data-article-offset у всех пунктов меню
    var setDataArticleOffset = function () {
        var articleContainer = $('.article'),
            i = 0,
            offset;

        menuItems.each(function(){
            offset = articleContainer.eq(i).offset();
            menuItems.eq(i).attr('data-article-offset',offset.top);
            i++;
        })
    };

    
    return {
        init: function (container) {
            scrollMenu(container);
            setDataArticleOffset();
        }
    }
    
} ());

var skillLoad = (function () {

    var scrollAbout = function (container) {

        $(document).scroll(function () {
            var wrapperOffset = container.offset().top,
                skill = $('.skill');

            if(window.scrollY > wrapperOffset - 300) {

                skill.each(function (i, el) {
                    let block = $(el).find('.skill__circle'),
                        circle = $(el).find('.skill__circle-second'),
                        text = $(el).find('.skill__name'),
                        fill;
                    setTimeout(function() {
                        block.fadeIn();
                        text.fadeIn();
                        fill = $(el).attr('data-fill');
                        circle.addClass('skill__circle-second_circle-' + fill);
                        // text.fadeIn(100);

                    }, 200 + (i * 200));
                });
            }
        });
    };


    return {
        init: function (container) {
            scrollAbout(container);
        }
    }
} ());

let fullScreenMenu = (function () {


    let toggleMenu = function () {
        let top = $('.hamburger__spinner_top'),
            mid = $('.hamburger__spinner_mid'),
            bot = $('.hamburger__spinner_bot'),
            menu = $('.menu-fullscreen'),
            menuItem = $('.menu-fullscreen__item'),
            humburger = $('.hero__hamburger'),
            humburgerLeft = humburger.offset().left,
            humburgerWidth = humburger.outerWidth(),
            windowWidth = $(window).width(),
            humburgerRight =  windowWidth - humburgerLeft - humburgerWidth,
            state = mid.css('opacity');


        if (state == 1)
        {
            top.css({
                'transform'  : 'rotate(-135deg)',
                'margin-top' : '15px'
            });

            bot.css({
                'transform'  : 'rotate(135deg)',
                'margin-top' : '-20px'
            });

            mid.css({
                'opacity'  : '0'
            });


            humburger.addClass('hero__hamburger_fixed');
            humburger.css('right', humburgerRight + 'px');


        }
        else
        {
            top.css({
                'transform'  : 'rotate(0deg)',
                'margin-top' : '0'
            });

            bot.css({
                'transform'  : 'rotate(0deg)',
                'margin-top' : '10px'
            });

            mid.css({
                'opacity'  : '1'
            });

            humburger.removeClass('hero__hamburger_fixed');
            humburger.css('right', '40px');
        }

        menu.toggleClass('menu-fullscreen_active');
        menuItem.toggleClass('menu-fullscreen__item_active');

        setTimeout(function () {
            menu.toggleClass('menu-fullscreen_visible');
        },500)
    };



    return {
        init: function () {

            $('.hero__hamburger').on('click', toggleMenu);

        }
    }
} ());




$(document).ready(function () {
    let blogContainer = $('.blog__content'),
        aboutContainer = $('.about-data');

    if (blogContainer.length) menuBlog.init(blogContainer);
    if (aboutContainer.length) skillLoad.init(aboutContainer);

    preloader.init();
    slider.init();
    fullScreenMenu.init();


    $('.welcome__btn-auth').on('click', function (e) {
        e.preventDefault();
        let intro = $('.flipper__container'),
            btnAuth = $('.welcome__btn-auth');
        intro.addClass('flipper__container_rotate');
        btnAuth.fadeOut();
    });


    $('.intro__on-main').on('click', function (e) {
        e.preventDefault();
        let intro = $('.flipper__container'),
            btnAuth = $('.welcome__btn-auth');
        intro.removeClass('flipper__container_rotate');
        btnAuth.fadeIn();
    });

    $('.hero__btn-arrow').on('click', function (e) {

        e.preventDefault();
        let container = $('.hero'),
            sublings = container.siblings(),
            offset = sublings.eq(0).offset().top;

        $('body,html').animate({
            scrollTop: offset
        },500);

    });

    $('.about-say__btn-arrow').on('click', function (e) {
        e.preventDefault();
        let container = $('.works'),
            offset = container.offset().top;

        $('body,html').animate({
            scrollTop: offset
        },500);
    });


    $('.blog__btn-mobile').on('click', function (e) {
        let container = $('.blog__aside');
        container.toggleClass('blog__aside_active');
    });

    $('.btn-upload__input').on('change', function() {

        let splitFakePath = this.value.split('\\'),
            container = $('.btn-upload__text');

        container.text('Загрузить картинку (' + splitFakePath[splitFakePath.length - 1] + ')');
    });


    $('.tabs__link').on('click', function (e) {
        e.preventDefault();

        let $that = $(e.target),
            itemMenu = $that.closest('.tabs__item'),
            indexItemMenu = itemMenu.index(),
            itemContent = $('.tabs__content').eq(indexItemMenu),
            parentItemsMenu = itemMenu.closest('.tabs__title-list'),
            currentItemMenu = parentItemsMenu.find('.tabs__item_active'),
            parentItemsContent = $('.tabs__content-list'),
            currentItemContent = parentItemsContent.find('.tabs__content_active');

        currentItemMenu.removeClass('tabs__item_active');
        currentItemContent.removeClass('tabs__content_active');
        itemMenu.addClass('tabs__item_active');
        itemContent.addClass('tabs__content_active');
    })

});



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
    var menuItems = $('.menu__item');
    var flag = true;

    var scrollMenu = function (container) {

        $(document).scroll(function () {
            var wrapperOffset = container.offset().top,
                articleContainer = $('.article'),
                menu = $('.blog__menu');

            var offset;

            for(var i = 0; i < articleContainer.length; i++) {
                offset = articleContainer.eq(i).offset();

                if(window.scrollY >= offset.top-300) {
                    menuItems.removeClass('active');
                    menuItems.eq(i).addClass('active');
                }else {
                    break;
                }
            }
            if(window.scrollY > wrapperOffset) {
                menu.addClass('blog__menu_fixed');
            } else {
                menu.removeClass('blog__menu_fixed');
            }
        });

    };

    menuItems.on('click',function () {
        var scrollBlogDeffered = $.Deferred();
        var offset = $(this).attr('data-article-offset');


        if (flag) {
            flag = false;
            $('body,html').animate({
                scrollTop: offset
            },500, function () {
                scrollBlogDeffered.resolve()
            });
        }
        scrollBlogDeffered.done(function(){
            flag = true;
        })
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
                // circle = $('.skill__circle-second');
                 // skill__circle-second_circle-60
            // console.log(window.scrollY, wrapperOffset);
            if(window.scrollY > wrapperOffset - 200) {



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


                // $.each(skill, function(i, el) {
                //
                //
                // });




                // skill.toArray().reduce(
                //     function(acc, cur) {
                //         let circle = $(this).find('.skill__circle-second');
                //         return acc.then(function() {
                //             return $(cur).delay(800).promise().then(function() {
                //                 circle.addClass('skill__circle-second_circle-50')
                //             });
                //         })
                //     }, Promise.resolve());

                // skill.each(function () {
                //     let fill = $(this).attr('data-fill'),
                //         className = 'skill__circle-second_circle-' + fill,
                //         circle = $(this).find('.skill__circle-second'),
                //         cicleDeffered = $.Deferred();
                //
                //     setTimeout(function () {
                //         cicleDeffered.resolve();
                //         console.log(1);
                //     }, 1000);
                //
                //     cicleDeffered.done(function(){
                //         circle.addClass(className);
                //     })
                //
                // });
            } else {

            }
        });
    };





    return {
        init: function (container) {
            scrollAbout(container);
        }
    }
} ());


$(document).ready(function () {
    var blogContainer = $('.blog__content'),
        aboutContainer = $('.about-data');


    if (blogContainer.length) menuBlog.init(blogContainer);
    if (aboutContainer.length) skillLoad.init(aboutContainer);

    preloader.init();
    slider.init();



    $('.welcome__btn-auth').on('click', function (e) {
        e.preventDefault();
        var intro = $('.flipper__container'),
            btnAuth = $('.welcome__btn-auth');
        intro.css('transform', 'rotateY(180deg)');
        btnAuth.fadeOut();
    });


    $('.intro__on-main').on('click', function (e) {
        e.preventDefault();
        var intro = $('.flipper__container'),
            btnAuth = $('.welcome__btn-auth');
        intro.css('transform', 'rotateY(0deg)');
        btnAuth.fadeIn();
    });

    $('.hero__hamburger').on('click', function () {

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
    });


});


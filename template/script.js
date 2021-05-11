$(document).ready(function () {
    // Banner Sliding

    let $slider = $('#banner-slider > .slider-content > .item'),
        sliderHovering = false,
        sliderFading = false,
        slideWidth = $('#banner-slider').width(),
        slideDiff = 0,
        curSlide = 0,
        numOfSlides = $('#banner-slider > .slider-content > .item').length - 1,
        slideAnimTime = 500;

    const sliderTempContainer = $('#banner-slider > .slider-temp');

    (function () {
        setInterval(function () {
            if (!sliderHovering) fadeIn(1);
        }, 5000);
    })();

    function fadeIn(direction) {
        sliderFading = true;

        const tempItem = $('#banner-slider > .slider-content > .item').eq(curSlide).clone();
        tempItem.css("transform", "translate3d(0,0,0)");

        if (direction === 1) {
            if (curSlide < numOfSlides) {
                curSlide++;
            } else {
                curSlide = 0;
            }
        } else {
            if (curSlide >= 0) {
                curSlide--;
            } else {
                curSlide = numOfSlides;
            }
        }

        sliderTempContainer.append(tempItem);

        $slider.hide();
        $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");

        const newItem = $('#banner-slider > .slider-content > .item').eq(curSlide);

        const newSliderHeader = newItem.find('.slider-header');
        const newBigText = newItem.find('.big-text');
        const newExcerpt = newItem.find('.excerpt');
        const newButtonHolder = newItem.find('.button-holder');

        $slider.show();
        newItem.hide();
        newSliderHeader.hide();
        newBigText.hide();
        newExcerpt.hide();
        newButtonHolder.hide();

        newItem.fadeIn(600, function () {
            newSliderHeader.delay(200).fadeIn();
            newBigText.delay(200).fadeIn();
            newExcerpt.delay(400).fadeIn();
            newButtonHolder.delay(550).fadeIn(function () {
                sliderFading = false;
                sliderTempContainer.empty();
            });
        });
    }

    $('.slider-controls .btn-prev').on('click', function () {
        if (!sliderFading) fadeIn(-1);
    });

    $('.slider-controls .btn-next').on('click', function () {
        if (!sliderFading) fadeIn(1);
    });

    $('#banner-slider').on('mouseenter', function () {
        sliderHovering = true;
    });

    $('#banner-slider').on('mouseleave', function () {
        sliderHovering = false;
    });

    function changeSlides(instant) {
        if (!instant) {
            sliderFading = true;
            $slider.addClass("animating");

            const newItem = $('#banner-slider > .slider-content > .item').eq(curSlide);

            setTimeout(function () {
                $slider.removeClass("animating");
                newItem.find('.slider-header').delay(200).fadeIn();
                newItem.find('.big-text').delay(200).fadeIn();
                newItem.find('.excerpt').delay(400).fadeIn();
                newItem.find('.button-holder').delay(550).fadeIn(function () {
                    sliderFading = false;
                });
            }, slideAnimTime);
        }
        $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
        slideDiff = 0;
    }

    function navigateLeft() {
        if (sliderFading) return;
        if (curSlide > 0) curSlide--;
        changeSlides();
    }

    function navigateRight() {
        if (sliderFading) return;
        if (curSlide < numOfSlides) curSlide++;
        changeSlides();
    }

    $('#banner-slider').on('mousedown touchstart', function (e) {
        if ($(e.toElement).hasClass('btn-slider-controls-sign')) return;
        if (sliderFading) return;

        const hidingItem = $(`#banner-slider > .slider-content > .item:not(':eq(${curSlide})')`);
        hidingItem.find('.slider-header').hide();
        hidingItem.find('.big-text').hide();
        hidingItem.find('.excerpt').hide();
        hidingItem.find('.button-holder').hide();

        const startX = (e.pageX || e.originalEvent.touches[0].pageX) - $(this).offset().left;
        slideDiff = 0;

        $('#banner-slider').on('mousemove touchmove', function (e) {
            const x = (e.pageX || e.originalEvent.touches[0].pageX) - $(this).offset().left;
            slideDiff = (startX - x) / slideWidth * 70;

            if ((!curSlide && slideDiff < 0) || (curSlide === numOfSlides && slideDiff > 0)) slideDiff /= 2;
            $slider.css('transform', 'translate3d(' + (-curSlide * 100 - slideDiff) + '%,0,0)');
        });
    });

    $('#banner-slider').on("mouseup touchend", function (e) {
        if ($(e.toElement).hasClass('btn-slider-controls-sign')) return;
        $('#banner-slider').off("mousemove touchmove");

        if (sliderFading) return;

        if (!slideDiff) {
            changeSlides(true);
            return;
        }
        if (slideDiff > - 20 && slideDiff < 20) {
            changeSlides();
            return;
        }
        if (slideDiff <= - 20) {
            navigateLeft();
        }
        if (slideDiff >= 20) {
            navigateRight();
        }
    });


    // Product sliding

    let $productSlider = $('#product-slider > .item'),
        productSlideWidth = $('#product-slider > .item').width(),
        productSlideDiff = 0,
        productCurSlide = 0,
        productNumOfSlides = 1;

    (function(){
        const deviceWidth = $(document).width();
        if(deviceWidth < 576){
            productNumOfSlides = 4;
        }else if(deviceWidth < 992){
            productNumOfSlides = 2;
        }
    })();

    function productChangeSlides(instant) {
        if (!instant) {
            $productSlider.addClass("animating");

            setTimeout(function () {
                $productSlider.removeClass("animating");
                sliderFading = false;
            }, slideAnimTime);
        }
        $productSlider.css("transform", "translate3d(" + -productCurSlide * 100 + "%,0,0)");
        productSlideDiff = 0;
    }

    function productNavigateLeft() {
        if (productCurSlide > 0) productCurSlide--;
        productChangeSlides();
    }

    function productNavigateRight() {
        if (productCurSlide < productNumOfSlides) productCurSlide++;
        productChangeSlides();
    }

    $('#product-slider').on('mousedown', function(e){ e.preventDefault(); });

    $('#product-slider').on('mousedown touchstart', function (e) {
        const startX = (e.pageX || e.originalEvent.touches[0].pageX) - $(this).offset().left;
        productSlideDiff = 0;
        
        $('#product-slider').on('mousemove touchmove', function (e) {
            const x = (e.pageX || e.originalEvent.touches[0].pageX) - $(this).offset().left;
            productSlideDiff = (startX - x) / productSlideWidth * 70;

            if ((!productCurSlide && productSlideDiff < 0) || (productCurSlide === productNumOfSlides && productSlideDiff > 0)) productSlideDiff /= 2;
            $productSlider.css('transform', 'translate3d(' + (-productCurSlide * 100 - productSlideDiff) + '%,0,0)');
        });
    });

    $('#product-slider').on("mouseup touchend", function (e) {
        $('#product-slider').off("mousemove touchmove");

        if (!productSlideDiff) {
            productChangeSlides(true);
            return;
        }
        if (productSlideDiff > - 20 && productSlideDiff < 20) {
            productChangeSlides();
            return;
        }
        if (productSlideDiff <= - 20) {
            productNavigateLeft();
        }
        if (productSlideDiff >= 20) {
            productNavigateRight();
        }
    });

    $('.product-slider-controls > .btn-prev').on('click', function(){
        productNavigateLeft();
    });

    $('.product-slider-controls > .btn-next').on('click', function(){
        productNavigateRight();
    });


    // Toggling

    $('.navbar-toggle').on('click', function(){
        $('.navbar').toggleClass('open');
    });


    // Accordion

    $('.accordion-holder > .item').on('click', function(){
        $('.accordion-holder > .item').removeClass('open');
        $(this).addClass('open');
    });


    // Tabs

    $('.nav-tabs > li > a').on('click', function(e){
        e.preventDefault();
        const targetTab = $(this).closest('li');
        const targetPane = $($(this).attr('href'));

        targetTab.closest('ul').children('li').removeClass('active');
        targetTab.addClass('active');

        targetPane.closest('.tab-content').children('.tab-pane').removeClass('active');
        targetPane.addClass('active');
    });
});
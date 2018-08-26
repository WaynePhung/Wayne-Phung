"use strict"; //Strict mode on.

$(document).ready(function() {
    // window.addEventListener("touchstart", func);

// ----------------------- VARIABLE DECLARATIONS HERE -----------------------

/* List of variable declarations that specify classes and IDs of elements
   within the header for liveDemoPage.html.*/

 //*****Variables from liveDemoPage.html.
   let nightModeVariables = $('html, body, p, a, #mainMenu, #menuButton, .name > a,' +
                              '.navMenu, .bars, #menuList, #toggleModes, #normalMode,' +
                              ' #nightMode, #disabled, #tabRibbon, h1, .mainBodyWrapper > p'),
       body = $('body'),
       menuButton = $('#menuButton'),
       name = $('.name'),
       nameP = $('.name > p'),
       mainMenu = $('#mainMenu'),
       menuWrapper = $('.menuWrapper'),
       tabRibbon = $('#tabRibbon'),
       menuList = $('#menuList'),
       listItem = $('.listItem'),
       // name = $('#name'),
       // navMenu = $('.navMenu'),
       // menuItems = $('.menuItems'),
       // toggleModes = $('#toggleModes'),
       // barItem = $('.barItem'),
       toggleSlider = $('.toggleSlider'),
       normalMode = $('#normalMode'),
       nightMode = $('#nightMode'),
       toggleModes = $('#toggleModes'),
       stickNightMode = localStorage.getItem('nightMode');

    //*****END variables from liveDemoPage.html.

    //*****Variables for index.html.
    let indexNightModeVar = $('.bodySection, #bgVideo, .sectionArrows'),
        mainBodyWrapper = $('.mainBodyWrapper'),
        mainVideo = $('#mainVideo'),
        bgVideo = $('#bgVideo'),
        section1 = $('.bodySection').get(0),
        section2 = $('#section2'),
        section3 = $('#section3'),
        links = $('a'),
        sectionGrid = $('.sectionGrid'),
        galleryGrid = $('.galleryGrid'),
        subSectionGrid = $('.subSectionGrid'),
        leftArrow = $('#leftArrow'),
        rightArrow = $('#rightArrow');
    //*****END variables for index.html.

// --------------------- END OF VARIABLE DECLARATIONS ----------------------


// ----------------------- INTERACTIVE EFFECTS HERE ------------------------
// *****JS for liveDemoPage.html.
    if (stickNightMode == "true") {
        nightModeVariables.addClass('nightMode');
        indexNightModeVar.addClass('nightMode');
        $('#switch').prop('checked', true);
    } else {
        nightModeVariables.removeClass('nightMode');
        indexNightModeVar.removeClass('nightMode');
    }

    let ifScrolled = true, veryTop = 0, threshold = 5, linkClicked;
    changeColorNav();
    if ($(window).scrollTop() > ($(window).height()*(1/5))) {
        $('#tabRibbon, #mainMenu').addClass('navUp');
    }

    $(window).on('resize', function(){
        changeColorNav();
        $('#tabRibbon, #mainMenu').addClass('navUp');
    });

    $(window).on('scroll', function(){
        // console.log('Scroll top: ' + parseInt($(window).scrollTop()) + ' Window height: ' + $(window).height());
        if (linkClicked == true) {
            $('#tabRibbon, #mainMenu').addClass('navUp');
        } else {
            setInterval(function() {
                slideNavBar(linkClicked);
            }, 200);
        }
        // console.log('linkClicked from scroll function: ' + linkClicked);
        changeColorNav();
    });

    function slideNavBar (linkClick) {
        let scrollTop = $(window).scrollTop(), scrollBoundary = $(window).height()*(1/5);
        // console.log('Scroll Top: ' + parseInt(scrollTop) + ' ScrollBoundary: ' + parseInt(scrollBoundary));
        if (menuButton.data('clicked')) {
            console.log('Menu button clicked.');
            return;
        }
        if (Math.abs(veryTop - scrollTop) <= threshold) {
            return;
        } else {
            if (scrollTop <= scrollBoundary) {
                $('#tabRibbon, #mainMenu').removeClass('navUp');
                return;
            } else if (scrollTop > veryTop && scrollTop > threshold) {
                    $('#tabRibbon, #mainMenu').addClass('navUp');
            } else {
                if ((scrollTop > scrollBoundary) && (scrollTop + $(window).height() <= $(document).height())) {
                    $('#tabRibbon, #mainMenu').removeClass('navUp');
                }
            }
        }
        veryTop = scrollTop;
        return veryTop;
    }

    function changeColorNav() {
        let navBarVariables = $('.name a p, .listItem, .sliderGroup > p, #toggleModes');
        if ($(window).scrollTop() > ($(window).height()*(1/5))) {
            // console.log('Change color.');
            if (navBarVariables.hasClass('nightMode')) {
                $('.bars').css('background', 'white');
                navBarVariables.css('color', 'white');
            } else {
                $('.bars').css('background', 'black');
                navBarVariables.css('color', 'black');
            }
            tabRibbon.removeClass('transparentBG');
        } else {
            if (navBarVariables.hasClass('nightMode')) {
                $('.bars').css('background', 'white');
                navBarVariables.css('color', 'white');
            } else {
                $('.bars').css('background', 'black');
                navBarVariables.css('color', 'black');
            }
            // $('.bars').css('background', 'white');
            // navBarVariables.css('color', 'white');
            tabRibbon.addClass('transparentBG');
        }
    }

    menuButton.click (function () {
        console.log('Scroll Top: ' + parseInt($(window).scrollTop()) + ' ScrollBoundary: ' + parseInt($(window).height()*(1/5)));
        $('#tabRibbon, #mainMenu').removeClass('navUp');
        tabRibbon.addClass('disableScroll');
        $('#bar1, #bar2, #bar3').toggleClass('shift');
        // navMenu.toggleClass('active');
        name.css('opacity', (name.css('opacity') == '1') ? '0' : '1');
        name.toggleClass('translate');
        mainMenu.toggleClass('translate');
        tabRibbon.toggleClass('expandMenu');
        menuList.css('opacity', (menuList.css('opacity') == '0') ? '1' : '0');
        // toggleModes.toggleClass('translate');
        toggleModes.css('opacity', (toggleModes.css('opacity') == '0') ? '1' : '0');
        mainBodyWrapper.toggleClass('blur'); //New in index.html.
    });

    toggleSlider.click (function toggleMode() {
        nightModeVariables.toggleClass('nightMode');
        indexNightModeVar.toggleClass('nightMode');
        $(nightModeVariables).hasClass('nightMode') ? (localStorage.setItem('nightMode', 'true'), $('html').css('background-color', 'black')) :
            (localStorage.setItem('nightMode', 'false'), $('html').css('background-color', 'white'));
        changeColorNav();
    });

    links.on('click', function() {
        let hash = this.hash;
        $('html, body').animate({
            scrollTop: parseInt($(hash).offset().top)
        }, 600);
        linkClicked = true;
        console.log('linkClicked from onClick: ' + linkClicked);
        $('#tabRibbon, #mainMenu').addClass('navUp');
        changeColorNav();
        hideMenu();
    });

    function hideMenu() {
        tabRibbon.removeClass('disableScroll');
        $('#bar1, #bar2, #bar3').toggleClass('shift');
        // navMenu.toggleClass('active');
        name.css('opacity', '1');
        name.removeClass('translate');
        mainMenu.removeClass('translate');
        tabRibbon.removeClass('expandMenu');
        menuList.css('opacity', '0');
        // toggleModes.toggleClass('translate');
        toggleModes.css('opacity', '0');
        mainBodyWrapper.removeClass('blur'); //New in index.html.
    }

    let defaultIndex = 0;
    console.log('Default Index: ' + defaultIndex);
    scrolling(defaultIndex);
    sectionGrid.on('click', scrolling(defaultIndex));
    leftArrow.on('click', previousTab);
    rightArrow.on('click', nextTab);

    let resizeResponse, interval = 10;
    $(window).resize(function() {
        resizeResponse = setTimeout( function () {
            if (defaultIndex != 0 && defaultIndex < subSectionGrid.length) {
                console.log('Window resized.');
                scrolling(defaultIndex);
            }
        }, interval);
    });

    subSectionGrid.on("swipeleft", function() {
        nextTab();
        console.log('Swiped left.');
    });
    subSectionGrid.on("swiperight", function() {
        previousTab();
        console.log('Swiped right.');
    });

    function previousTab() {
        if (defaultIndex == 0 && defaultIndex - 1 < 0) {
            // Do nothing.
        } else {
            defaultIndex -= 1;
            scrolling(defaultIndex);
        }
    }

    function nextTab() {
        if (defaultIndex == subSectionGrid.length - 1 && defaultIndex + 1 >= subSectionGrid.length) {
            // Do nothing.
        } else {
            defaultIndex += 1;
            scrolling(defaultIndex);
        }
    }

    function scrolling (index) {
        changeIndex(index);
        scrollBody(defaultIndex);
    }

    function changeIndex(num) {
        // console.log(tabcontent.length);
        if (num <= 0) {
            num = 0;
            leftArrow.prop('disabled', true);
            leftArrow.css('opacity', '0.5');
            rightArrow.prop('disabled', false);
            rightArrow.css('opacity', '1');
        } else if (num >= subSectionGrid.length - 1) {
            num = subSectionGrid.length - 1;
            leftArrow.prop('disabled', false);
            leftArrow.css('opacity', '1');
            rightArrow.prop('disabled', true);
            rightArrow.css('opacity', '0.5');
        } else {
            leftArrow.prop('disabled', false);
            leftArrow.css('opacity', '1');
            rightArrow.prop('disabled', false);
            rightArrow.css('opacity', '1');
        }
        if (num >= 0 && num <= subSectionGrid.length - 1) {
            openPage(num);
        }
        defaultIndex = num;
        console.log('New Index from num: ' + defaultIndex);
        return defaultIndex;
    }

    function openPage(num) {
        console.log('Clicked.');
        let i;
        for (i = 0; i < subSectionGrid.length; i++) {
            // tabcontent[i].style.display = (i == parseInt(num)) ? "block" : "none";
            subSectionGrid.eq(i).css('opacity', (i == num) ? "1" : "0"); //tabcontent.eq(parse(num)).css('opacity');
        }
    }

    function scrollBody (index) {
        console.log('New Index from subSection: ' + index);
        defaultIndex = index;
        let centerBody = widthAndCenter(subSectionGrid, galleryGrid, defaultIndex);
        galleryGrid.animate({"scrollLeft": centerBody}, 300);
    }

    function widthAndCenter (link, container, index) {
      let x = container.width(),
          y = link.eq(index).outerWidth(true),
          z = index,
          q = 0,
          m = container.find(link);

      console.log('X: ' + x + ' Y: ' + y + ' Z: ' + z + ' Q: ' + q + ' M: ' + m);
      //Just need to add up the width of all the elements before our target.
      for (let i = 0; i < z; i++){
        q+= $(m[i]).outerWidth(true);
      }
      let width = Math.max(0, q - ((x - y)/2));
      console.log('Width: ' + width);
      return width;
    }

    // $(".subSectionGrid").smoothDivScroll({
    //     mousewheelScrolling: "allDirections",
    //     touchScrolling: true,
    //     manualContinuousScrolling: true
    // });
    // .animate({
    //     scrollTop: $(".galleryGrid").offset().top
    // }, 2000);

     // *****END JS for liveDemoJS.html.


    // *****JS for index.html.



    // let parallaxBG1 = new Parallax(section1, {
    //   clipRelativeInput: true,
    //   limitX: false,
    //   limitY: false,
    //   invertY: true,
    //   hoverOnly: true
    // });
    //
    // let parallaxBG2 = new Parallax(bg2, {
    //   clipRelativeInput: true,
    //   limitX: 1,
    //   limitY: false,
    //   invertY: true,
    //   hoverOnly: true
    // });

    // mainVideo.parallax({
    //
    // });

    // $('#section1').parallax({
    //     imageSrc: 'http://wptest.io/demo/wp-content/uploads/sites/2/2012/12/unicorn-wallpaper.jpg',
    //     zIndex: 1,
    //     // iosFix: true,
    //     bleed: 0.5
    // });
    //
    // let rellaxBodySection1 = new Rellax('.filter', {
    //     speed: 0,
    //     center: false,
    //     wrapper: null,
    //     round: true,
    //     vertical: true,
    //     horizontal: false
    // });

    // *****END JS for index.html.

});

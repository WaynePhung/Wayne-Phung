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
        links = $('a');
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

    // changeColorNav();

    $(window).on('resize', function(){
        // changeColorNav();
        $('#tabRibbon, #mainMenu').addClass('navUp');
    });

    $(window).scroll(function(){
        // changeColorNav();
    });

    links.on('click', function() {

    });
    menuButton.click (function () {
        console.log('Scroll Top: ' + parseInt($(window).scrollTop()) + ' ScrollBoundary: ' + parseInt($(window).height()*(1/5)));
        $('#tabRibbon, #mainMenu').removeClass('navUp');
        body.toggleClass('disableScroll');
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

    });

    // function slideNavBar (linkClick) {
    //     let scrollTop = $(window).scrollTop(), scrollBoundary = $(window).height()*(1/5);
    //     // console.log('Scroll Top: ' + parseInt(scrollTop) + ' ScrollBoundary: ' + parseInt(scrollBoundary));
    //     if (menuButton.data('clicked')) {
    //         console.log('Menu button clicked.');
    //         return;
    //     }
    //     if (Math.abs(veryTop - scrollTop) <= threshold) {
    //         return;
    //     } else {
    //         if (scrollTop <= scrollBoundary) {
    //             $('#tabRibbon, #mainMenu').removeClass('navUp');
    //             return;
    //         } else if (scrollTop > veryTop && scrollTop > threshold) {
    //                 $('#tabRibbon, #mainMenu').addClass('navUp');
    //         } else {
    //             if ((scrollTop > scrollBoundary) && (scrollTop + $(window).height() <= $(document).height())) {
    //                 $('#tabRibbon, #mainMenu').removeClass('navUp');
    //             }
    //         }
    //     }
    //     veryTop = scrollTop;
    //     return veryTop;
    // }
    //
    // function changeColorNav() {
    //     let navBarVariables = $('.name a p, .listItem, .sliderGroup > p, #toggleModes');
    //     if ($(window).scrollTop() > ($(window).height()*(1/5))) {
    //         // console.log('Change color.');
    //         if (navBarVariables.hasClass('nightMode')) {
    //             $('.bars').css('background', 'white');
    //             navBarVariables.css('color', 'white');
    //         } else {
    //             $('.bars').css('background', 'black');
    //             navBarVariables.css('color', 'black');
    //         }
    //         tabRibbon.removeClass('transparentBG');
    //     } else {
    //         if (navBarVariables.hasClass('nightMode')) {
    //             $('.bars').css('background', 'white');
    //             navBarVariables.css('color', 'white');
    //         } else {
    //             $('.bars').css('background', 'black');
    //             navBarVariables.css('color', 'black');
    //         }
    //         // $('.bars').css('background', 'white');
    //         // navBarVariables.css('color', 'white');
    //         tabRibbon.addClass('transparentBG');
    //     }
    // }
    //
    // links.on('click', function() {
    //     let hash = this.hash;
    //     $('html, body').animate({
    //         scrollTop: $(hash).offset().top
    //     }, 600, function(){
    //         window.location.hash = hash;
    //     });
    //     linkClicked = true;
    //     console.log('linkClicked from onClick: ' + linkClicked);
    //     $('#tabRibbon, #mainMenu').addClass('navUp');
    //     changeColorNav();
    //     hideMenu();
    // });
    //
    // menuButton.click (function () {
    //     console.log('Scroll Top: ' + parseInt($(window).scrollTop()) + ' ScrollBoundary: ' + parseInt($(window).height()*(1/5)));
    //     $('#tabRibbon, #mainMenu').removeClass('navUp');
    //     body.toggleClass('disableScroll');
    //     $('#bar1, #bar2, #bar3').toggleClass('shift');
    //     // navMenu.toggleClass('active');
    //     name.css('opacity', (name.css('opacity') == '1') ? '0' : '1');
    //     name.toggleClass('translate');
    //     mainMenu.toggleClass('translate');
    //     tabRibbon.toggleClass('expandMenu');
    //     menuList.css('opacity', (menuList.css('opacity') == '0') ? '1' : '0');
    //     // toggleModes.toggleClass('translate');
    //     toggleModes.css('opacity', (toggleModes.css('opacity') == '0') ? '1' : '0');
    //     mainBodyWrapper.toggleClass('blur'); //New in index.html.
    // });
    //
    toggleSlider.click (function toggleMode() {
        nightModeVariables.toggleClass('nightMode');
        indexNightModeVar.toggleClass('nightMode');
        $(nightModeVariables).hasClass('nightMode') ? (localStorage.setItem('nightMode', 'true')) :
            (localStorage.setItem('nightMode', 'false'));
        changeColorNav();
    });
    //
    // function hideMenu() {
    //     body.removeClass('disableScroll');
    //     $('#bar1, #bar2, #bar3').toggleClass('shift');
    //     // navMenu.toggleClass('active');
    //     name.css('opacity', '1');
    //     name.removeClass('translate');
    //     mainMenu.removeClass('translate');
    //     tabRibbon.removeClass('expandMenu');
    //     menuList.css('opacity', '0');
    //     // toggleModes.toggleClass('translate');
    //     toggleModes.css('opacity', '0');
    //     mainBodyWrapper.removeClass('blur'); //New in index.html.
    // }

    // *****END JS for index.html.

});

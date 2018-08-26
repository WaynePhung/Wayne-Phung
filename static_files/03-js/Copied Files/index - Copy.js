"use strict"; //Strict mode on.

$(document).ready(function() {

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
    let indexNightModeVar = $('.bodySection, #bgVideo'),
        mainBodyWrapper = $('.mainBodyWrapper'),
        mainVideo = $('#mainVideo'),
        bgVideo = $('#bgVideo');
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

    menuButton.click (function () {
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
        nightModeVariables.toggleClass('nightMode');
        indexNightModeVar.toggleClass('nightMode');
        $(nightModeVariables).hasClass('nightMode') ? (localStorage.setItem('nightMode', 'true'), $('html').css('background-color', 'black')) :
            (localStorage.setItem('nightMode', 'false'), $('html').css('background-color', 'white'));
        checkScrollforNav();
    });
    // *****END JS for liveDemoJS.html.


    // *****JS for index.html.

    checkScrollforNav();

    $(window).on('resize', function(){
        checkScrollforNav();
    });

    $(window).scroll(function(){
        console.log('Scroll top: ' + parseInt($(window).scrollTop()) + ' Window height: ' + $(window).height());
        checkScrollforNav();
    })

    function checkScrollforNav() {
        let navBarVariables = $('.name a p, .listItem, .sliderGroup > p, #toggleModes');
        if ($(window).scrollTop() > ($(window).height()*(1/5))) {
            console.log('Change color.');
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
    // *****END JS for index.html.

});

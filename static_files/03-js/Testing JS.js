"use strict"; //Strict mode on.

$(document).ready(function() {

// ----------------------- VARIABLE DECLARATIONS HERE -----------------------

/* List of variable declarations that specify classes and IDs of elements
   within the header.*/
    let header = $('header'),
        menuButton = $('.menuButton'),
        name = $('#name'),
        navMenu = $('.navMenu'),
        menuItems = $('.menuItems'),
        barItem = $('.barItem'),
        toggleSlider = $('.toggleSlider'),
        normalMode = $('#normalMode'),
        nightMode = $('#nightMode'),
        stickNightMode = localStorage.getItem('nightMode');

/* List of variable declarations that specify classes and IDs of elements
   within the body.*/
    let gridContainer = $('.gridContainer'),
        image = $('img'),
        photo = $('.photo'),
        gif = $('gif'),

    // Sub-list of gif declarations.
            gif1 = $('#gif1'),

        hoverInfo = $('.hoverInfo'),
        gradientOverlay = $('.gradientOverlay'),
        pDescendant = $('.hoverInfo > p'),
        button = $('button'),
        leftArrow = $('#leftArrow'),
        rightArrow = $('#rightArrow');

// --------------------- END OF VARIABLE DECLARATIONS ----------------------



// ----------------------- INTERACTIVE EFFECTS HERE ------------------------

    if (stickNightMode == "true") {
        $('html, body, p, a, .navMenu, .bars, .fas, .navMenu, #disabled, .options, .title, .gridContainer, .gradientOverlay, .footerIcons').addClass('nightMode');
        normalMode.addClass('nightMode');
        nightMode.addClass('nightMode');
        $('#switch').prop('checked', true);
    } else {
        $('html, body, p, a, .navMenu, .bars, .fas, .navMenu, #disabled, .options, .title, .gridContainer, .gradientOverlay, .footerIcons').removeClass('nightMode');
        normalMode.removeClass('nightMode');
        nightMode.removeClass('nightMode');
    }

    menuButton.click (function () {
        $('#bar1, #bar2, #bar3').toggleClass('shift');
        navMenu.toggleClass('active');
        header.css('display', (header.css('display') == 'block') ? 'none' : 'block');
        name.css('opacity', (name.css('opacity') == '1') ? '0' : '1');
        menuButton.toggleClass('active');
        barItem.toggleClass('active');
        barItem.css('opacity', (barItem.css('opacity') == '0') ? '1' : '0');
    });

    toggleSlider.click (function toggleMode() {
        $('html, body, p, a, .navMenu, .bars, .fas, .navMenu, #disabled, .options, .title, .gridContainer, .gradientOverlay, .footerIcons').toggleClass('nightMode');
        normalMode.toggleClass('nightMode');
        nightMode.toggleClass('nightMode');
        $('html').hasClass('nightMode') ? (localStorage.setItem('nightMode', 'true'), $('html').css('background-color', 'black')) :
            (localStorage.setItem('nightMode', 'false'), $('html').css('background-color', 'white'));

    });

/*Every time a grid cell/container is hovered over, scale up the image for a
  zoom-in animation and make the gradient filter, text, and button appear
  almost instantly after.

  When the mouse leaves the grid cell/container, the image will scale back down
  to its original size and the gradient filter, text, and button disappear instantly.*/

    gridContainer.hover (function () {
        $(this).find(photo).css('transform', 'scale(1.5)');
        $(this).find(hoverInfo).css('opacity', '1');
        $(this).find(pDescendant).css('opacity', '1');
        $(this).find(button).css('opacity', '1');
        $(this).find(gradientOverlay).css('opacity', '1');

    // This section is for gif photos only.
        $(this).find(gif1).addClass('active');
        $(this).find(gif1).css('background', 'url("../mediaFiles/gifs/SGFgif.gif") no-repeat center');
        $(this).find(gif1).css('background-size', '110%');
    }, function () {
        $(this).find(photo).css('transform', 'scale(1.1)');
        $(this).find(hoverInfo).css('opacity', '0');
        $(this).find(pDescendant).css('opacity', '0');
        $(this).find(button).css('opacity', '0');
        $(this).find(gradientOverlay).css('opacity', '0');
    //
    // This section is for gif photos only.
        $(this).find(gif1).removeClass('active');
        $(this).find(gif1).css('background', 'url("../mediaFiles/images/SGFblackbear.PNG") no-repeat center');
        $(this).find(gif1).css('background-size', '100%');
    });

    // $('.dWorkContainer').on ('click', ( function () {
    //     $('#spangif, #sampleText1').toggleClass('active');
    // }));

    // $('.dWorkContainer').on ('mouseleave', ( function () {
    //     $('#spangif').removeClass('active');
    // }));

/*For the slideshow, this set of code will enable manual navigation of
  a set of picture, showing a picture slideshow.*/

    let defaultIndex = 1;
    console.log('Default Index: ' + defaultIndex);
    slideshow(defaultIndex);

    function changeIndex(n) {
        slideshow(defaultIndex += n);
    }

    leftArrow.click( function () {
        changeIndex(-1);
    });
    rightArrow.click( function () {
        changeIndex(+1);
    });

    function slideshow(n) {
        let i, testing = $('.testing');
        if (n > testing.length) {
            defaultIndex = 1;
        }
        if (n < 1) {
            defaultIndex = testing.length;
        }
        for (i = 0; i < testing.length; i++) {
            testing[i].style.opacity = "0";
        }
        testing[defaultIndex-1].style.opacity = "1";
        console.log('Default Index: ' + defaultIndex);
        return defaultIndex;
    }

// ---------------------- END OF INTERACTIVE EFFECTS ------------------------
});

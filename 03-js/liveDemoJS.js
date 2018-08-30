"use strict"; //Strict mode on.

$(document).ready(function() {

    $(document).on("mobileinit", function() {
        $.mobile.autoInitializePage = false;
    });

// ----------------------- VARIABLE DECLARATIONS HERE -----------------------

/* List of variable declarations that specify classes and IDs of elements
   within the header for liveDemoPage.html.*/

   let nightModeVariables = $('html, body, a, .headerGrid, #mainMenu, #menuButton, .name > a,' +
                              '.navMenu, .bars, #menuList, #toggleModes, #normalMode,' +
                              ' #nightMode, #disabled, #tabRibbon, .tabArrows, #horizScroll,' +
                              '.body, .shadows, .tabItem, h1, .tabContent, .tabContent > p'),
       headerWrapper = $('.headerWrapper'),
       headerGrid = $('.headerGrid'),
       menuButton = $('#menuButton'),
       name = $('.name'),
       nameP = $('.name > p'),
       mainMenu = $('#mainMenu'),
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

    let tabRibbon = $('#tabRibbon'),
        tabArrows = $('.tabArrows'),
        horizScroll = $("#horizScroll");

    let body = $('.body'),
        bodyWrapper = $('.bodyWrapper'),
        tabContent = $('.tabContent'),
        tabItem = $(".tabItem");

// --------------------- END OF VARIABLE DECLARATIONS ----------------------


// ----------------------- INTERACTIVE EFFECTS HERE ------------------------

    if (stickNightMode == "true") {
        nightModeVariables.addClass('nightMode');
        $('#switch').prop('checked', true);
    } else {
        nightModeVariables.removeClass('nightMode');
    }

    // window.onscroll = function() {stickHeaderGrid()};
    // let getHeaderOffset = headerWrapper.offset().top;
    // console.log(getHeaderOffset);
    // function stickHeaderGrid() {
    //     console.log(getHeaderOffset);
    //     if (window.pageYOffset >= getHeaderOffset) {
    //         headerWrapper.addClass("sticky")
    //      } else {
    //         headerWrapper.removeClass("sticky");
    //      }
    // }

    menuButton.click (function () {
        $('#bar1, #bar2, #bar3').toggleClass('shift');
        // navMenu.toggleClass('active');
        name.css('opacity', (name.css('opacity') == '1') ? '0' : '1');
        name.toggleClass('translate');
        tabArrows.toggleClass('translate');
        horizScroll.toggleClass('translate');
        mainMenu.toggleClass('translate');
        tabRibbon.toggleClass('expandMenu');
        menuList.css('opacity', (menuList.css('opacity') == '0') ? '1' : '0');
        // toggleModes.toggleClass('translate');
        toggleModes.css('opacity', (toggleModes.css('opacity') == '0') ? '1' : '0');
        bodyWrapper.toggleClass('blur');
    });

    toggleSlider.click (function toggleMode() {
        nightModeVariables.toggleClass('nightMode');
        $(nightModeVariables).hasClass('nightMode') ? (localStorage.setItem('nightMode', 'true'), $('html').css('background-color', 'black')) :
            (localStorage.setItem('nightMode', 'false'), $('html').css('background-color', 'white'));
    });

    let clicked = false, clickX;
    horizScroll.on({
        'mousemove': function(e) {
            clicked && updateScroll(e);
        },
        'mousedown': function(e) {
            clicked = true;
            clickX = e.pageX;
        },
        'mouseup': function() {
            clicked = false;
            horizScroll.css('cursor', 'auto');
        }
    });
    let updateScroll = function(e) {
        horizScroll.css('cursor', 'grab');
        horizScroll.scrollLeft(horizScroll.scrollLeft() + (clickX - e.pageX));
    }

    let defaultIndex = 0;
    console.log('Default Index: ' + defaultIndex);
    scrolling(defaultIndex);
    $("#defaultTab").on('click', changeTab);
    $(".tabItem").on('click', changeTab);
    $('#leftArrow').on('click', previousTab);
    $('#rightArrow').on('click', nextTab);

    let resizeResponse, interval = 10;
    $(window).resize(function() {
        resizeResponse = setTimeout( function () {
            if (defaultIndex != 0 && defaultIndex < tabItem.length) {
                console.log('Window resized.');
                scrolling(defaultIndex);
            }
        }, interval);
    });
    // $(window).resize( function () {
    //     clearTimeout(resizeResponse);
    //     resizeResponse = setTimeout( function () {
    //         if (defaultIndex != 0 && defaultIndex < tabItem.length) {
    //             console.log('Window resized.');
    //             scrolling(defaultIndex);
    //         }
    //     }, interval);
    // });

    // $(document).on('swipeleft', '.bodyWrapper', function(e) {
    //     previousTab();
    //     console.log('Swiped left.');
    // });
    // $(document).on('swiperight', '.bodyWrapper', function(e) {
    //     nextTab();
    //     console.log('Swiped right.');
    // });

    $('.tabContent').on("swipeleft", function() {
        nextTab();
        console.log('Swiped left.');
    });
    $('.tabContent').on("swiperight", function() {
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
        console.log("Get index: " + parseInt($(".tabItem").eq(defaultIndex).attr('data-index')));
    }

    function nextTab() {
        if (defaultIndex == tabItem.length - 1 && defaultIndex + 1 >= tabItem.length) {
            // Do nothing.
        } else {
            defaultIndex += 1;
            scrolling(defaultIndex);
        }
        console.log("Get index: " + parseInt($(".tabItem").eq(defaultIndex).attr('data-index')));
    }

    function changeTab() {
        let getDataIndex = parseInt($(this).attr('data-index'));
        console.log('Extracted index: ' + getDataIndex);
        defaultIndex = getDataIndex;
        console.log('Default Index: ' + defaultIndex);
        scrolling(defaultIndex);
        console.log('Clicked tab.');
        $('#flexMenu').animate({'scrollLeft': $(".tabItem").eq(defaultIndex)});
    }

    function scrolling (index) {
        changeIndex(index);
        scrollTab(defaultIndex);
        scrollBody(defaultIndex);
    }

    function changeIndex(num) {
        // console.log(tabcontent.length);
        if (num <= 0) {
            num = 0;
            $('#leftArrow').prop('disabled', true);
            $('#leftArrow').css('opacity', '0.5');
            $('#rightArrow').prop('disabled', false);
            $('#rightArrow').css('opacity', '1');
        } else if (num >= tabItem.length - 1) {
            num = tabItem.length - 1;
            $('#leftArrow').prop('disabled', false);
            $('#leftArrow').css('opacity', '1');
            $('#rightArrow').prop('disabled', true);
            $('#rightArrow').css('opacity', '0.5');
        } else {
            $('#leftArrow').prop('disabled', false);
            $('#leftArrow').css('opacity', '1');
            $('#rightArrow').prop('disabled', false);
            $('#rightArrow').css('opacity', '1');
        }
        if (num >= 0 && num <= tabItem.length - 1) {
            openPage(num);

        }
        defaultIndex = num;
        console.log('New Index from num: ' + defaultIndex);
        return defaultIndex;
    }

    function openPage(num) {
        console.log('Clicked.');
        let i, backgroundColor, tabcontent = $(".tabContent"), tabItem = $(".tabItem");
        for (i = 0; i < tabcontent.length; i++) {
            // tabcontent[i].style.display = (i == parseInt(num)) ? "block" : "none";
            tabcontent.eq(i).css('opacity', (i == num) ? "1" : "0"); //tabcontent.eq(parse(num)).css('opacity');
        }

        for (i = 0; i < tabItem.length; i++) {
            backgroundColor = tabItem.eq(i).attr("data-background-color");
            tabItem.eq(i).css('backgroundColor', (i == parseInt(num)) ? backgroundColor : "");
            // $('.containTab').animate({
            //     scrollLeft: $(tabItem.eq(num)).offset({left: 200px})
            // }, 2000);
            if (i == parseInt(num)) {
                console.log('Background Color: ' + $(tabItem.eq(i)).css('background-color'));
            }
        }
        // console.log('Display: ' + $('#' + pageName).css('display'));
        // console.log('Background Color: ' + $('#' + pageName).css('backgroundColor'));
    }

    function scrollTab (index) {
        console.log('New Index from scrollTab: ' + index);
        defaultIndex = index;
        let bodyWrapper = $('.bodyWrapper'),
            tabContainer = $('.tabContainer'),
            getTabItem = $('.tabItem'),
            center = widthAndCenter(getTabItem, tabContainer, defaultIndex);
        $(tabContainer).animate({"scrollLeft": center}, 300);
        console.log('Data-index property retrieved from tab: ' + $(".tabItem").eq(defaultIndex).attr("data-index"));
    }

    function scrollBody (index) {
        console.log('New Index from bodyTab: ' + index);
        defaultIndex = index;
        let bodyWrapper = $('.bodyWrapper'),
            getBodyTab = $('.tabContent'),
            centerBody = widthAndCenter(getBodyTab, bodyWrapper, defaultIndex);
        $(bodyWrapper).animate({"scrollLeft": centerBody}, 300);
        getBodyTab.eq(defaultIndex).animate({"scrollTop": 0}, 300);
        // $('.bodyWrapper').animate({scrollTop:0}, 300);
        console.log('Data-index property retrieved from body: ' + $(".tabItem").eq(defaultIndex).attr("data-index"));
    }

    function widthAndCenter (link, container, index) {
      let x = container.width(),
          y = link.eq(index).outerWidth(true),
          z = parseInt(link.eq(index).attr('data-index')),
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

    $('.collapsible').collapsible();
    $(".accordian").accordion({
      collapsible: true,
      heightStyle: 'content',
      animate: 200,
      active: 'none'
    });


/*Every time a grid cell/container is hovered over, scale up the image for a
  zoom-in animation and make the gradient filter, text, and button appear
  almost instantly after.

  When the mouse leaves the grid cell/container, the image will scale back down
  to its original size and the gradient filter, text, and button disappear instantly.*/

    // gridContainer.hover (function () {
    //     $(this).find(photo).css('transform', 'scale(1.5)');
    //     $(this).find(hoverInfo).css('opacity', '1');
    //     $(this).find(pDescendant).css('opacity', '1');
    //     $(this).find(button).css('opacity', '1');
    //     $(this).find(gradientOverlay).css('opacity', '1');
    //
    // // This section is for gif photos only.
    //     $(this).find(gif1).addClass('active');
    //     $(this).find(gif1).css('background', 'url("../images/SGFgif.gif") no-repeat center');
    //     $(this).find(gif1).css('background-size', '110%');
    // }, function () {
    //     $(this).find(photo).css('transform', 'scale(1.1)');
    //     $(this).find(hoverInfo).css('opacity', '0');
    //     $(this).find(pDescendant).css('opacity', '0');
    //     $(this).find(button).css('opacity', '0');
    //     $(this).find(gradientOverlay).css('opacity', '0');
    // //
    // // This section is for gif photos only.
    //     $(this).find(gif1).removeClass('active');
    //     $(this).find(gif1).css('background', 'url("../images/SGFblackbear.PNG") no-repeat center');
    //     $(this).find(gif1).css('background-size', '100%');
    // });
});

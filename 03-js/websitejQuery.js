/*
    File name: "websitejQuery.js"
    This file helps to handle any interactions done, which will
    change the resulting behavior of the webpage.

    Interactions include, but are not limited to, the following:
    - scrolling
    - button hovering, clicking, or tapping
    - image clicking or tapping
    - right-clicking

    Scott's comments: For dev purposes, have separate javascript files for each function and a "controller/master" file to call upon each file and execute their respective functions.
    The controller file can be converted into production by copy/pasting every function available.
*/

/*
    The string below is a directive for the Javascript code to be run in "strict" mode.
    This helps prevent uncdeclared variables from being run and to keep the code clean.
*/
"use strict";

// Enables usage of jQuery functions when the page loads.
$(function() {
    $.ajax({
        // url: "/myhandler",
        type: 'GET',
        /* 
            Do nothing if the AJAX GET request succeeds.
            Otherwise, show an error message into the console.
        */
        success: function() {
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log('Error detected.');
        }
    });
    /*
        If an error occurs such that a desired webpage is not found or cannot be loaded,
        redirect to the "404.html" webpage, which is a webpage to visually indicate errors
        to the person.
    */
    $(document).on('error', function() {
        window.location.href = "/404.html";
    });

    /* Variable declarations. */

        // Body container for all contents of the web page to show.
    let body = $('body'), 
        /*
            Preloader container to show before a page fully loads.
            It will eventually disappear when the page loads.
        */
        preloader = $('#preloader'), 
        /*
            Message to appear after a certain period of time to provide a 
            way to refresh the page if the page doesn't load.
        */
        preloaderMessage = $('#preloader p'), 
        /*
            Any a tags that have the "refreshLink" class name.
        */
        refreshLink = $('.refreshLink'),
        // Header tag as an outer container to serve navigation links.
        header = $('header'), 
        /*
            Variable to specify a class nav element inside header,
            served as a smaller inner container for all navigation links.
        */
        navigationBar = $('.navigationBar'), 
        /*
            Variable to specify a class for any button inside navigation bar for navigating to: 
            - list of design projects
            - list of media projects
            - "About Me" section
            - CV Page
        */
        navLink = $('.navLink'), 
        /*
            Variable to specify classes and id for:
            - buttons inside navigation bar
            - the anchor links on the Table of Contents sidebar
            - the call-to-action contact button
        */
        navLinks = $('.navLink, .sideBarButton, #contactButton'), 
        /*
            Variable to specify the class container for the Table of Contents (ToC) buttons 
            and vertical sidebar.
                - On tablet/desktop screen sizes, this would appear as a 
                  sidebar on the right side of the screen.
                - On mobile screen sizes, the ToC would be collapsed as a 
                  toggle button to show/hide the sections of the ToC.
        */
        // Variable to specify the "Contact Me" button that appears on mobile screen sizes.
        contactButtonMobile = $('#contactButton-mobile'),
        // Top of the page button. Only appears on screen widths smaller than 320px.
        toTopPageFixed320px = $('#toTopPageFixed320px'),
        /*
            Desktop sidebar container that nests ToC buttons and vertical scroll progress bar.
        */
        navSideBar = $('.navSideBar'), 
        // Variable to specify the id of the ToC button on mobile screen sizes.
        tableOfContentsMobileButton = $('#tableOfContents-MobileButton'),
        // Variable to specify the class container of all ToC buttons and vertical progress bar.
        navButtons = $('.navButtons'),
        /*
            Variable to specify the class container for the vertical progress bar in the ToC.
            When in tablet/desktop screen sizes, it is shown as a long, thin vertical bar.
            The bar will disappear in mobile screen sizes.
        */
        progressContainer = $('.progressContainer'),
        /*
            Variable to specify the class of an indicator that dynamically changes 
            in length based on how far down the person has scrolled down the web page.
            It appears as a black bar that constantly changes in length based on far down 
            the page has been scrolled.
        */
        progressBar = $('.progressBar'),
        /*
            Variable to specify all the tags within the .navButtons container:
                - ToC section buttons (as the designated class)
                - images (as img tags) within the ToC buttons, except the mobile ToC button
                - text (as p tags) within the ToC buttons
        */
        allSideBarTags = $('.navButton, .sideBarButton:not(#tableOfContents-MobileButton) img, .sideBarButton p'),
        // Variable to specify the class of all the ToC buttons.
        sideBarButton = $('.sideBarButton'),
        // Variable to specify the main tag, the container for the ToC and rest of the text/image content.
        main = $('main'),
        // Variable to specify the class container for the text/image content. Excludes the ToC.
        content = $('.content'),
        // Variable to specify the class container for sections within the .content container.
        pageSection = $('.pageSection'),
        // Variable to specify the heading 2 tag within each section (.pageSection).
        h2 = $('h2:not(.notSelected)'),
        /*
            Variable to select any image container to induce the 3d tilting effect that rotates on its center based on the 
            cursor's location.
        */
        hoverContainer = $('.hoverContainer'),
        /* 
            Variable to specify the button tag. Applied globally, 
            but mainly to buttons within each section (.pageSection).
        */
        button = $('button'),
        /*
            Selected buttons that would cause a navigation away from the current page to a different page.
            Buttons excludes are the "Contact Me" button and any of the ToC section buttons.
        */
        buttonToPage = $('button:not(.diffURL, #contactButton, #tableOfContents-MobileButton, #toTopPageFixed320px, .videoButton), button:not(.diffURL, #contactButton, #tableOfContents-MobileButton, #toTopPageFixed320px, .videoButton) > a, .anchorLinks > a:not(.diffURL), #endNavLinks article a:not(.diffURL)'),
        buttonToURL = $('button.diffURL'),
        /* Contact button and descendant elements. */
        contactButtonElements = $('button#contactButton, button#contactButton > a'),
        /* 
            Unused variable to specify any image (img tag) excluding ones 
            that are within figure.projectImage containers or images tagged 
            with the .noPanzoom class.
        */
        // img = $('img:not(figure.projectImage picture img, .noPanzoom)'),
        // Variable to specify any video element.
        video = $('video'),
        // Variable to specify any video that can be autoplayed (with the .autoplayVideo class).
        autoplayVideo = $('video.autoplayVideo'),
        bindVideoToAudio = $('video.bindAV'),
        /* 
            Variable to specify any video that is:
                - within the title section (.mainVideo class)
                - is a YouTube video (.youTube class)
                - is embedded from Google drive (.gDrive class)
        */
        embedVideo = $('.mainVideo, .youTube, .gDrive'),
        /* 
            Unused variable to specify any embedded slide deck from Google Slides 
            (.gSlides class). Used for an obsolete function called gridItemHeight() 
            to set the dimensions of the slde deck shown.
        */
        // gSlides = $('.gSlides'),
        /* 
            Variable to specify any video that is:
                - within the title section (.mainVideo class)
                - is a YouTube video (.youTube class)
                - is embedded from Google drive (.gDrive class)
        */
        videoButton = $('button.videoButton'),
        /* 
            Variable to specify the bottom section of a page (footer tag).
            This is typically for showcasing a preview gallery of other case studies.
        */
        footer = $('footer'),
        /*
            Variable to get the index number of a selected table of 
            contents section button or content section.
        */
        sectionIndex = 0;
    
    /*
        An event listener.
        If the content within the Document Object Model (DOM) has been loaded,
        set the vertical scroll position to the top of the page.
    */
    document.addEventListener("DOMContentLoaded", function(event) { 
        let scrollpos = localStorage.getItem('scrollpos');
        if (scrollpos) {
            window.scrollTo(0, scrollpos);
        }
        preloader.removeClass('fade-in');
        preloader.addClass('fade-out');
        preloader.delay(0).fadeTo(300, 0);
        preloader.fadeOut('slow');
    });
    
    /*
        When the page is loaded, show the preloader container with the buffer for 1 second (1000 ms);
        The transition will be a slow fade out to the content shown.
    */
    $(window).on('load', function () {
        // preloader.fadeIn('slow');
        preloader.removeClass('fade-in');
        preloader.addClass('fade-out');
        preloader.delay(0).fadeTo(300, 0);
        preloader.fadeOut('slow');
    });

    /*
        Before leaving a current page, show the preloader container again with the buffer for 1 second (1000 ms);
        The transition will fade out the current content shown.
    */
    $(window).on('unload', function (event) {
        // event.preventDefault();
        preloader.removeClass('fade-out');
        preloader.addClass('fade-in');
        preloader.delay(0).fadeTo(300, 1);
        // preloader.fadeIn('slow');
        // setTimeout( function () {
        //     window.location = href;
        // }, 5000);
    });
// 

    /*
        Before the document is about to be unloaded, 
        store the current vertical scroll position into the browser's local storage.
    */
    $(window).on('beforeunload', function (event) {
        localStorage.setItem('scrollpos', $(window).scrollY);
    });

    /*
        When the page show event occurs and persists, transition to remove 
        the preloader container.
    */
    $(window).on('pageshow', function (event) {
        // if (!event.persisted) {
        //     return;
        // }
        preloader.removeClass('fade-in');
        preloader.addClass('fade-out');
        // preloader.delay(0).fadeTo(300, 0);
        preloader.fadeOut('slow');
    });

    /*
        Reset to default widths for the following tags:
            - All headings, from 1 to 6 (h1 to h6).
              Exceptions to the heading 2 tag (h2) include those that also have the 
              .projectsText class or h2 tags as direct children to the .conversation parent class.
            - All body text (p tag), except button text (button > p).
            - Captions to figures/image containers (figcaption tags)
            - All ordered and unordered lists and list items (ol, ol li, ul, ul li).
        
    */
    $('h1, h2:not(h2.projectsText):not(.conversation > h2), h3, h4, h5, h6, p:not(button > p), figcaption, ol, ol li, ul, ul li').css('width', '');

    contactButtonMobile.find('p:before').css({
        'width': contactButtonMobile.find('p').width() * 1.41421356237,
        'padding-bottom': contactButtonMobile.find('p').height() * 1.41421356237
    });

    /*
        If there is a hash in the website URL, 
        navigate to the section that corresponds to the name after the hashtag.
    */
    let hashIndex = window.location.href.indexOf("#");

    //Check if the hashIndex exists and has a non-negative numeric value.
    if (hashIndex > -1) {
        // Return the hashIndex value in the console.
        // console.log('hashIndex: ' + hashIndex);
        $.ajax({
            // url: "/myhandler",
            type: 'GET',
            /* 
                If the AJAX GET request succeeds:
                
                    1. Create a variable "getValueFromHash", the corresponding string after the current page address (URL).

                    2. Create a variable "getSectionId".
                       If the current URL has the default name (waynephung.com) or waynephung.com/index.html 
                       and heading 2 (h2) tags exist, the value of "getSectionId" is set to the current vertical 
                       scroll position minus the outer height of the navigation header.

                       Otherwise on any other URL, "getSectionId" is only set to the current scroll position.

                       Note that calculating the outer height of the navigation header is needed to prevent scrolling 
                       to a heading 2 too far down a page and thus removing the visibility of the heading 2.

                    3. From the stickyH2() function, make the corresponding heading 2 sticky, so that it remains in view while scrolling.

                    4. From the tableOfContents() function, update the styling of the navigation button to show the current section.

                    5. Create a variable "getH2". It's value is set to the heading 2 tag found from the corresponding id.
                       The id name used is based on the string value from "getValueFromHash".
                    
                    6. From the briefHighlight() function, temporarily changes the background color 
                       behind the heading 2 tag to light green for 1.5 seconds before making the 
                       background transparent again. behind the heading 2 for 1.5 seconds.

                    7. Create a variable "transitionTime". 
                       If the current URL has the default name (waynephung.com) or waynephung.com/index.html, 
                       set the numerical value to 400, otherwise set it to 0.

                    8. Animate the scroll to the heading.
                       The duration of the scroll is in milliseconds and based on the value set from "transitionTime".
                
                If the AJAX GET request fails, show an error message in the console.
            */
            success: function() {
                // step 1. from comment
                let getValueFromHash = window.location.hash.split('#')[1],
                // step 2.
                    getSectionId;
                console.log('getValueFromHash: ' + getValueFromHash);
                if (($(window).width() >= 320) && ($(window).width() < 1024)) {
                    getSectionId = $('#' + getValueFromHash + '').offset().top;
                } else {
                    getSectionId = $('#' + getValueFromHash + '').offset().top - (1*header.outerHeight(true));
                }
                // step 3.
                if (content.length) {
                    stickyH2();
                }
                // step 4.
                tableOfContents();
                // step 5.
                let getH2 = $('#' + getValueFromHash + '').find('h2');
                // step 6.
                // console.log('getSectionId offsetTop: ' + $('#' + getValueFromHash + '').offset().top);
                // console.log('minus: ' + (1.45*header.outerHeight(true)));
                // console.log('getSectionId remainder: ' + getSectionId);
                // console.log('Scrolling to ID: ' + getValueFromHash);
                // step 7.
                let transitionTime;
                if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                    transitionTime = 400;
                } else {
                    transitionTime = 0;
                }
                // step 8.
                $('html, body').animate({
                    scrollTop: getSectionId
                }, {
                    duration: transitionTime,
                    easing: 'swing'
                }, function () {
                    currentScrolling = false;
                },);
                let pageSections = $('.pageSection:not(#introduction)');
                if (pageSections.length) {
                    let scrollPosition = $(window).scrollTop(),
                        viewportHeight = scrollPosition + $(window).height(),
                        contentTopPosition = pageSection.eq(0).offset().top,
                        footerTopPosition = footer.offset().top + $(window).height() - (1.55*header.outerHeight(true));
                    if ($(window).width() < 1024) {
                        if (content.length && (scrollPosition > contentTopPosition) && (footerTopPosition > viewportHeight)) {
                            briefHighlight(getH2);
                        } else {
                            //Do nothing.
                        }
                    } else {
                        if (content.length && (scrollPosition > contentTopPosition - (1.55*header.outerHeight(true))) && (footerTopPosition > viewportHeight)) {
                            briefHighlight(getH2);
                        } else {
                            //Do nothing.
                        }
                    }
                } else {
                    //Do nothing.
                }
            },
            // If the AJAX GET request fails, show an error message in the console.
            error:function() {
                console.log('Error detected');
            }
        });
    } else {

    }
    
    // Calls on many functions upon the DOM loading.
    setFigureHeight();
    positionNavSideBar();
    tableOfContents();
    // headerLocation();
    progressContainerHeight();
    if (content.length) {
        stickyH2();
        progressBarHeight();
    }
    scrollSpy();
    // gridItemHeight();
    autoplayVisible();
    embedVideoHeight();
    adjustParagraphHeight();
    scrollToElement2();
    setNavSideBarMaxHeight();
    // imageDimensions();
    // triggerEagerLoading();

    // Removes the following classes, possibly set from jQuery and/or jQuery mobile.
    button.removeClass('ui-button ui-shadow ui-corner-all ui-widget ui-button-inherit');
    
    /* 
        Obsolete css function to set the height of the right ToC sidebar on desktop screens 
        based on the current window height minus twice the height of the navigation header.
    */
    // navSideBar.css({
    //     'height': ($(window).height()-(2*$('header').outerHeight(true)))
    // });

    /* 
        Removes the browser's default feature to show menu options.
        This is to prevent direct access to the developer tools from right-clicking.
    */
    $('html, body, video').on('contextmenu', function() {
        return false;
    });

    /* 
        Code below detects keyboard shortcuts to make copying of text and images more difficult.

            1. Creates an event handler function for the keydown event.
            
            2. Assigns a variable "key" to be either the key pressed or the key code assigned 
               to the physical key on the keyboard.

            3. If the ctrl key is pressed and "key" is set to the code value for the R key,
               allows the resulting  to be placed. ctrl+R is usually a command shortcut for 
               refreshing a webpage, which should be an allowable command to execute.

            4. If the caps "key" is set to the code value for the C, I, F11, or F12 key, prevents the 
               resulting action to placed. These keys are usually used for command shortcuts 
               for accessing the inspector/developer tools, which should NOT be an allowable command 
               to execute.
     */
    // $(document).on('keydown', function(event) {
    //     let key = event.key || event.keyCode;
    //     if (event.ctrlKey && key.keyCode == 82) {
    //         return true;
    //     } else if ((key.keyCode == 67) || (key.keyCode == 73) || (key.keyCode == 122) || || (key.keyCode == 123)) {
    //         return false;
    //     } else if ((event.ctrlKey && event.shiftKey && key.keyCode == 73) || (event.ctrlKey && event.shiftKey && key.keyCode == 74)) {
    //         return false;
    //     }
    // }, false);

    // $('form').on('submit', function() {
    //     window.location = this.action;
    //     return true;
    // });

    
    $(window).on('ready load', function () {
        preloader.removeClass('fade-in');
        preloader.addClass('fade-out');
        preloader.delay(0).fadeTo(300, 0);
    });
    preloader.removeClass('fade-in');
    preloader.addClass('fade-out');
    preloader.delay(0).fadeTo(300, 0);

    /* Trigger functions and event handlers when resizing the window. */
    // setTimeout( function() {

    // Calls on many functions upon resizing the window or scrolling.
    let currentScrolling = false;
    $(window).on('resize scroll', function() {
        // console.log('window scroll position: ' + $(window).scrollTop());
        setFigureHeight();
        setTimeout( function() {
            tableOfContents();
        }, 75);
        if (content.length) {
            stickyH2();
            progressBarHeight();
        }
        progressContainerHeight();
        scrollSpy();
        // gridItemHeight();
        embedVideoHeight();
        adjustParagraphHeight();
        autoplayVisible();
        // headerLocation();
        /*
            Obsolete lines of code for an unused Javascript library/plugin 
            to set the throttle timer on the following functions.
        */
        // $.throttle( function() {
        //     stickyH2();
        //     progressContainerHeight();
        //     progressBarHeight();
        //     scrollSpy();
        //     gridItemHeight();
        //     embedVideoHeight();
        //     adjustParagraphHeight();
        // }, 100);
    });
    
    /* 
        Calls on a function to adjust the widths and heights of all videos in a page 
        upon resizing the window.
    */
    $(window).on('resize', function() {
        positionNavSideBar();
        if (content.length) {
            stickyH2();
        }
        embedVideoHeight();
        setNavSideBarMaxHeight();
    });

    function positionNavSideBar() {
        if ($(window).width() > 1024) {
            // step 3.1.
            navSideBar.css({
                'position': '-webkit-sticky',
                'position': 'sticky',
                'bottom': '',
                'right': '0',
                'width' : '',
                'max-height': $('.navButtons').outerHeight(true) + $('#toTop').outerHeight(true) + $('#toBottom').outerHeight(true) + 64, 
                // 'height': parseInt($(window).height()) - (2*parseInt(header.outerHeight(true)))
                'height': '100%'
            });
            // step 3.2.
            if ($(window).width() > 1024) {
                navSideBar.css('top', header.outerHeight(true) + 32);
            } else {
                navSideBar.css('top', '2em');
            }
        // step 4.
        } else {
            // step 4.1.
            let calculateWidth = parseInt($(window).width()) - 2*parseInt(main.css('padding-left')),
                navButtonsHeight;
            // step 4.2.
            if (navButtons.hasClass('show')) {
                // navButtonsHeight = navButtons.outerHeight(true) + tableOfContentsMobileButton.outerHeight(true);
            } else {
                // navButtonsHeight = tableOfContentsMobileButton.outerHeight(true);
            }
            // step 4.3.
            navSideBar.css({
                'position': 'fixed',
                'top': '',
                'left': 0,
                'right': 0,
                'width': calculateWidth
                // 'height': navButtonsHeight
                // 'height': ''
            });
            if ($(window).width() >= 320) {
                navSideBar.css('bottom', header.outerHeight(true) + 16);
            } else {
                navSideBar.css('bottom', 16);
            }
        }
    }

    /* 
        UPDATE COMMENT
        The if statement below executes the following steps (numbered in order) only if the width of the window is less than 750px.
        Otherwise, nothing happens.

            1. If the container for the ToC and progress bar has the class "show", the container's height would 
               be set to its default outer height plus the height of the ToC button.
               Otherwise, the container's height is only set to the height of the ToC button.

            2. An event handler occurs when the ToC button is clicked/tapped on.
                2.1. Adds or removes the class "show" to the container of ToC buttons. 
                     Having the "show" class makes the ToC section buttons visible.
                     Not having the "show" class makes the ToC section buttons invisible.
                2.2. If the container has the class "show":
                     - Changes the ToC button's vector icon image to a close icon via changing the img tag's 
                       src attribute.
                     - Set the height of the ToC container to 70% of the current window height plus the outer
                       height of the ToC button, providing visibility to the ToC sections.
                2.3. Otherwise:
                     - Changes the ToC button's vector icon image to the default icon.
                     - Removes the ToC button's text.
                     - Set the height of the ToC container to only the outer height of the ToC button, removing 
                       the visibility of the ToC sections.
            
            3. An event handler occurs when any of the ToC section buttons is clicked/tapped on.
                3.1. Same action as 2.1.
                3.2. Same actions as 2.2. and 2.3.
               A repeated event handler ensures that the "show" class is toggleable.

            4. An event handler occurs when the contact button is clicked on.
               This will remove the "show" class of the ToC buttons container, 
               thus making the ToC section buttons invisible.
                
    */
    if ($(window).width() < 1024) {
        $('#tableOfContents-MobileButton, .sideBarButton').on('click', mobileToCButtons);
    } else if ($(window).width() >= 1024) {
        tableOfContentsMobileButton.css('max-height', '');
    } else {
        //Do nothing.
    }
    function mobileToCButtons() {
        // step 2.2.
        if (navButtons.hasClass('show')) {
            navButtons.removeClass('show');
            tableOfContentsMobileButton.find('img').attr('src', '01-other-images/icons/icon-tableOfContents.svg');
            tableOfContentsMobileButton.find('p').text('');
            tableOfContentsMobileButton.find('p').hide();
            navSideBar.css('height', tableOfContentsMobileButton.outerHeight(true));
        // step 2.3.
        } else {
            navButtons.addClass('show');
            tableOfContentsMobileButton.find('img').attr('src', '01-other-images/icons/icon-close.svg');
            tableOfContentsMobileButton.find('p').text('Close');
            navSideBar.css('height', '');
        }
    }

    /*  
        UPDATE COMMENT
        Related to the "$(window).on('load', function () {" line.
    */
    buttonToPage.on('click', function(event) {
        let getTagName = $(event.target).prop('tagName'),
            getHref;
        console.log('event target: ' + getTagName);
        // if (($(window).width() < 750) && (window.location.pathname != '/' || window.location.href.indexOf("index.html") <= '-1') && $(event.target).parent().hasClass('navLink')) {
            //Do nothing.
            // if (getTagName == 'A') {
            //     getHref = $(event.target).attr('href');
            // }
            // if (getTagName == 'P') {
            //     getHref = $(event.target).parent('a').attr('href');
            // }
            // preloader.removeClass('fade-out');
            // preloader.addClass('fade-in');
            // preloader.delay(0).fadeTo(300, 1);
            // window.location = getHref;
        // } else {
            if (getTagName == 'BUTTON') {
                getHref = $(event.target).find('a').attr('href');
                console.log('getHref from button: ' + getHref);
            }
            if (getTagName == 'A') {
                getHref = $(event.target).attr('href');
            }
            if (getTagName == 'P') {
                getHref = $(event.target).parent('a').attr('href');
            }
            if (getTagName == 'IMG') {
                getHref = $(event.target).parent('picture').parent('a').attr('href');
            }
            console.log('getHref: ' + getHref);
            // let hashIndex = getHref.indexOf("#"),
            let indexHrefArray = ['#designWork', '#mediaWork', '#aboutMeSection', '#conversation', 'cv.html'];
            if ((indexHrefArray.includes(getHref)) && !(getHref *= "index.html")) {
                scrollToElement(event.target);
            } else if (!(indexHrefArray.includes(getHref)) || (getHref *= "index.html")) {
                event.preventDefault();
                if (!window.AnimationEvent) {
                    return;
                }
                if (getHref = '#title') {
                    scrollToElement(event.target);
                } else {
                    preloader.removeClass('fade-out');
                    preloader.addClass('fade-in');
                    preloader.delay(0).fadeTo(300, 1);
                    // preloader.fadeIn('slow');
                    setTimeout( function () {
                        window.location = getHref;
                    }, 500);
                    // scrollToElement(event.target);
                }
            } else {
                // scrollToElement(event.target);
            }
        // }
    });

    buttonToURL.on('click'), function(event) {
        let getTagName = $(event.target).prop('tagName'),
            getHref;
        console.log('event target: ' + getTagName);
        // if (($(window).width() < 750) && (window.location.pathname != '/' || window.location.href.indexOf("index.html") <= '-1') && $(event.target).parent().hasClass('navLink')) {
            //Do nothing.
            // if (getTagName == 'A') {
            //     getHref = $(event.target).attr('href');
            // }
            // if (getTagName == 'P') {
            //     getHref = $(event.target).parent('a').attr('href');
            // }
            // preloader.removeClass('fade-out');
            // preloader.addClass('fade-in');
            // preloader.delay(0).fadeTo(300, 1);
            // window.location = getHref;
        // } else {
        if (getTagName == 'BUTTON') {
            getHref = $(event.target).find('a').attr('href');
            console.log('getHref from button: ' + getHref);
        }
        if (getTagName == 'A') {
            getHref = $(event.target).attr('href');
        }
        if (getTagName == 'P') {
            getHref = $(event.target).parent('a').attr('href');
        }
        if (getTagName == 'IMG') {
            getHref = $(event.target).parent('picture').parent('a').attr('href');
        }
        console.log('getHref: ' + getHref);
        window.location.replace(getHref);
    }

    contactButtonElements.on('click', function(event) {
        let getTagName = $(event.target).prop('tagName');
        console.log('event target: ' + getTagName);
        scrollToElement(event.target);
    });

    refreshLink.on('click', function() {
        window.location.reload();
    });

    if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1' || window.location.href.indexOf("cv.html") > '-1') {
        toTopPageFixed320px.on('click', function(event) {
            scrollToElement(event.target);
        });
    } else {

    }
    /*  
        When a main navigation button, a ToC section button, or the "Contact Me" button is clicked, 
        this function:
        1. targets the href attribute of that button and extracts the ID of the corresponding href
        2. calculates the header height
        3. animates the scrolling to that section, offseting it based on the calculated header height. 
    */
    navLinks.on('click', function(event) {
        let getTagName = $(event.target).prop('tagName'),
            getHref;
        console.log('event target: ' + getTagName);
        // if (($(window).width() < 750) && (window.location.pathname != '/' || window.location.href.indexOf("index.html") <= '-1') && $(event.target).parent().hasClass('navLink')) {
            //Do nothing.
            // if (getTagName == 'A') {
            //     getHref = $(event.target).attr('href');
            // }
            // if (getTagName == 'P') {
            //     getHref = $(event.target).parent('a').attr('href');
            // }
            // preloader.removeClass('fade-out');
            // preloader.addClass('fade-in');
            // preloader.delay(0).fadeTo(300, 1);
            // window.location = getHref;
        // } else {
            scrollToElement(event.target);
        // }
    });

    /*
        UPDATE COMMENT
    */
    hoverContainer.each( function(index) {
        let threeDHover = hoverContainer.eq(index).find('.threeDHover');
        hoverContainer.eq(index).on('hover mousemove mouseenter', function(e) {
           threeDHovering(e, threeDHover);
        });
        hoverContainer.eq(index).on('mouseleave', function() {
            threeDHover.removeClass('hoveringState');
            threeDHover.addClass('defaultState');
        });
    });

    // hoverContainer.on('mouseleave', function(e) {
    //     threeDHover.removeClass('hoveringState');
    //     threeDHover.addClass('defaultState');
    // });
        

    /*
        This function is designed to allow the person to skip to the desired section 
        from a Table of Contents (ToC) by setting the scroll position to the corresponding section.

        This function does the following steps (numbered in order):

        1. Gets the index value of the hash (#) character from the end of the URL 
           and stores it into a variable "hashIndex".
        
        2. If the hash character exists by having a numerical index value, perform 
           an AJAX GET request. If the request is successful, execute the following steps:

            2.1. Create a variable "getValueFromHash", the corresponding string after 
                 the current page address (URL).

            2.2. Create a variable "getSectionId" that stores a value equal to the 
                 corresponding id's scroll position minus 100. The selected id is 
                 based on the string value from "getValueFromHash".
            
            2.3. Set the initial delay for the tableOfContents() function to 75 milliseconds.
                 The function will update the styling of the navigation button to show the 
                 current section.
                 
            2.4. Create a variable "transitionTime". 
                 If the current URL has the default name (waynephung.com) or waynephung.com/index.html, 
                 set the numerical value to 400, otherwise set it to 0.
                 
            2.5. Animate the scroll to the heading.
                 The duration of the scroll is in milliseconds and based on the value set 
                 from "transitionTime".
            
            2.6. From the stickyH2() function, make the corresponding heading 2 sticky, 
                 so that it remains in view while scrolling.

            2.7. Create a variable "getH2". It's value is set to the heading 2 tag found 
                 from the corresponding id. The id name used is based on the string value 
                 from "getValueFromHash".
                    
            2.8. From the briefHighlight() function, temporarily changes the background color 
                 behind the heading 2 tag to light green for 1.5 seconds before making the 
                 background transparent again. behind the heading 2 for 1.5 seconds.
            
        3. If the AJAX GET request fails, show an error message in the console.

        4. If the hash character does not exist, do nothing.
    */
    function scrollToElement2() {
        // step 1.
        let hashIndex = window.location.href.indexOf("#");
        // step 2.
        if (window.location.pathname == '/' && hashIndex > -1) {
            // console.log('hashIndex: ' + hashIndex);
            $.ajax({
                url: "/myhandler",
                type: 'GET',
                success: function() {
                    // step 2.1.
                    let getValueFromHash = window.location.hash.split('#')[1],
                        getSectionId;
                    console.log('getValueFromHash: ' + getValueFromHash);
                        // getSectionId = $('#' + getValueFromHash + '').offset().top - (1*header.outerHeight(true));
                    // step 2.2. UPDATE COMMENT
                    if (($(window).width() >= 320) && ($(window).width() < 1024)) {
                        getSectionId = $('#' + getValueFromHash + '').offset().top;
                    } else {
                        getSectionId = $('#' + getValueFromHash + '').offset().top - (1*header.outerHeight(true));
                    }
                    // step 2.3.
                    setTimeout( function() {
                        tableOfContents();
                    }, 75);

                    // step 2.4.
                    let transitionTime;
                    if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                        transitionTime = 400;
                    } else {
                        transitionTime = 0;
                    }
                    // step 2.5.
                    $('html, body').animate({
                        scrollTop: getSectionId
                    }, {
                        duration: transitionTime,
                        easing: 'swing'
                    }, function () {
                        currentScrolling = false;
                    },);
                    // step 2.6.
                    if (content.length) {
                        stickyH2();
                    }
                    // step 2.7.
                    let getH2 = $('#' + getValueFromHash + '').find('h2');
                    // step 2.8.
                    let pageSections = $('.pageSection:not(#introduction)');
                    if (pageSections.length) {
                        let scrollPosition = $(window).scrollTop(),
                            viewportHeight = scrollPosition + $(window).height(),
                            contentTopPosition = pageSection.eq(0).offset().top,
                            footerTopPosition = footer.offset().top + $(window).height() - (1.55*header.outerHeight(true));
                        if ($(window).width() < 1024) {
                            if (content.length && (scrollPosition > contentTopPosition) && (footerTopPosition > viewportHeight)) {
                                briefHighlight(getH2);
                            } else {
                                //Do nothing.
                            }
                        } else {
                            if (content.length && (scrollPosition > contentTopPosition - (1.55*header.outerHeight(true))) && (footerTopPosition > viewportHeight)) {
                                briefHighlight(getH2);
                            } else {
                                //Do nothing.
                            }
                        }
                    } else {
                        //Do nothing.
                    }
                },
                // step 3.
                error:function() {
                    console.log('Error: Could not select a Table of Contents section to scroll to the desired section. Please check the error in the console log and scrollToElement2() function in the jQuery file.');
                }
            });
        // step 4.
        } else {

        }
    }

    /*  UPDATE COMMENT
        This function is usually executed when a main navigation button, 
        a ToC section button, or the "Contact Me" button is clicked.
        If executed, the corresponding section from the ToC will be shown. 
        The scroll position will change, the heading 2 will be near the 
        top the screen, and the heading 2 will be highlighted to indicate 
        that the intended ToC section has been shown.

        This function does the following steps (numbered in order):
        
            1. Creates variables "getId", "elementTopPosition", and "getNavId".
                - "getId" is used to extract the string value from an element.
                - "elementTopPosition" is used to get the scroll position value of the id
                  that has the same name as the value in "getId".
                - "getNavId" is used to get the ToC button where its string value 
                  in its href attribute matches the value of this variable.

               Set "getNavId" to the corresponding element that matches the value 
               of the href attribute inside a ToC section button (as an a tag inside 
               the .navSideBar class parent).

            2. An if...else if statement follows, checking the event target ("$(this)"):

                2.1. If the event target is a ToC section button by having the "sideBarButton" class, 
                     or has a value assigned to its href attribute, set "getId"'s value to the string 
                     value set in the target's href attribute.
                
                2.2. Else if the event target is an image or body text (is an img or p tag), 
                     set "getId"'s value to the value equal to the target's data-href attribute.
                
                2.3. Otherwise, set "getId"'s value to the string value to the corresponding string 
                     after the current page address (URL).
            
            3. Create a variable "getSectionId" and set its value to the corresponding id.
               The id is based on "getId"'s value.
            
            4. If the window width is less than 320px and "getID"'s value is 'title', set 
               the value of "elementTopPosition" to zero.
               Otherwise:
                - if the window width is greater than 320px and less than 1024px, 
                  "elementTopPosition" is set to the scroll position value of the 
                  corresponding id from "getSectionId".
                - else by default, "elementTopPosition" is set to the scroll position 
                  value of the corresponding id from "getSectionId" minus 1.5 times 
                  the navigation header's height.
            
            5. From the tableOfContents() function, update the styling of the 
               navigation/ToC section button to show the current section. There is a 
               delay of 75 milliseconds.
            
            6. Create a variable "transitionTime". 
               If the current URL has the default name (waynephung.com) or waynephung.com/index.html, 
               set the numerical value to 400, otherwise set it to 0.

            7. Animate the scroll to the heading.
               The duration of the scroll is in milliseconds and based on the value set 
               from "transitionTime".
            
            8. Create a variable "getH2". It's value is set to the heading 2 tag found 
               from the corresponding id. The id name used is based on the string value 
               from "getId".
            
            9. From the stickyH2() function, make the corresponding heading 2 sticky, 
               so that it remains in view while scrolling.

            10. From the briefHighlight() function, temporarily changes the background color 
                behind the heading 2 tag to light green for 1.5 seconds before making the 
                background transparent again. behind the heading 2 for 1.5 seconds.

    */
    function scrollToElement(element) {
        // step 1.
        let getTagName = $(element).prop('tagName'),
            getIDName,
            getSectionID,
            elementTopPosition;
        console.log('event target: ' + getTagName);
        // step 2.
        if (getTagName == 'P') {
            let getParentName = $(element).parent().prop('tagName');
            // console.log('Parent of paragraph: ' + getParentName);
            if ($(element).parent() && (getParentName == 'A')) {
                if ($(element).parent().attr('href').split('#')[0].length > -1) {
                    getIDName = $(element).parent().attr('href').split('#')[1];
                } else if ($(element).parent().attr('href').length > -1) {
                    getIDName = $(element).parent().attr('href');
                } else {
                    console.log('Undefined getIDName: ' + getIDName);
                }
                // console.log('getIDName: ' + getIDName);
                // if ($(element).parent().hasClass('sideBarButton')) {
                // } else if ($(element).parent().hasClass('navLink')) {
                //     getIDName = $(element).parent().attr('href').split('#')[1];
                // } else {
                //     getIDName = $(element).parent().attr('href').split('#')[1];
                // }
            } else {
                if ($(element).attr('data-href').length > -1) {
                    getIDName = $(element).attr('data-href');
                } else {

                }
            }
        } else if (getTagName == 'A') {
            getIDName = $(element).attr('href').split('#')[1];
        } else if (getTagName == 'IMG') {
            console.log('Image\'s data-href: ' + $(element).attr('data-href'));
            getIDName = $(element).attr('data-href');
        } else if (getTagName == 'BUTTON') {
            getIDName = $(element).find('a').attr('href');
        } else {
            getIDName = window.location.hash.split('#')[1];
        }
        console.log('getIDName: ' + getIDName);
        // if (getIDName) {
        //     console.log('ID: ' + getIDName);
        // } else {
        //     console.log('ID not defined.');
        // }
        // step 3.
        // console.log('element from id: ' + getSectionID.attr('id'));
        // step 4.
        if (getTagName == 'BUTTON') {
            console.log('getIDName for button: ' + getIDName);
            if ($(element).hasClass('diffURL')) {
                preloader.removeClass('fade-out');
                preloader.addClass('fade-in');
                preloader.delay(0).fadeTo(300, 1);
                // preloader.fadeIn('slow');
                setTimeout( function () {
                    window.location = getIDName;
                }, 500);
            }
        } else {
            getSectionID = $('#' + getIDName + '');
            if (getSectionID.offset() != null) {
                if (($(window).width() < 320) && (getIDName == 'title')) {
                    elementTopPosition = 0;
                } else if (($(window).width() >= 320) && ($(window).width() < 1024)) {
                    elementTopPosition = getSectionID.offset().top + 1;
                } else {
                    // elementTopPosition = getSectionID.offset().top - (1*header.outerHeight(true));
                    elementTopPosition = getSectionID.offset().top - header.outerHeight(true) + 1;
                }
            } else {
                //Do nothing.
            }
            console.log('elementTopPosition: ' + elementTopPosition);
            // step 5.
            setTimeout( function() {
                tableOfContents();
            }, 75);
            // step 6.
            let transitionTime;
            if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                transitionTime = 400;
            } else {
                transitionTime = 0;
            }
            // step 7.
            $('html, body').animate({
                scrollTop: elementTopPosition
            }, {
                duration: transitionTime,
                easing: 'swing'
            }, function () {
                currentScrolling = false;
            },);
            // step 8.
            let getH2 = getSectionID.find('h2');
            // step 9.
            if (content.length) {
                stickyH2();
            }
            // step 10.
            let pageSections = $('.pageSection:not(#introduction)');
            if (pageSections.length) {
                let scrollPosition = $(window).scrollTop(),
                    viewportHeight = scrollPosition + $(window).height(),
                    contentTopPosition = pageSection.eq(0).offset().top,
                    footerTopPosition = footer.offset().top + $(window).height() - (1.55*header.outerHeight(true));
                if ($(window).width() < 1024) {
                    if (content.length && (scrollPosition > contentTopPosition) && (footerTopPosition > viewportHeight)) {
                        briefHighlight(getH2);
                    } else {
                        //Do nothing.
                    }
                } else {
                    if (content.length && (scrollPosition > contentTopPosition - (1.55*header.outerHeight(true))) && (footerTopPosition > viewportHeight)) {
                        briefHighlight(getH2);
                    } else {
                        //Do nothing.
                    }
                }
            } else {
                //Do nothing.
            }
        }
    }

    /*
        This function is used for heading 2 (h2) tags.
        Temporarily changes the background color behind the heading 2 tag to 
        light green for 1.5 seconds before making the background transparent again.
    */
    function briefHighlight(element) {
        setTimeout( function() {
            element.addClass('highlighted');
        }, 300);
        setTimeout( function() {
            element.removeClass('highlighted');
        }, 1500);
    }

    /*
        This function is used to adjust the width, height, and position of the 
        horizontal progress bar, depending on the window width:

            - If the window width is greater than 750px, resets the progress bar's top 
              position to its default browser value, sets the bar width to 4px, 
              and sets the bar height equal to the outer height of the ToC buttons.

            - If the window width is less than 750px, sets the progress bar's top 
              position equal to the outer height of the navgation links' inner container, 
              sets the progress bar's width equal to the outer width of the navgation links' 
              outer container, and sets the progress bar's height to 8px.

            - If the window width is less than 550px, sets the progress bar's top 
              position to zero, sets the progress bar's width equal to the outer width 
              of the navgation links' outer container, and sets the progress bar's height 
              to 8px.
    */
    function progressContainerHeight() {
        if ($(window).width() >= 1024) {
            // if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1' || window.location.href.indexOf("cv.html") > '-1') {
            if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                progressContainer.css({
                    'top': '',
                    // 'width': 'header.outerWidth(true)',
                    'width': $(window).width(),
                    'height': '8px'
                });
            } else {
                progressContainer.css({
                    'top': '',
                    'width': '4px',
                    'height': $('.accordion').outerHeight(true)
                });
            }
        }
        if ($(window).width() < 1024) {
            progressContainer.css({
                'top': header.outerHeight(true),
                // 'width': header.width(),
                'width': $(window).width(),
                'height': '8px'
            });
        }
        if ($(window).width() < 550) {
            progressContainer.css({
                'top': '0',
                // 'width': header.width(),
                'width': $(window).width(),
                'height': '8px'
            });
        }
    }

    /*
        This function is usually executed when resizing the window or scrolling.
        This changes the visibility, width, and height of the inner indicator of 
        the progress bar for a given page, depending on the URL and window width.

        1. Variables are first created:
            - "scrollPosition" is set to the current scroll location down the webpage.
            - "contentTopPosition" is the scroll position of the selected element.
            - "contentHeight" is the total height of the entire webpage.
            - "scrolled" is a number from 0 to 100 used for indicating the percentage
              of the width that the inner indicator should have based on how far down 
              the page has been scrolled.
        
        2. If the .content container exists, set "contentTopPosition" equal to the 
           scroll position of that container. Otherwise, set "contentTopPosition" equal 
           to the scroll position of the class "indexSection", which is the main tag in the 
           cv.html file.

        3. If the current URL has the default name (waynephung.com), waynephung.com/index.html,  
           or waynephung.com/cv.html:
           
            3a. Set "contentHeight" equal to the difference between the outer height of the 
                html tag and the window height.
            
            3b. Set "scrolled" equal to the division of "scrollPosition" and "contentHeight" 
                times 100.
        
            3c. With the CSS function, set the width of the inner indicator to a percentage 
                and set its height to 8px.
                The percentage has the numerical value equal to "scrolled".
        
        4. Otherwise (if the current URL is of a different page):
            
            4a. Set "contentHeight" equal to the outer height of the .content class container.
                
            4b. Set "scrolled" equal to the difference between "scrollPosition" and 
                "contentTopPosiion". The difference is divided by "contentHeight", then the 
                resulting quotient will be multipled by 100.
            
            4c. If the window width is greater than or equal to 320px and less than 750px, 
                (with the CSS function) reset the display of the inner indicator, set 
                the indicator's width to a percentage, and set its height to 8px.
                The percentage has the numerical value equal to "scrolled".
            
            4d. If the window width is less than 320px, instead make the inner indicator 
                disappear.
            
            4e. If the window width is greater than 750px and the value of "scrollPosition" is 
                greater than "contentTopPosition", (with the CSS function) set the width of the 
                inner indicator to 4px, and set its height a percentage. The percentage has the 
                numerical value equal to "scrolled".
    */
    function progressBarHeight() {
        // step 1.
        let scrollPosition = $(window).scrollTop(),
            contentTopPosition,
            contentHeight,
            scrolled = 0;
        // step 2.
        if (content.length) {
            contentTopPosition = content.offset().top;
            // console.log('content class true');
        } else {
            contentTopPosition = $('.indexSection').offset().top;
            // if ($(window).width() >= 1024) {
            //     contentTopPosition = $('.indexSection').offset().top;
            // } else {
            //     contentTopPosition = $('.indexSection').offset().top;
            // }
            // console.log('content class false');
        }
        // step 3.
        // if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1' || window.location.href.indexOf("cv.html") > '-1') {
        if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
            // step 3a.
            // contentHeight = $('main').outerHeight(true);
            contentHeight = $('html').outerHeight(true) - $(window).height() - header.outerHeight(true);
            // scrolled = ((scrollPosition-contentTopPosition)/contentHeight)*100;
            // step 3b.
            if (scrollPosition <= contentTopPosition) {
                scrolled = 0;
            } else {
                scrolled = (scrollPosition/contentHeight)*100;
                if ((scrolled >= 100) || (scrollPosition >= (contentTopPosition + contentHeight))) {
                    scrolled = 100;
                } else {
                    scrolled = (scrollPosition/contentHeight)*100;
                }
            }
            console.log('scrolled value: ' + scrolled);
            // console.log('$("html").outerHeight(true): ' + $('html').outerHeight(true));
            // console.log('scrollPosition: ' + scrollPosition);
            // console.log('contentHeight: ' + contentHeight);
            // console.log('scrolled: ' + scrolled);
            // console.log('$(window).height(): ' + $(window).height());
            // step 3c.
            progressBar.css({
                'width': scrolled + '%',
                'height': '8px'    
            });
            // return;
        // step 4.
        } else {
            // step 4a.
            contentHeight = $('main').outerHeight(true);
            // step 4b.
            if (scrollPosition <= contentTopPosition) {
                scrolled = 0;
            } else {
                scrolled = (scrollPosition/contentHeight)*100;
                if ((scrolled >= 100) || (scrollPosition >= (contentTopPosition + contentHeight))) {
                    scrolled = 100;
                } else {
                    scrolled = (scrollPosition/contentHeight)*100;
                }
            }
            console.log('scrolled value: ' + scrolled);
            // step 4c.
            if (($(window).width() >= 320) && ($(window).width() < 1024)) {
                // console.log('Width less than 750.');
                progressBar.css({
                    'display': '',
                    'width': scrolled + '%',
                    'height': '8px'
                });
            }
            // step 4d.
            if ($(window).width() < 320) {
                progressBar.css('display', 'none');
            }
            // step 4e.
            if ($(window).width() >= 1024) {
                // console.log('Width greater than 750 and passed content.');
                progressBar.css({
                    'width': '4px',
                    'height': scrolled + '%'
                });
            }
        }
    }

    /*
        preamble: This function is mainly executed on any element that is a heading 2 tag (h2) 
        and fixes the position of the corresponding h2 tag so that it remains in view. Fixing the 
        h2 tag can only happen if these conditions are met:
            - window width is greater than 320px
            - the current scroll position is in between the scroll position of the content 
              container and the footer container
        Any other h2 tag that do not meet these conditions have their positions reverted to default 
        (which is relative to the surrounding elements).

        The function executes the following steps (numbered in order):

        1. If the window width is greater than 320px, execute the following commands.
           Otherwise, revert back to default/relative positioning for all h2 tags.
        
        2. Variables are first created:
            - "scrollPosition" is set to the current scroll location down the webpage.
            - "headerOffset" is the calculated value of 1.5 times the outer height of the navigation header.
            - "contentTopPosition" is the numerical scroll position value of the selected content container.
            - "footerTopPosition" is set to the numerical scroll position value of the footer container
              minus three times the "headerOffset".
        
        3. If the current URL has the default name (waynephung.com) or waynephung.com/index.html 
           and heading 2 (h2) tags exist, the value of "contentTopPosition" is set to the scroll 
           position of the (main tag) element with the class name "indexSection" minus 100.
           Otherwise, the value is is set to the scroll position of the content container.

        4. If either the content or the (main tag) element with the class name "indexSection" exists, 
           h2 tags exist, and the value of "scrollPosition" is greater than the value of "contentTopPosition"; 
           do the following steps:
            
            4.1. With the unfixH2() function, removes the fixed position state of all h2 tags.

            4.2. For each h2 tag:
                
                4.2.1. Create three variables:
                        - "index" is the number of the current h2 tag (e.g. first, second, third h2 tag).
                          The first h2 tag has an index of zero, the second h2 tag has an index of one, etc.
                        - "getH2" is the selected h2 tag corresponding to the index number.
                        - "getH2Pos" is the scroll position of the selected h2 tag.
                
                4.2.2. If the window width is greater than or equal to 1024px, "getH2Pos" is set 
                       to the scroll position of the selected h2 tag minus "headerOffset".
                       Otherwise, "getH2Pos" is set to the scroll position of the selected h2 tag 
                       minus 100.
                
                4.2.3. If "index" is equal to the index of the last h2 tag and if the value of 
                       "scrollPosition" is greater than or equal to the value of "getH2Pos", 
                       first check if the window width is less than or equal to 350px. If it is, 
                       then check the appended portion of the current URL. If the URL doesn't 
                       have "cv.html" appended, use the fixH2() function to fix the positioning 
                       of selected h2 tag. Otherwise, do nothing. If the window width is greater 
                       than 350px, reset the positioning of all h2 tags.
                
                4.2.4. If "index" is less than index of the last h2 tag and if the value of 
                       "scrollPosition" is greater than or equal to the value of "getH2Pos"... 
                       
                       First, define two new variables:
                        - "nextH2" is set to the h2 tag that is right after the corresponding 
                        tag with the "index" value.
                        - "nextH2Pos" is set to the overall difference between the scroll position 
                        value of "nextH2", "headerOffset", and 100.

                       Then, if the value of "scrollPosition" is between the values of the current 
                       and next h2 tags ("getH2Pos" and "nexH2Pos"), se the fixH2() function to fix 
                       the selected h2 tag. How the tag will be fixed will depend if the appended 
                       text of the current URL is "/", "index.html", "cv.html", or neither of the 
                       three.

            4.3. If the appended text of the current URL is either "/" or "index.html", set the width 
                 of all h2 tags equal to the inner width of the (main tag) element with the class name 
                 "indexSection". If the appended text is "cv.html", the width of all h2 tags is 
                 instead equal to the outer width of the content container. Do nothing otherwise.
            
        5. If the if statement defined in step 4. is not met, revert back to default/relative positioning 
        for all h2 tags.

    */
   var stickyH2Index = 0;
        function stickyH2() {
            console.log('stickyH2 function started.');
            //step 1. UPDATE COMMENT
            // if (window.location.href.indexOf("cv.html") > '-1') {
            //     console.log('cv.html, stickyH2 stopped.');
            //     unfixH2(h2);
            // } else {
            // }
            if ($(window).width() > 750) {
                //step 2.
                let scrollPosition = $(window).scrollTop(),
                    headerOffset = header.outerHeight(true),
                    // headerOffset = (1.4*header.outerHeight(true)),
                    contentTopPosition,
                    // footerTopPosition = footer.offset().top - (3*headerOffset);
                    footerTopPosition = footer.offset().top;
                //step 3.
                if ((window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') && (h2.length)) {
                    contentTopPosition = $('#designWork').offset().top - 100;
                } else if ($(window).width() > 1024) {
                    contentTopPosition = content.offset().top - headerOffset;
                } else {
                    contentTopPosition = content.offset().top;
                }
                console.log('contentTopPosition: ' + contentTopPosition);
                console.log('h2 length: ' + h2.length);
                //step 4.
                if ((content.length || $('.indexSection').length) && (h2.length > 2) && (scrollPosition > contentTopPosition)) {
                    //step 4.1.
                    unfixH2(h2);
                    //step 4.2. and 4.2.1.
                    if (h2.length) {
                        console.log('h2 length: ' + h2.length);
                    } else {
                        console.log('No h2 exists.');
                    }
                    h2.each( function(index) {
                        var getH2 = h2.eq(index),
                            getCurrentH2,
                            getCurrentH2Pos;
                        if (index == stickyH2Index) {
                            // console.log('h2.length: ' + h2.length);
                            console.log('starting stickyH2Index: ' + stickyH2Index);
                            //step 4.2.2.
                            getCurrentH2 = h2.eq(stickyH2Index);
                            if ($(window).width() >= 1024) {
                                // getH2Pos = getH2.offset().top - headerOffset - getH2.outerHeight(true);
                                // getCurrentH2Pos = getCurrentH2.offset().top - headerOffset - getCurrentH2.outerHeight(true);
                                getCurrentH2Pos = getCurrentH2.offset().top - headerOffset;
                            } else {
                                getCurrentH2Pos = getCurrentH2.offset().top;
                            }
                            if (stickyH2Index < h2.length-1) {
                                console.log('stickyH2Index less than h2 length: ' + stickyH2Index);
                                let nextH2 = h2.eq(stickyH2Index+1),
                                    nextH2Pos;
                                if ($(window).width() >= 1024) {
                                    nextH2Pos = nextH2.offset().top - headerOffset - nextH2.outerHeight(true);
                                } else {
                                    nextH2Pos = nextH2.offset().top;
                                }
                                if ((scrollPosition >= getCurrentH2Pos) && (scrollPosition < (getCurrentH2Pos + getCurrentH2.parents('.pageSection').outerHeight(true) - 150))) {
                                    fixH2(getCurrentH2);
                                } else if (scrollPosition < getCurrentH2Pos) {
                                    unfixH2(getCurrentH2);
                                    if (stickyH2Index - 1 < 0) {
                                        stickyH2Index = 0;
                                    } else {
                                        stickyH2Index -= 1;
                                    }
                                } else if (scrollPosition > (getCurrentH2Pos + getCurrentH2.parents('.pageSection').outerHeight(true) - 150)) {
                                    unfixH2(getCurrentH2);
                                    if (stickyH2Index + 1 > h2.length-1) {
                                        stickyH2Index = h2.length-1;
                                    } else {
                                        stickyH2Index += 1;
                                    }
                                } else {
                                    unfixH2(getCurrentH2);
                                }
                                console.log('stickyH2Index after adjustment: ' + stickyH2Index);
                            } else if (stickyH2Index == h2.length-1)  {
                                console.log('maximum stickyH2Index: ' + stickyH2Index);
                                if ((scrollPosition >= getCurrentH2Pos) && (scrollPosition < (getCurrentH2Pos + getCurrentH2.parents('.pageSection').outerHeight(true) - 150))) {
                                    // fixH2(getCurrentH2);
                                    if (getCurrentH2.parent('article.h2-wrapper').length) {
                                        //Do nothing.
                                    } else {
                                        getCurrentH2.wrap('<article class="h2-wrapper" style="height:96px;"></article>');
                                        // getCurrentH2.parent('article.h2-wrapper').css({
                                        //     'width': '100%', 
                                        //     'height': getCurrentH2.innerHeight(false)
                                        // });
                                    }
                                    getCurrentH2.addClass('sticky');
                                    unfixH2(h2.not(getCurrentH2));
                                    // return false;
                                } else {
                                    unfixH2(getCurrentH2);
                                    stickyH2Index -= 1;
                                }
                                console.log('stickyH2Index after adjustment: ' + stickyH2Index);
                            }
                        } else {
                            return stickyH2Index;
                            // unfixH2(getH2);
                        }
                        // return false;
                        //step 4.2.3.
                        // if ((index == h2.length-1) && (scrollPosition >= getH2Pos)) {
                        //     fixH2(getH2);
                        //     if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                        //         if (scrollPosition < (getH2Pos + (getH2.parents('.pageSection').outerHeight(true) - 150))) {
                        //             fixH2(getH2);
                        //         } else {
                        //             unfixH2(h2);
                        //         }
                        //         // setTimeout( function() {
                        //         //     fixH2(getH2);
                        //         // }, 3000);
                        //         // let estimatedWidth = $(window).width() - 2*(parseInt(main.css('padding-left')));
                        //         // console.log('Padding left: ' + parseInt(main.css('padding-left')));
                        //         // getH2.css('width', estimatedWidth);
                        //     // } else if (window.location.pathname == '/' || window.location.href.indexOf("cv.html") > '-1') { 
                        //         // Do nothing.
                        //     } else {
                        //         if (scrollPosition < (getH2Pos + (getH2.parents('.pageSection').outerHeight(true) - 150))) {
                        //             fixH2(getH2);
                        //         } else {
                        //             unfixH2(h2);
                        //         }
                        //         // let estimatedWidth = $(window).width() - 2*(parseInt(main.css('padding-left')));
                        //         // console.log('Padding left: ' + parseInt(main.css('padding-left')));
                        //         // getH2.css('width', estimatedWidth);
                        //     }
                        // }
                        //step 4.2.4.
                        // if ((index < h2.length-1) && (scrollPosition >= getH2Pos)) {
                        //     let nextH2 = h2.eq(index+1),
                        //         nextH2Pos;
                        //     if ($(window).width() >= 1024) {
                        //         nextH2Pos = nextH2.offset().top - headerOffset - nextH2.outerHeight(true);
                        //     } else {
                        //         nextH2Pos = nextH2.offset().top;
                        //     }
                        //     if (scrollPosition >= getH2Pos) {
                        //         if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                        //             if (scrollPosition < (getH2Pos + (getH2.parents('.pageSection').outerHeight(true) - 150))) {
                        //                 fixH2(getH2);
                        //             } else {
                        //                 unfixH2(h2);
                        //             }
                        //             // if (index == h2.length-1) {
                        //             //     fixH2(getH2);
                        //             //     // unfixH2(h2);
                        //             //     // if (scrollPosition < (getH2Pos+(0.5*getH2.siblings('article').outerHeight(true)))) {
                        //             //     //     fixH2(getH2);
                        //             //     // } else {
                        //             //     //     unfixH2(h2);
                        //             //     // }
                        //             // } else {
                        //             //     if (scrollPosition < nextH2Pos) {
                        //             //         fixH2(getH2);
                        //             //     } else {
                        //             //         unfixH2(h2);
                        //             //     }
                        //             // }
                        //             // let estimatedWidth = $(window).width() - 2*(parseInt(main.css('padding-left')));
                        //             // console.log('Padding left: ' + parseInt(main.css('padding-left')));
                        //             // getH2.css('width', estimatedWidth);
                        //         // } else if (window.location.href.indexOf("cv.html") > '-1') {
                        //             // fixH2(getH2, 'cv.html');
                        //         } else {
                        //             if (scrollPosition < (getH2Pos + (getH2.parents('.pageSection').outerHeight(true) - 150))) {
                        //                 fixH2(getH2);
                        //             } else {
                        //                 unfixH2(h2);
                        //             }
                        //             // let columnGap = $(window).width() - parseInt(2*main.css('padding-left')) - navSideBar.outerWidth(true) - content.outerWidth(true),
                        //                 // estimatedWidth = content.width() + 20;
                        //             // console.log('Padding left: ' + parseInt(main.css('padding-left')));
                        //             // getH2.css('width', estimatedWidth);
                        //             // if ((index == h2.length-2) && !(window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1')) {
                        //             //     let setWrapperWidth = h2.find('span').outerWidth(true);
                        //             //     getH2.parent('article.h2-wrapper').css('width', setWrapperWidth);
                        //             // }
                        //         }
                        //     } else if ((index == h2.length-2) && (scrollPosition > nextH2Pos)) {
                        //         // unfixH2(getH2);
                        //         //Do nothing.
                        //     } else {
                        //         //Do nothing.
                        //     }
                        //     if (index == h2.length-2) {
                        //         // getH2.css('width', content.outerWidth(true) + columnGap);
                        //         getH2.css('width', content.width());
                        //     }
                        // }
                    });
                    //step 4.3.
                    if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                        // h2.css('width', $('.indexSection').innerWidth(false));
                    } else if (window.location.href.indexOf("cv.html") > '-1') {
                        // h2.css('width', content.outerWidth(true));
                    } else {
                        // if ($(window).width() >= 750) {
                        //     h2.css('width', content.innerWidth()+10);
                        // } else {
                        //     h2.css('width', content.innerWidth());
                        // }
                    }
                //step 5.
                } else {
                    stickyH2Index = 0;
                    console.log('Issue with stickyH2 running.');
                    unfixH2(h2);
                    return stickyH2Index;
                }
            //step 5.
            } else {
                unfixH2(h2);
            }
        }
    
        /*
            preamble: This function is mainly executed on any element that is a heading 2 tag (h2)
            and makes the corresponding h2 sticky so that it remains in view while 
            scrolling without altering the space removed from. This can only happen if the current scroll position is greater than 
            the selected h2. The function must have two arguments provided, the selected h2 
            (set as the variable "element") and the name of the string when calling this function
            (set as the variable "string").
    
            1. If the h2's parent element exists such that it is an article tag with a 
               class name "h2-wrapper", do nothing. Otherwise, create the parent article tag.
            
            2. With the CSS function, set the position of the h2 to fixed, its margin to zero, 
               and it's layer position (z-index) to 2 to ensure no other elements are layered on 
               top of the selected h2.
    
            3. If the window width is greater than or equal to 1024px, (with the CSS function) 
               set the top position of the h2 equal to the outer height of the navigation header 
               minus one, and reset h2's default padding.
            
            4. If the window width is betweeen 550px and 1024px, (with the CSS function) 
               set the top position of the h2 to zero, set h2's left position to 3rem, and 
               set h2's top and bottom padding to 1rem. Left and right padding would be 0rem.
            
            5. If the window width is less than 550px, (with the CSS function) set the top position 
               of the h2 to zero, set h2's left position to 1.5rem, and  set h2's top and bottom padding 
               to 0.5rem. Left and right padding would be 0rem.
            
            6. Check the string value of "string" and (with the CSS function) set the width of the 
               selected h2.
                - If it is 'index.html', set the h2's width equal to the inner width of the class "indexSection".
                - If it is 'cv.html', set the h2's width equal to the outer width of the content class container.
                - If it is 'default', set the h2's width equal to the inner width of the content class container.
                  If the window width is greater than or equal to 750px, the width is the same as mentioned (inner 
                  width of '...'), but add 20.
                - Otherwise, do nothing.
            
            7. If an amount of the article tag with the "h2-wrapper" class exists:
                - Set the height of the selected h2's parent article tag equal to the outer height of the selected h2.
                - Set the width of the selected h2 equal to its parent article tag's width.
            
            8. With the unfixH2() function, removes the fixed/sticky properties of all other h2 tags 
               that are not the selected h2 tag.
            
            9. With the CSS function, each span tag nested within each h2 tag that isn't the selected h2 tag 
               will have their max-width reset to their default value.
        */
    
        // preamble
        // function fixH2(element, string) {
        function fixH2(element) {
            // step 1.
            if (element.parent('article.h2-wrapper').length) {
                //Do nothing.
            } else {
                element.wrap('<article class="h2-wrapper"></article>');
            }
            // step 2.
            // element.css({
            //     'position': 'fixed',
            //     'margin': 0,
            //     'z-index': 7
            // });
            element.addClass('sticky');
            // step 3.
            // if ($(window).width() >= 1024) {
            //     if (string == 'index.html') {
            //         // element.css('width', $('.indexSection').innerWidth(false));
            //         element.css({
            //             'top': header.outerHeight(true)-1,
            //             'left': '5rem',
            //             'padding': '1rem 5rem 1rem 0',
            //             'width': '100%'
            //         });
            //     } else {
            //         element.css({
            //             'top': header.outerHeight(true)-1,
            //             'padding': ''
            //         });
            //     }
            // } 
            // step 4.
            // if (($(window).width() >= 550) && ($(window).width() < 1024)) {
            //     element.css({
            //         'top': 0,
            //         'left': '3rem',
            //         'padding': '1rem 0rem'
            //     });
            // }
            // step 5.
            // if ($(window).width() < 550) {
            //     if (string == 'index.html') {
            //         element.css({
            //             'top': 0,
            //             'left': '0',
            //             'padding': '1rem 1.5rem'
            //         });
            //     } else {
            //         element.css({
            //             'top': 0,
            //             'left': '1.5rem',
            //             'padding': '1rem 0rem'
            //         });
            //     }
            // }
            // step 6. UPDATE COMMENT
            let wrapperWidth,
                columnGap = $(window).width() - parseInt(2*main.css('padding-left')) - navSideBar.outerWidth(true) - content.outerWidth(true);
            // if (string == 'index.html') {
                // element.css('width', $('.indexSection').innerWidth(false));
                // element.css({
                //     'left': '5rem',
                //     'padding': '1rem 5rem 1rem 0',
                //     'width': '100%'
                // });
            // } else {
                if (window.location.pathname == '/' || window.location.href.indexOf("index.html") > '-1') {
                    // element.css('width', '100%');
                } else {
                    if ($(window).width() >= 1024) {
                        wrapperWidth = content.innerWidth(true) + columnGap + 20;
                        element.css('width', wrapperWidth);
                    } else {
                        wrapperWidth = content.innerWidth(true) - 48;
                        element.css('width', wrapperWidth);
                    }
                }
            // }
            // if (string == 'index.html') {
            //     element.css('width', $('.indexSection').innerWidth(false));
            // } else if (string == 'cv.html') {
            //     element.css('width', content.outerWidth(true));
            // } else if (string == 'default') {
            //     if ($(window).width() >= 750) {
            //         element.css('width', content.outerWidth(true) + columnGap);
            //     } else {
            //         element.css('width', content.innerWidth(true));
            //     }
            // } else {
            //     if ($(window).width() >= 750) {
            //         element.css('width', content.outerWidth(true) + columnGap);
            //     } else {
            //         element.css('width', content.innerWidth(true));
            //     }
            // }
            // step 7.
            if (element.parent('article.h2-wrapper').length) {
                // console.log('h2 selected: ' + element);
                // if ($(window).width() >= 750) {
                    // if (string == 'index.html') {
                    //     // element.css({
                    //     //     'left': '5rem',
                    //     //     'padding': '1rem 5rem 1rem 0',
                    //     //     'width': $('.indexSection').innerWidth(false)
                    //     // });
                    // } else {
                    // }
                //     element.css('width', content.outerWidth(true) + columnGap);
                // } else {
                // }
                element.css('width', content.innerWidth(true));
                element.parent('article.h2-wrapper').css({
                    'width': '100%', 
                    'height': element.height()
                });
                console.log('h2 inner height: ' + element.height());
                console.log('h2 height: ' + element.outerHeight(true));
                console.log('h2-wrapper height: ' + element.parent('article.h2-wrapper').outerHeight(true));
                element.css('width', element.parent('article.h2-wrapper').width());
            }
            // step 8.
            unfixH2(h2.not(element));
            // step 9.
            // h2.not(element).find('span').css('max-width', '');
        }
    
    /*
        preamble: This function is mainly executed on all heading 2 (h2) tags (sometimes 
        not on the selected h2 tag) and reset the default (CSS) properties of those tags.
        Position, top, left, margin, padding, max-width, width, and z-index are all 
        reverted to any of the default values set in the testSass.css file. This function 
        will also remove the h2 tag's parent article tag with the class name "h2-wrapper" 
        if it exists.
    */
    function unfixH2(selectedElement) {
        // selectedElement.css({
        //     'position': '',
        //     'top': '',
        //     'left': '',
        //     'margin': '',
        //     'padding': '',
        //     'max-width': '',
        //     'width': '',
        //     'z-index': ''
        // });
        selectedElement.removeClass('sticky');
        if (selectedElement.parent('article.h2-wrapper').length) {
            selectedElement.unwrap('article.h2-wrapper');
        } else {
            //Do nothing.
        }
    }

/*
    preamble: This function is mainly executed when the window is resized, when scrolling occurs
    such that a different ToC section is shown, or when a ToC section button is selected. 
    This function would only be used in pages that contain case studies for projects, which 
    excludes the home page and the cv.html page. This function controls the appearance of the ToC 
    container (which is based on the window width, as well as the ToC section buttons.

    If the window width is less than 750px, the ToC would appear as a button that would first have 
    text to open/close the ToC. The ToC itself is a medium-sized container that shows a list of all 
    of the ToC sections that the person can jump to within a case study page. The text would disappear 
    after opening and closing the ToC for the first time.

    If the window width is greater than or equal to 750px, the ToC would appear as a sidebar on 
    the right side of the screen and should have all of the section buttons available. In addition, 
    there would be a thin, long, vertical progress bar to the right of the ToC section buttons. 
    The bar will have a dark bar which increases in height the farther down the page has been scrolled.

    For both version of the ToC, the appearance of the buttons may change to help the person remember 
    which section of the case study the content is referring to. If the content appears in view,
    the selected ToC section button will have its text, corresponding image color, and background color 
    change, which will be different from every other ToC section button.

    The function executes the following steps (numbered in order):

        1. Check if sections of an existing case study page exist (defined with the class name 
           "pageSection"). If so, continue to execute the rest of the function.
           Otherwise, skip all of the steps below and do nothing.

        2. Create four variables used for checking the current ToC section:
            - "scrollPosition" is set to the current scroll location down the webpage.
            - "viewportHeight" is set to the value of "scrollPosition" plus the window height.
            - "contentTopPosition" is set to the scroll position of the first instance of the 
              tag with the "pageSection" class.
            - "footerTopPosition" is set to the scroll position of the footer container plus 
              the window height minus 1.55 times the "headerOffset".
        
        3. If the window width is greater than or equal to 750px:
        
            3.1. With the CSS function, set the following properties for the ToC container:
                    - position to sticky
                    - reset the bottom position and width
                    - right position to zero (the sidebar will appear in the right-most portion 
                      of the screen)
                    - max height is equal to the total height of all the ToC section buttons
                    - height is equal to the max height (100%)
                 If the window width is greater than 1024px, set the sidebar's top position to 
                 1.25 times the outer height of the navigation header. Otherwise, set to 2em by 
                 default (~32px). em is the measurement unit relative to the size of the font.
        
        4. If the window width is less than 750px:

            4.1. Create two more variables:
                    - "calculateWidth" is an extracted numerical value derived from the difference 
                      between the window width and twice the left padding of the main tag.
                    - "navButtonsHeight" is used to set the height of the ToC container, depending 
                      if the container has the class that toggles its visibility.
            
            4.2. If the ToC container has the class "show", set the value of "navButtonsHeight" 
                 equal to 70% of the window height plus the outer height of the ToC button. 
                 Otherwise, set the variable to the outer height of the ToC button only.
            
            4.3. With the CSS function, set the following properties for the ToC container:
                    - position to fixed
                    - reset the top position
                    - left and right position to zero (to keep the ToC button centered)
                    - width is equal to the value of "calculateWidth"
                    - height is equal to the value of "navButtonsHeight"
                 If the window width is greater than 320px, set the bottom position equal to 
                 1.1 times the outer height of the navigation header. This will make the ToC 
                 button appear at the bottom-center part of the screen. Otherwise, set to 1em 
                 by default (~16px).

        5. Execute the following steps if these three conditions are met (numbered in order).
            - if the content container exists
            - the current scroll position is greater than the calculated difference between 
              "contentTopPosition" and 1.55 times the outer height of the navigation header
            - "footerTopPosition" is greater than "viewHeight", or in other words as long 
              as the footer section of the web page has not been reached and not yet in view
           Otherwise, revert the style properties of all ToC section buttons 
           back to their default values.

           For each page section:

            5.1. Create two variables:
                    - "index" is the number of the current page section
                    - "elementTopPos", which is the difference between the scroll position of 
                      the selected page section of the corresponding "index" value minus 1.55 
                      times the outer height of the navigation header. 
                
            5.2. If the current scroll position is past the scroll position of the selected 
                 page section with the corresponding index (e.g. the value of "scrollPosition" 
                 is greater than that of "elementTopPos")...

                5.2.1. Create two variables:
                        - "getId" is set to match the id name the selected page section by 
                          referencing the page section's 'id' attribute.
                        - "getNavId" is set the corresponding a tag inside the parent element 
                          tag with the "accordion" class name. The a tag's 'href' attribute 
                          must have the same name as that of "getId". This variable is used 
                          to get the ToC section button that matches the corresponding page 
                          section.
                
                5.2.2. Set a short time delay to 75 milliseconds to execute the following:
                        - Remove all ToC section buttons, including the images and text 
                          inside them, of the class name "active". This would reset the 
                          default appearance of the buttons, images, and text.
                        - Add the class "active" to the selected page ToC button, image, 
                          and text; this will apply CSS properties to change the appearance 
                          of these selected elements. The selected three elements must have 
                          the a tag as the parent tag with the tag's 'href' attribute having 
                          the same name as that of "getId".
                       This step is how the ToC section buttons will only have button selected 
                       that has a distinct visual appearance from the other buttons.

*/
    function tableOfContents() {
        // console.log('pageSection.length: ' + pageSection.length);
        // step 1.
        let pageSections = $('.pageSection:not(#introduction)');
        if (pageSections.length) {
            // step 2.
            let scrollPosition = $(window).scrollTop(),
                viewportHeight = scrollPosition + $(window).height(),
                contentTopPosition = pageSection.eq(0).offset().top,
                footerTopPosition = footer.offset().top + $(window).height() - (1.55*header.outerHeight(true));
            // step 3. UPDATE COMMENT
            // step 5.
            if (content.length && (scrollPosition > contentTopPosition - (1.55*header.outerHeight(true))) && (footerTopPosition > viewportHeight)) {
                // console.log('Sticking navSidebar.');
                // step 5.1.
                pageSections.each( function(index) {
                    let currentElementTopPos = $(pageSection.eq(index)).offset().top - (1.55*header.outerHeight(true));
                    // step 5.2.
                    if (index == pageSection.length - 1) {
                        if (scrollPosition >= currentElementTopPos) {
                            // step 5.2.1.
                            let getId = pageSection.eq(index).attr('id'),
                                getNavId = $('.accordion a[href = "#' + getId + '"]');
                                // getNavIndex = $('.accordion a').index(getNavId);
                            // console.log('getNavIndex: ' + getNavIndex);
                            // console.log('h2 getId: ' + getNavId);
                            // step 5.2.2.
                            setTimeout( function() {
                                allSideBarTags.removeClass('active');
                                $('.accordion a[href = "#' + getId + '"], .accordion a[href = "#' + getId + '"] picture.vectorIcon img,  .accordion a[href = "#' + getId + '"] p').addClass('active');
                            }, 75);
                            sectionIndex = index;
                            // getNavId.addClass('active');
                            // getNavId.find('picture.vectorIcon img').addClass('active');
                            // getNavId.find('p').addClass('active');
                        }
                    } else if (index < pageSection.length - 1) {
                        let nextElementTopPos = $(pageSection.eq(index+1)).offset().top - (1.55*header.outerHeight(true));
                        if ((scrollPosition >= currentElementTopPos) && (scrollPosition < nextElementTopPos)) {
                            // step 5.2.1.
                            let getId = pageSection.eq(index).attr('id'),
                                getNavId = $('.accordion a[href = "#' + getId + '"]');
                                // getNavIndex = $('.accordion a').index(getNavId);
                            // console.log('getNavIndex: ' + getNavIndex);
                            // console.log('h2 getId: ' + getNavId);
                            // step 5.2.2.
                            setTimeout( function() {
                                allSideBarTags.removeClass('active');
                                $('.accordion a[href = "#' + getId + '"], .accordion a[href = "#' + getId + '"] picture.vectorIcon img,  .accordion a[href = "#' + getId + '"] p').addClass('active');
                            }, 75);
                            sectionIndex = index;
                        }
                    } else {
                        //Do nothing.
                    }
                });
            // back to step 5. if statement is false 
            } else {
                allSideBarTags.removeClass('active');
            }
        // back to step 1. if statement is false
        } else {
            //Do nothing.
        }
        console.log('sectionIndex: ' + sectionIndex);
        return sectionIndex;
    }

/*
    This function is mainly used to change the top/bottom position 
    of the navigation header using the CSS function.
        - If the inner width of the body tag is less than 1024px, 
          places the header at the bottom portion of the screen.
          Resets its top position and width.
        - Otherwise, places the header at the top portion of the 
          screen. Resets its bottom position and width.
          
*/
    function headerLocation() {
        if ($('body').innerWidth() < 1024) {
            // let headerHeight = header.outerHeight(true),
            //     navigationBarHeight = navigationBar.outerHeight(true);
            // console.log(headerHeight);
            // console.log(document.body.clientWidth);
            header.css({
                'top': '',
                'bottom': '0px',
                'left': '0px',
                'width': ''
            });
        } else {
            header.css({
                'bottom': '',
                'top': '0px',
                'left': '0px',
                'width': ''
            });
        }
    }


/*
    premable: This function is mainly executed on main navigation buttons in the home page 
    when the window is resized or when scrolling occurs. This function will change the appearance 
    of one or all of the navigation buttons, if the corresponding page section is visible in view, 
    if a different page section is viewed such that the current page section is no longer in view, 
    or if the current scroll position is not within the scroll position of any of the page sections.

    The function executes the following:

        1. Create the variable "pageSections" as a reference to every page section that doesn't 
           include the id name "introduction".
        
        2. For each and every page section:

            2.1. Create five variables:
                    - "scrollPosition" is set to the current scroll location down the webpage.
                    - "headerOffset" is the calculated value of 1.55 times the outer height of the navigation header.
                    - "pageSectionZero" is the difference between the scroll position of the first page section and "headerOffset".
                    - "pageSectionIndex" is the difference between the scroll position of the select page section with a matching "index" value and "headerOffset".
                    - "footerScrollTop" is the difference between the scroll position of the footer tag and "headerOffset".
            
            2.2. If the current scroll position is either:
                    - not past the position of the first page section
                    - past the position of the footer...
                 remove the style properties and text-decoration CSS property of 
                 all main navigation links by removing their "currentSection" class.
            
            2.3. Otherwise, if the current scroll position is between the page section 
                 with the corresponding index and the footer:

                 2.3.1. Create two more variables:
                            - "getId" is set to match the id name the selected page section by 
                              referencing the page section's 'id' attribute.
                            - "getNavId" is set to the corresponding navigation link. That 
                              navigation link must not have the id "resume" and its href 
                              attribute must have the same name as that of "getId".
                
                2.3.2. Remove the style properties and text-decoration CSS property of 
                       all main navigation links by removing their "currentSection" class. 
                       This would reset the default appearance of the links.

                2.3.3. Add the "currentSection" class to the selected navigation link "getNavId"; 
                       this will apply CSS properties to change the selected link's appearance.
                
            2.4. Do nothing if none of the conditions from 2.2. or 2.3. are met.
                
*/

    function scrollSpy() {
        // console.log('navLink length: ' + navLink.length);
        // step 1.
        let pageSections = $('.pageSection:not(#introduction)');
        // console.log('pageSection length: ' + pageSections.length);
        // step 2.
        pageSections.each ( function(index) {
            // step 2.1.
            let scrollPosition = $(window).scrollTop(),
                headerOffset = (1.55*header.outerHeight(true)),
                // pageSectionZero = pageSections.eq(0).offset().top - headerOffset - (0.15*$(window).height()),
                pageSectionZero = pageSections.eq(0).offset().top - headerOffset,
                // pageSectionIndex = pageSections.eq(index).offset().top - headerOffset - (0.15*$(window).height()),
                pageSectionIndex = pageSections.eq(index).offset().top - headerOffset,
                footerScrollTop = $('footer').offset().top - headerOffset;
            // step 2.2.
            if ((scrollPosition < pageSectionZero) || (scrollPosition > footerScrollTop)) {
                // console.log('Removing currentSection class.');
                navLink.removeClass('currentSection');
                navLink.css('text-decoration', 'none');
            // step 2.3.
            } else if ((scrollPosition > pageSectionIndex) && (scrollPosition < footerScrollTop)) {
                    // step 2.3.1.
                    let getId = pageSections.eq(index).attr('id'),
                        getNavId = $('.navLink:not(#resume)[href="#' + getId + '"]');
                    // step 2.3.2.
                    navLink.removeClass('currentSection');
                    navLink.css('text-decoration', 'none');
                    // step 2.3.3.
                    getNavId.addClass('currentSection');
            // step 2.4.
            } else {
                // Do nothing.
            }
        });
    }

/*
    Obsolete function to set the width and height dimensions for viewing 
    rendered a Google Slides deck. It is obsolete because rendering them 
    can possible slow down page load or make the slides slow to load.
*/
    // function gridItemHeight() {
    //     for (let i = 0; i < gSlides.length; i++) {
    //         let gSlidesWidth = gSlides.eq(i).outerWidth(true);
    //         gSlides.eq(i).css('height', 0.597*gSlidesWidth);
    //     }
    // }

/*
    Unused functions related to the use of the Panzoom Javascript library plugin.
    They provide more mouse and/or gesture interactivity with images, such as 
    being able to zoom and pan around an image.
*/
    // setTimeout( function() {
    //     img.on('mouseenter.focal pointerdown pointermove', function(event) {
    //         if (window.location.pathname == '/') {
    //             /*Do nothing. This function will end if the page does not have "index.html" in its URL.
    //             This is intended to prevent unnecessary execution of the following code on
    //             a page that isn't the landing page (index.html).*/
    //         } else {
    //             img.on('mousewheel.focal', function(event) {
    //                 setTimeout( function() {
    //                     event.preventDefault();
    //                     event.stopImmediatePropagation();
    //                 }, 3000);
    //                 $(event.target).panzoom('zoom', event.originalEvent.wheelDelta < 0, {
    //                     increment: 0.01,
    //                     focal: event,
    //                     panOnlyWhenZoomed: false,
    //                     zoom: 0.1,
    //                     minScale: 1,
    //                     maxScale: 1.65,
    //                     // speed: 0.01,
    //                     contain: "invert"
    //                     // easing: "ease-in-out"
    //                 });
    //                 $(event.target).panzoom({
    //                     increment: 0.01,
    //                     focal: event,
    //                     panOnlyWhenZoomed: false,
    //                     zoom: 0.1,
    //                     minScale: 1,
    //                     maxScale: 1.65,
    //                     // speed: 0.01,
    //                     contain: "invert"
    //                     // easing: "ease-in-out"
    //                 });
    //                 // }
    //             });
    //         }
    //     });
    // }, 3000);

    // setTimeout( function() {
    //     $(document).on('click tap taphold scroll swipe', function (event) {
    //         if (window.location.pathname == '/') {
    //             /*Do nothing. This function will end if the page does not have "index.html" in its URL.
    //             This is intended to prevent unnecessary execution of the following code on
    //             a page that isn't the landing page (index.html).*/
    //         } else {
    //             setTimeout( function() {
    //                 event.preventDefault();
    //                 event.stopImmediatePropagation();
    //             }, 3000);
    //             let tagName = $(event.target).prop('tagName');
    //             // console.log("Event target: " + tagName);
    //             if (!(tagName == 'IMG' || tagName == 'PICTURE')) {
    //                 img.panzoom('reset', {
    //                     animate: true
    //                     // "setMatrix": [1, 0, 0, 1, 0, 0]
    //                 });
    //                 if (!($(event.target).hasClass('vectorIcon'))) {
    //                     img.css({
    //                         'transform': 'matrix(1, 0, 0, 1, 0, 0)'
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // }, 0);

/*
    This event handler handles instances when a button related to video playback is selected.
    This handler will retrieve the video and button that have the same matching class names.
    Two resulting actions will occur:
        - The video button will toggle between the play/pause state of the video.
          For example, if the button is pressed while the video is paused, the video will 
          start playing (vice versa).
        - The image and text within the video button will change to be opposite of the 
          play/pause state of the video.
    Heights related to two different instances of paragraph text and/or figure captions 
    will also have their heights set to be the same.

    The handler will execute the following steps (numbered in order):

        1. Create three variables:
            - "getButton" is set to the selected video button.
            - "getButtonClass" is the name extracted from the video button's class attribute.
            - "getVideo" is the corresponding video tag containing the same class name as "getButtonClass".
        
        2. Add a class called "stopAutoPlay" to all videos tagged in "getVideo". This class will 
           stop the automatic playing/pausing of the selected video(s).
        
        3. For each video tagged in "getVideo", if the video is currently paused, play it.
           Otherwise, if the video is playing, pause it.
        
        4. With the adjustParagraphHeight() function, equalize heights of paragraph and/or figure 
           captions depending on the window width.

        5. With the bindVideoEvents() function, change the text and image of the video button 
           to be opposite to the current state of the video (e.g. show the play icon and text 
           for the button when the video is currently paused).

*/
    videoButton.on('click', function() {
        //step 1.
        let getButton = $(this),
            getButtonClass = getButton.attr('class').split(' ')[0],
            getVideo = $('video.' + getButtonClass);
        //step 2.
        getVideo.addClass('stopAutoPlay');
        // console.log('getButtonClass: ' + getButtonClass);
        // console.log('getVideo Length for button: ' + getVideo.length);
        //step 3.
        getVideo.each( function(index) {
            if (getVideo.eq(index).get(0).paused) {
                getVideo.eq(index).get(0).play();
            } else {
                getVideo.eq(index).get(0).pause();
            }
        });
        //step 4.
        adjustParagraphHeight();
        //step 5.
        bindVideoEvents(getVideo, getButton);
    });

/*
    This event handler handles instances when a video is selected.
    This handler will retrieve videos and button that have the same matching class names
    (yes, more than one video can be related to a single video button).
    Two resulting actions will occur:
        - The video button will toggle between the play/pause state of the video(s).
          For example, if the button is pressed while the video(s) is paused, the video(s) 
          will start playing (vice versa).
        - The image and text within the video button will change to be opposite of the 
          play/pause state of the video(s).
    Heights related to two different instances of paragraph text and/or figure captions 
    will also have their heights set to be the same.

    The handler will execute the following steps (numbered in order):

        1. Create three variables:
            - "getVideo" is set to the selected video.
            - "getVideoClass" is the name extracted from the video's class attribute.
            - "getButton" is the selected video button with the same name as "getVideoClass".
            - "getAllVideos" selects all videos with the same class name as "getVideoClass".
        
        2. Add a class called "stopAutoPlay" to all videos tagged in "getallVideos". This class will 
           stop the automatic playing/pausing of the selected video(s).
        
        3. For each video tagged in "getallVideos", if the video is currently paused, play it.
           Otherwise, if the video is playing, pause it.
        
        4. With the adjustParagraphHeight() function, equalize heights of paragraph and/or figure 
           captions depending on the window width.

        5. With the bindVideoEvents() function, change the text and image of the video button 
           to be opposite to the current state of the video(s) (e.g. show the play icon and text 
           for the button when the video(s) is/are currently paused).

*/
    autoplayVideo.on('click', function(event) {
        //step 1.
        let getVideo = $(event.target),
            getVideoClass = getVideo.attr('class').split(' ')[1],
            getButton = $('button[class*="' + getVideoClass + '"]'),
            getAllVideos = $('video[class*="' + getVideoClass + '"]');
        // console.log('getVideo: ' + getVideo);
        // console.log('getVideoClass: ' + getVideoClass);
        // console.log('getButton: ' + getButton);
        //step 2.
        getAllVideos.addClass('stopAutoPlay');
        //step 3.
        getAllVideos.each( function(index) {
            if (getAllVideos.eq(index).get(0).paused) {
                getAllVideos.eq(index).get(0).play();
            } else {
                getAllVideos.eq(index).get(0).pause();
            }
        });
        //step 4.
        adjustParagraphHeight();
        //step 5.
        bindVideoEvents(getAllVideos, getButton);
    });

/*
    preamble: This function is mainly executed on videos and, by default, enables 
    automatic playing/pausing for videos when they are within view.

    The function will execute the following steps (numbered in order):

        1. Create three variables:
            - "navigationBarHeight" is set to the outer height of the container 
              for the main navigation buttons.
            - "topScrollPosition" is set to the top scrollbar position of the window 
              plus the outer height from "navigationBarHeight". This is used to check 
              if the video tag emerges from the bottom of the viewable screen.
            - "viewportHeight" is set to "topScrollPosition" plus the height 
              of the window. This is used to check if the video tag emerges from the 
              bottom of the viewable screen.

        2. For each video, create five more variables:
            - "videoTop" is the value of the top position (relative to the document [the web page]) 
              of the selected video tag corresponding to the "index".
            - "videoBottom" has the same value as "videoTop", but also adds the outer height 
              of the selected video tag. This gets the "bottom position" of the tag.
            - "getVideoClass" extracts the class name from the selected video's class attribute.
            - "getVideo" gets the video tag(s) that has the same class name as "getVideoClass".
            - "getButtonClass" gets the video button that has the same class name as "getVideoClass".
        
        3. If the value of "videoTop" is greater than or equal to "topScrollPosition" and 
           the value of "videoBottom" is less than or equal to "viewportHeight"... 
           in other words the video tag is within view of the screen, check if the selected 
           video tag has the "stopAutoPlay" class. 
            - If it does, do nothing.
            - Otherwise, play the video.With the bindVideoEvents() function, change the 
            corresponding video button to show the option to pause the video.

        4. If the value of "videoTop" does not meet the conditions specified in step 3, pause the 
           video and use the bindVideoEvents() function to change the video buton to show the option 
           to play the video.

*/
    function autoplayVisible() {
        //step 1.
        let navigationBarHeight = navigationBar.outerHeight(true),
            topScrollPosition = $(window).scrollTop() + navigationBarHeight,
            viewportHeight = topScrollPosition + $(window).height();
        // console.log('topScrollPosition: ' + topScrollPosition);
        //step 2.
        autoplayVideo.each( function(index) {
            let videoTop = autoplayVideo.eq(index).offset().top,
                videoBottom = videoTop + autoplayVideo.eq(index).outerHeight(true),
                getVideoClass = autoplayVideo.eq(index).attr('class').split(' ')[1], 
                getVideo = $('video.autoplayVideo.' + getVideoClass),
                getButtonClass = $('button.' + getVideoClass);
            //step 3.
            if (videoTop >= topScrollPosition && videoBottom <= viewportHeight) {
                if (autoplayVideo.eq(index).hasClass('stopAutoPlay')) {
                    // console.log('This video has autoplay stopped.');
                } else {
                    autoplayVideo.eq(index).get(0).play();
                }
                bindVideoEvents(getVideo, getButtonClass);
            //step 4.
            } else {
                autoplayVideo.eq(index).get(0).pause();
                bindVideoEvents(getVideo, getButtonClass);
            }
        });
    }

/*
    preamble:
    This function is mainly executed within other functions when...
        - A video button or video is selected to play/pause the video.
        - One or more videos shown automatically plays or pauses.
    The function takes two arguments as variables referenced from the 
    other function that called this function to alter the appearance of the 
    video button that corresponds to the affected video(s).
        - "vid" is the selected video(s)
        - "vidButton" is the selected video button

    The function will execute the following steps (numbered in order):

        1. If the video doesn't have a corresponding video button 
           (in other words "vidButton" doesn't exist), then skip all 
           of the following steps. The function would do nothing 
           and would stop executing. This is to prevent errors for 
           autoplaying videos that don't have corresponding 
           play/pause buttons.
        
        2. Otherwise, if the video button exists, trigger either of the 
           following event handlers.

           2.1. When one or more videos play, change the image within 
                the video button to a pause icon and change the button 
                text to "Pause Video". If there is more than one video 
                selected, add an s to the button text so that it says 
                "Pause Videos".
        
           2.2. When one or more videos pause, change the image within 
                the video button to a play icon and change the button 
                text to "Play Video". If there is more than one video 
                selected, add an s to the button text so that it says 
                "Play Videos".

*/
    function bindVideoEvents(vid, vidButton) {
        //step 1.
        if (!(vidButton)) {
            // Do nothing if a videoButton doesn't exist, and end this function.
        //step 2.
        } else {
            //step 2.1.
            vid.on('play', function () {
                vidButton.find('img').attr('src', '01-other-images/icons/icon-pause.svg');
                vidButton.find('img').attr('data-src', '01-other-images/icons/icon-pause.svg');
                if (vid.length > 1) {
                    vidButton.find('p').html('Pause Videos');
                } else {
                    vidButton.find('p').html('Pause Video');
                }
            });
            //step 2.2.
            vid.on('pause', function () {
                vidButton.find('img').attr('src', '01-other-images/icons/icon-play.svg');
                vidButton.find('img').attr('data-src', '01-other-images/icons/icon-play.svg');
                if (vid.length > 1) {
                    vidButton.find('p').text('Play Videos');
                } else {
                    vidButton.find('p').text('Play Video');
                }
            });
        }
    }

    // if ($('audio.' + getVideoClass)) {
    //     let getAudio = $('audio.' + getVideoClass);
    //     console.log('getAudio: ' + getAudio);
    //     bindAV(getAudio, getVideo);
    // }

    
    async function playBindedAV(video, audio) {
        try {
            await video.get(0).play();
            await audio.get(0).play();
            audio.get(0).currentTime = video.get(0).currentTime;
        } catch (error) {
            video.get(0).pause();
            audio.get(0).pause();
            audio.get(0).currentTime = video.get(0).currentTime;
            console.log('Trying to play video, but video is still paused.');
        }
    }

    $(document).on('click focus mousedown', function(event) {
        console.log('get tag name: ' + $(event.target).prop('tagName'));
    });

    bindVideoToAudio.each( function(index) {
        let getVideo, 
            getVideoClass, 
            getAudio;
        console.log('bindVideoToAudio length: ' + bindVideoToAudio.length);
        // if bindVideoToAudio.eq(index)
        getVideoClass = bindVideoToAudio.eq(index).attr('class').split(' ')[2],
        getAudio = $('audio.' + getVideoClass);
        console.log('Current video is playing. Class: ' + getVideoClass);
        bindVideoToAudio.eq(index).on('click focus', function() {
            if (bindVideoToAudio.eq(index).paused) {
                getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
                getAudio.get(0).pause();
            } else {
                getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
                getAudio.get(0).play();
            }
        });
        bindVideoToAudio.eq(index).on('seeked', function(event) {
            getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
            if (bindVideoToAudio.eq(index).paused) {
                getAudio.get(0).pause();
            }
            if (bindVideoToAudio.eq(index).playing) {
                getAudio.get(0).play();
            }
        });
        bindVideoToAudio.eq(index).on('waiting loading', function(event) {
            getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
            getAudio.get(0).pause();
        });
        bindVideoToAudio.eq(index).on('pause aborted', function(event) {
            getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
            getAudio.get(0).pause();
        });
        bindVideoToAudio.eq(index).on('playing', function(event) {
            getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
            getAudio.get(0).play();
        });
        // if (bindVideoToAudio.eq(index).paused) {
        //     getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        //     getAudio.get(0).pause();
        // } else {
        //     getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        //     getAudio.get(0).play();
        // }
        // bindVideoToAudio.eq(index).on('playing play', function(event) {
        //     getVideo = $(event.target),
        //     getVideoClass = getVideo.attr('class').split(' ')[2],
        //     getAudio = $('audio.' + getVideoClass);
        //     if (bindVideoToAudio.eq(index).get(0).playing) {
        //         getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        //         getAudio.get(0).play();
        //     }
        // });
        // bindVideoToAudio.eq(index).on('click', function(event) {
        //     console.log('bindVideoToAudio index: ' + index);
        //     getVideo = $(event.target),
        //     getVideoClass = getVideo.attr('class').split(' ')[2],
        //     getAudio = $('audio.' + getVideoClass);
        //     if (bindVideoToAudio.eq(index).get(0).paused) {
        //         // playBindedAV(bindVideoToAudio.eq(index), getAudio);
        //         bindVideoToAudio.eq(index).get(0).play();
        //         getAudio.get(0).play();
        //         getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        //     } else {
        //         bindVideoToAudio.eq(index).get(0).pause();
        //         getAudio.get(0).pause();
        //         getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        //     }
        // });
        // bindVideoToAudio.eq(index).on('waiting stalled', function(event) {
        //     getVideo = $(event.target),
        //     getVideoClass = getVideo.attr('class').split(' ')[2],
        //     getAudio = $('audio.' + getVideoClass);
        //     getAudio.get(0).pause();
        //     getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        // });
        // bindVideoToAudio.eq(index).on('seeked timeupdate', function(event) {
        //     getVideo = $(event.target),
        //     getVideoClass = getVideo.attr('class').split(' ')[2],
        //     getAudio = $('audio.' + getVideoClass);
        //     getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
        // });
    });
    // bindVideoToAudio.on('click focus mousedown', function(event) {
    //     console.log('get tag name: ' + $(event.target).prop('tagName'));
    //     // event.preventDefault(); // Prevent the default behaviour in Firefox
    //     console.log('bindVideoToAudio length: ' + bindVideoToAudio.length);
    //     console.log('binding video to audio');
    //     let getVideo = $(event.target),
    //         getVideoClass = getVideo.attr('class').split(' ')[2],
    //         getAudio = $('audio.' + getVideoClass);
    //     console.log('getVideoClass: ' + getVideoClass + ' getAudio: ' + getAudio);
    //     console.log('getAudio length: ' + getAudio.length);
    //     bindVideoToAudio.each( function(index) {
    //         if (bindVideoToAudio.eq(index).get(0).paused) {
    //             // playBindedAV(bindVideoToAudio.eq(index), getAudio);
    //             bindVideoToAudio.eq(index).get(0).play();
    //             getAudio.get(0).play();
    //             getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
    //         } else {
    //             bindVideoToAudio.eq(index).get(0).pause();
    //             getAudio.get(0).pause();
    //             getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
    //         }
    //     });
    //     // getAudio.each( function(index) {
    //     //     if (bindVideoToAudio.eq(index).get(0).paused) {
    //     //         // playBindedAV(bindVideoToAudio.eq(index), getAudio);
    //     //         // bindVideoToAudio.eq(index).get(0).play();
    //     //         // getAudio.get(0).play();
    //     //         getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
    //     //     } else {
    //     //         // bindVideoToAudio.eq(index).get(0).pause();
    //     //         // getAudio.get(0).pause();
    //     //         getAudio.get(0).currentTime = bindVideoToAudio.eq(index).get(0).currentTime;
    //     //     }
    //     // });
    //     // getAudio.each( function(index) {
    //     // });
    // });
    // function bindAV() {
    // }
    // function bindAV(audio, video) {
    //     video.on('play', function () {
    //         audio.play();
    //     });
    //     video.on('pause', function () {
    //         audio.pause();
    //     });
    // }

    /*
        Unused function for when a video is loaded, playable, paused, or waiting for the 
        rest of the video to load.
    */
    // $('video').each( function(index) {
    //     $('video').eq(index).on('loadstart', function (event) {
    //         $('video').eq(index).addClass('loadingOrBuffering');
    //     });
    //     $('video').eq(index).on('canplay', function (event) {
    //         $('video').eq(index).removeClass('loadingOrBuffering');
    //     });
    //     if (!($('video').eq(index).paused)) {
    //         $('video').eq(index).on('waiting', function () {
    //             $('video').eq(index).addClass('loadingOrBuffering');
    //             let getVideo = $('video').eq(index).children('source').attr('src').substring($('video').eq(index).children('source').attr('src').lastIndexOf('/')+1);
    //             // console.log('The video name ' + getVideo + ' is currently buffering.');
    //         });
    //     }
    //     if (!($('video').eq(index).waiting)) {
    //         $('video').eq(index).removeClass('loadingOrBuffering');
    //     }
    // });
    
/*
    preamble: This function is main executed on all video elements when the window is resized.
    This will re-calculate the height of each video when their width changes.

    The function will execute the following steps (numbered in order):

        1. A for statement that iterates across each video.

        2. Create two variables:
            - "getWidth" is the value set by the video's current width.
            - "estimateHeight" is 0.5625 times the video's current width.
        
        3. With the CSS function, set each video's height equal to "estimateHeight".

*/
    function embedVideoHeight() {
        for (let i = 0; i < video.length; i++) {
            let estimateHeight = video.eq(i).width() * 0.5625;
            if (video.eq(i).parent('figure').find('figcaption').length > -1) {
                estimateHeight = (video.eq(i).width() * 0.5625) + video.eq(i).parent('figure').find('figcaption').height() + 16;
            } else {
                estimateHeight = video.eq(i).width() * 0.5625;
            }
            video.eq(i).css({
                'width': '100%',
                'height': estimateHeight
            });
            video.eq(i).parent('figure').css('height', estimateHeight);
            video.eq(i).parent('figure').css('width', '100%');
            // video.eq(i).parent('figure').css('height', video.eq(i).height());
            // console.log('getWidth: ' + embedVideo.eq(i).width() + ' estimateHeight: ' + embedVideo.eq(i).innerHeight());
        }
    }

/*
    preamble: 
    This function is mainly executed when...
        - the window is resized
        - when scrolling occurs
        - when a video or video button is selected
    Across different width checkpints (450px, 1024px, and 1400px), this function 
    will adjust two or more adjacent body text and/or figure caption containers 
    (as p and figcaption tags) that are grandchildren of elements with the 
    specific class names "gridType#" (# is the number in the class name) and 
    "adjustParagraph" such that both body text and both figure caption tags 
    have the same height.
    
    The function will execute the following steps (numbered in order):

        1. Create four variables, which are initially undefined:
            - "selectedGridType" is set to a container element that has a class name matching "gridType#".
            
            A more detailed explanation of "gridType#".
                - "gridType#" is the naming format for a system of similarly named classes to denote different 
                  grid configurations.
                - These different types of grids are meant to neatly structure the spacing and sizing of 
                  grouped text and images across different screen sizes and to accommodate varying image 
                  sizes and aspect ratios.
                - The difference between the grid configurations depends on the different widths compared 
                  (such as 750px, 1024px, and 1400px) as well as how many columns the grids would provide 
                  (e.g. only one column for smaller screen sizes or two to three columns for larger screen sizes).
                - For a more detailed breakdown of the different grid types, refer to the comments in the testSass.scss file.

            - "gridTypeArray1" An array of strings matching ".gridType#". Each string is meant to be called 
              upon for selecting container elements that have class names matching the string.
              This array is only applicable when the window width is above 1024px and would contain different 
              amounts of class names when above or below 1400px.
            - "gridTypeArray2" is the same as the "gridTypeArray1" variable, except that it is only applicable 
              to paragraph text only and when the window width is between 1024px and 1400px.
            - "gridTypeArray3" is the same as the "gridTypeArray1" variable, except that it is applicable 
              across any window width.
        
        2. With the CSS function, reset the heights of text and figure captions 
           by setting the heights to auto.
        
        3. If the window width is greater than or equal to 1400px, include all strings of ".gridType#"
           with # from 1-7 into "gridTypeArray1".
        
        4. If the window width is between 1024px and 1400px, include all strings of ".gridType#"
           with # from 1-3 into "gridTypeArray1". All ".gridType#" strings with # from 4-7 are set 
           in the second array "gridTypeArray2". For each element matching the class names "gridTypeArray2" 
           and "gridType#" in the second array, find the element with the class name "gridContent" and 
           reset the height of the grandchild body text (p tag).
        
        5. If the window width is between 450px and 1024px, reset the height of all p and figcaption tags 
           within the "gridContent" parent class and the "adjustParagraph" grandparent class.
        
        6. If the window width is less han 450px, perform step 4. except for p tags only, and end the execution 
           of the function.
        
        7. If the first array "gridTypeArray1" exists, iterate across each ".gridType#" string in "gridTypeArray1".
           Each instance is denoted as an index number "i", starting from zero all the way until i is less than the 
           total number of strings in "gridTypeArray1".
           Create the variable "selectedGridType" that is set to any element that has the class names 
           "adjustParagraph" and the corresponding ".gridType#" string, 
            
            7.1. Iterate across each instance of "selectedGridType". Each instance is denoted as a different index number "j", 
                 starting from zero all the way until j is less than the total number of "selectedGridType" instances.
                
            7.2. Create two variables:
                    - "tagArray" is set to a string array, with each string in CSS format to indicate 
                      paragraph and figure caption tags (p and ficaption) within their parent that has 
                      the class "gridContent".
                    - "findElement" would be either the p tag or the figcaption tag specified in "tagArray". 
                      To be technical, it is the element of "selectedGridType" of the current index number "j" and 
                      of "tagArray" of a different index number "k". "k" is the corresponding instance in "tagArray", 
                      starting from zero all the way until k is less than the total string instances in "tagArray".
                
            7.3. With the use of the CSS function, each instance of "findElement" would have their heights reset to default.

            7.4. Since there would be more than one instance of paragraph text and figure caption containers, 
                 iterate across each element instance of the p and/or figcaption tag using another index 
                 variable "l" starting from zero until l is less than half of the total number of p and/or 
                 figcaption tags.
            
            7.5. Create six more variables, the first four reference the "l" index variable for the index number:
                    - "even" is a number of that is used to denote any p/figcaption tag instance that has an
                      even index number.
                    - "odd" is the same as "even" except that it is used to denote odd index numbers.
                    - "getElementEven" is the p/figcaption tag instance that corresponds to the "even" index number.
                    - "getElementOdd" is the p/figcaption tag instance that corresponds to the "odd" index number.
                    - "getElementHeightEven" is set to the height of the p/figcaption tag selected from "getElementEven".
                    - "getElementHeightOdd" is set to the height of the p/figcaption tag selected from "getElementOdd".
                 This is necessary to ensure that the two instances of p/figcaption tags are correctly selected and 
                 make their heights comparable for the next step.
            
            7.6. If the height of the first element (from "getElementHeightEven") is greater than that of the second element 
                 (from "getElementHeightOdd"), use the CSS function to set the second element's height equal to that of the 
                 first element. The converse occurs.
        
        8. If the third array "gridTypeArray3" exists, replicate steps 7. and 7.1.
           Note that because this block of code has similar uses to step 7, less explanation is needed for the specific variables.

            8.1. Create the variable "findParagraph", which is the p tag within the container having the "gridContent" class
                 that is also within the container having the class names "adjustParagraph" and the specific instance of "gridType#" 
                 in the array "gridTypeArray3". The "gridType#" string is denoted in the index variable "i" and its instance 
                 uses the separate index number "j".
            
            8.2. If the width is greater than or equal to 1400px, create a variable named "maxHeight" which is set to zero.
                 Iterate across every p tag specified in "findParagraph". Compare three adjacent instances of the p tag and 
                 get each of their heights. If each instance's height is greater than the current value of "maxHeight", set 
                 the value of "maxHeight" equal to that instances height. Using the CSS function, set all three instances' 
                 height equal to the final value of "maxHeight".
            
            8.3. If the width is between 450px and 1400px, replicate steps 7.5. and 7.6.
            
            8.4. If the width is less than 450px, do nothing.

*/
    function adjustParagraphHeight() {
        //step 1.
        let selectedGridType,
            gridTypeArray1,
            gridTypeArray2,
            gridTypeArray3 = ['.gridType8'];
        //step 2.
        $('.adjustParagraph .gridContent > p', '.adjustParagraph .gridContent > figcaption').css('height', 'auto');
        //step 3.
        if ($(window).width() >= 1400) {
            gridTypeArray1 = ['.gridType1', '.gridType2', '.gridType3', '.gridType4', '.gridType5', '.gridType6', '.gridType7'];
        //step 4.
        } else if (($(window).width() < 1400) && ($(window).width() >= 1024)) {
            gridTypeArray1 = ['.gridType1', '.gridType2', '.gridType3'];
            gridTypeArray2 = ['.gridType4', '.gridType5', '.gridType6', '.gridType7'];
            for (let i = 0; i < gridTypeArray2.length; i++) {
                $('.adjustParagraph' + gridTypeArray2[i]).find('.gridContent > p').css('height', '');
            }
            $('.adjustParagraph .gridContent > p', '.adjustParagraph .gridContent > figcaption').css('height', 'auto');
        //step 5.
        } else if (($(window).width() < 1400) && ($(window).width() >= 450)) {
            $('.adjustParagraph .gridContent > p', '.adjustParagraph .gridContent > figcaption').css('height', 'auto');
        //step 6. (similar to step 4.)
        } else {
            // console.log('Exiting function.');
            $('.adjustParagraph .gridContent > p').css('height', 'auto');
            return;
        }
        //step 7.
        if (gridTypeArray1) {
            for (let i = 0; i < gridTypeArray1.length; i++) {
                selectedGridType = $('.adjustParagraph' + gridTypeArray1[i]);
                //step 7.1.
                for (let j = 0; j < selectedGridType.length; j++) {
                    // console.log('current index: ' + j);
                    // console.log('selectedGridTypeLength: ' + selectedGridType.length);
                    //step 7.2.
                    let tagArray = ['.gridContent > p', '.gridContent > figcaption'],
                        findElement;
                    for (let k = 0; k < tagArray.length; k++) {
                        findElement = selectedGridType.eq(j).find(tagArray[k]);
                        //step 7.3.
                        findElement.css('height', '');
                        // console.log('findElementLength: ' + findElement.length);
                        //step 7.4.
                        for (let l = 0; l < (findElement.length/2); l++) {
                            //step 7.5.
                            let even = 2*l,
                                odd = 2*l + 1,
                                getElementEven = findElement.eq(even),
                                getElementOdd = findElement.eq(odd),
                                getElementHeightEven = getElementEven.height(),
                                getElementHeightOdd = getElementOdd.height();
                            // console.log('even: ' + even + ' getElementHeightEven: ' + getElementHeightEven);
                            // console.log('odd: ' + odd + ' getElementHeightOdd: ' + getElementHeightOdd);
                            //step 7.6.
                            if (getElementHeightEven > getElementHeightOdd) {
                                getElementOdd.css('height', getElementHeightEven);
                            }
                            if (getElementHeightOdd > getElementHeightEven) {
                                getElementEven.css('height', getElementHeightOdd);
                            }
                        }
                    }
                }
            }
        }
        //step 8.
        if (gridTypeArray3) {
            for (let i = 0; i < gridTypeArray3.length; i++) {
                selectedGridType = $('.adjustParagraph' + gridTypeArray3[i]);
                for (let j = 0; j < selectedGridType.length; j++) {
                    // console.log('current index: ' + j);
                    // console.log('selectedGridTypeLength: ' + selectedGridType.length);
                    //step 8.1.
                    let findParagraph = selectedGridType.eq(j).find('.gridContent > p');
                    // console.log('findParagraphLength: ' + findParagraph.length);
                    //step 8.2.
                    if ($(window).width() >= 1400) {
                        let maxHeight = 0;
                        for (let k = 0; k < (findParagraph.length/3); k++) {
                            let first = 3*k,
                                second = 3*k + 1,
                                third = 3*k + 2,
                                array = [first, second, third];
                            // console.log('Array length: ' + array.length);
                            for (let l = 0; l < (array.length); l++) {
                                let getParagraph = findParagraph.eq(l),
                                    getParagraphHeight = getParagraph.height();
                                if (getParagraphHeight > maxHeight) {
                                    maxHeight = getParagraphHeight;
                                }
                            }
                            findParagraph.eq(first).css('height', maxHeight);
                            findParagraph.eq(second).css('height', maxHeight);
                            findParagraph.eq(third).css('height', maxHeight);
                        }
                        maxHeight = 0;
                    //step 8.3. (similar to steps 7.5. and 7.6.)
                    } else if (($(window).width() < 1400) && ($(window).width() >= 450)) {
                        for (let k = 0; k < (findParagraph.length/2); k++) {
                            let first = 2*k,
                                second = 2*k + 1,
                                getParagraphFirst = findParagraph.eq(even),
                                getParagraphSecond = findParagraph.eq(odd),
                                getHeightFirst = getParagraphFirst.height(),
                                getHeightSecond = getParagraphSecond.height();
                            if (getHeightFirst > getHeightSecond) {
                                getParagraphSecond.css('height', getHeightFirst);
                            }
                            if (getHeightSecond > getHeightFirst) {
                                getParagraphFirst.css('height', getHeightSecond);
                            }
                        }
                    //step 8.4.
                    } else {
                        // Do nothing.
                    }
                }
            }
        }
    }

/*
    preamble: This function is mainly executed on at least two specific figures 
    tagged with the class name "adjustImages" when the window is resized or when 
    scrolling occurs. The two adjacent images will have their heights set to the 
    same height as the one of the two images with the greater height.


    The function will execute the following steps (numbered in order):

        1. Iterate across each image tagged with the "adjustImages" class.

        2. Create two variables:
            - "index" is the number set to the corresponding instance of the image tagged with the "adjustImages" class.
            - "getFigures" is set to the picture tags within the figure parent tag. The parent tag is within 
              the corresponding index of the image with the "adjustImages" class.

        3. If there are two or more picture tags and the window width is greater than 1024px, 
           Iterate across all instances of picture tags. Each instance is defined as the index 
           variable "i".

            3.1. Create three variables:
                    - "maxHeight" is set to zero initially, but later changed to the greatest height value from 
                      comparing the heights of the two adjacent picture tags.
                    - "getFigureHeight1" is set to the height of the first of the two picture tags selected.
                    - "getFigureHeight2" is set to the height of the second of the two picture tags selected.
                
            3.2. If the height of the second picture tag is greater than or equal to the height of the second picture tag, 
                 set "maxHeight" equal to the height of the second picture tag. On the contrary, if the height of the 
                 first picture tag is greater than or equal to the height of the second picture tag, set "maxHeight" equal 
                 to the height of the first picture tag. Otherwise, do nothing.

            3.3. With the CSS function, set the height and max height of both adjacent picture tags equal to "maxHeight".

        4. If the window width is less than 1024px, use the CSS function to reset the height and max height of all picture 
           tags.

*/
    function setFigureHeight() {
        // step 1.
        $('.adjustImages').each( function(index) {
            // step 2.
            let getFigures = $('.adjustImages').eq(index).find('figure > picture');
            // console.log('Figure length: ' + getFigures.length);
            // step 3.
            if (getFigures.length >= 2 && $(window).width() > 1024) {
                for (let i = 0; i < getFigures.length-1; i++) {
                    // step 3.1.
                    let maxWidth, 
                        maxHeight, 
                        getFigureWidth1 = getFigures.eq(i).width(),
                        getFigureWidth2 = getFigures.eq(i+1).width(),
                        getFigureHeight1 = getFigures.eq(i).height(),
                        getFigureHeight2 = getFigures.eq(i+1).height();
                    console.log ('getFigureHeight1: ' + getFigureHeight1);
                    console.log ('getFigureHeight2: ' + getFigureHeight2);
                    // step 3.2. UPDATE COMMENT
                    if (getFigureHeight1 <= getFigureHeight2) {
                        maxHeight = getFigureHeight2;
                    } else if (getFigureHeight1 >= getFigureHeight2) {
                        maxHeight = getFigureHeight1;
                    } else {
                        //Do nothing.
                    }
                    if (getFigureWidth1 <= getFigureWidth2) {
                        maxWidth = getFigureWidth1;
                    } else if (getFigureHeight1 >= getFigureWidth2) {
                        maxWidth = getFigureWidth2;
                    } else {
                        //Do nothing.
                    }
                    // step 3.3.
                    getFigures.eq(i).css({
                        'max-width': maxWidth,
                        'max-height': maxHeight,
                        // 'width': maxWidth,
                        // 'width': '100%',
                        // 'height': '100%'
                        'height': maxHeight
                    });
                    getFigures.eq(i+1).css({
                        'max-width': maxWidth,
                        'max-height': maxHeight,
                        // 'width': maxWidth,
                        // 'width': '100%',
                        // 'height': '100%'
                        'height': maxHeight
                    });
                }
                // getFigures.css({
                //     'max-height': maxHeight,
                //     'height': maxHeight
                // });
            // step 4.
            } else if ($(window).width() < 1024) {
                getFigures.css({
                    'max-height': '',
                    'height': ''
                });
                // console.log('Resetted heights.');
            } else {
                // console.log('Nothing happened.');
            }
        });
    }

    // function triggerEagerLoading() {
    //     image.attr('loading', 'eager');
    // }

    // function imageDimensions() {
    //     image.each ( function(index) {
    //         let getImageName,
    //             getImageWidth = image.eq(index).prop('naturalWidth'),
    //             getImageHeight = image.eq(index).prop('naturalHeight');
    //         if (image.eq(index).data('src')) {
    //             getImageName = image.eq(index).data('src').substring(image.eq(index).data('src').lastIndexOf('/')+1);
    //         } else {
    //             getImageName = image.eq(index).attr('src').substring(image.eq(index).attr('src').lastIndexOf('/')+1);
    //         }
    //         function aspectRatioConverter(numerator,denominator){
    //             let gcd = function gcd(a,b){
    //                 return b ? gcd(b, a%b) : a;
    //             };
    //             gcd = gcd(numerator,denominator);
    //             return [numerator/gcd, denominator/gcd];
    //         }                  
    //         console.log('Image name: ' + getImageName + ' Width: ' + getImageWidth + ' Height: ' + getImageHeight + ' Aspect Ratio: ' + aspectRatioConverter(getImageWidth,getImageHeight));
    //     });
    // }

    /*
        UPDATE COMMENT
    */
    function threeDHovering(event, element) {
        // console.log('Image hovering.');
        // console.log('Bounding box: ' + event.target.getBoundingClientRect());
        // console.log('x: ' + (event.clientX - event.target.getBoundingClientRect().left));
        let boundingBox = event.target.getBoundingClientRect(),
            x = event.clientX - boundingBox.left,
            y = event.clientY - boundingBox.top,
            centerX = (boundingBox.width/2),
            centerY = (boundingBox.height/2),
            degrees = 20,
            /*
                The number multipled can be changed depending on how many degrees you want to rotate the image. Be sure to double check the degrees specified in the .scss file.
            */
            offsetX = ((x - centerX)/centerX) * degrees,
            offsetY = ((y - centerY)/centerY) * degrees;
        console.log('Image hovering.');
        console.log('Coordinates (x,y): (' + x + ', ' + y + ')');
        console.log('Offsets. X: ' + x + '%, ' + y + '%');
        element.removeClass('defaultState');
        element.addClass('hoveringState');
        element.css({
            '--rotateX': (-1*offsetY) + 'deg',
            '--rotateY': offsetX + 'deg'
        });
    }

    function setNavSideBarMaxHeight() {
        if ($(window).width() >= 1024) {
            navSideBar.css('max-height', $('.navButtons').outerHeight(true) + $('#toTop').outerHeight(true) + $('#toBottom').outerHeight(true) + 64);
            console.log('Setting max-height on navSideBar: ' + navSideBar.css('max-height'));
        } else {
            // navSideBar.css('max-height', '');
        }
    }
});
"use strict";

let nav = $('nav'),
    navGroup = $('.navGroup'),
    introduction = $('.introduction'),
    workIntro = $('.workIntro'),
    workIntroHeading = $('.workIntro p'),
    stickButtons = $('.stickyButtons'),
    workButton = $('.workButton'),
    designButton = $('#designButton'),
    mediaButton = $('#mediaButton'),
    work = $('.work'),
    design = $('#design'),
    media = $('#media'),
    projectTitle = $('.gridItem .projectTitle'),
    beginning = $('.beginning'),
    navSideBar = $('.navSideBar'),
    anchorLinks = $('.navSideBar a'),
    imageContainer = $('.imageContainer'),
    fixedElements = $('section:first-child', '.caseStudyIntro', '.navSideBar'),
    section = $('.section'),
    content = $('.content'),
    embedResume = $('.embedResume');

    fixedElements.addClass('notransition'); // Disable transitions
    fixedElements.css('padding-top', nav.outerHeight(true) * '1.2');
    fixedElements.offsetHeight; // Trigger a reflow, flushing the CSS changes
    fixedElements.removeClass('notransition'); // Re-enable transitions

$(document).ready(function() {
    let htmlPageName = location.href.split('/').slice(-1),
        pageNameString = htmlPageName.toString().slice(0, -5),
        defaultIndex, temporaryIndex;

    $.mobile.loading('hide'); //Important to hide the odd "loading" text that appears when jQuery mobile is installed.
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        embedResume.hide();
    } else {
        embedResume.show();
    }

    console.log(pageNameString);

    let toCHeight = anchorLinks.last().outerHeight(true);
    console.log('toCHeight: ' + toCHeight);
    $('.tableOfContents::after').css('height', toCHeight);

    $(".seeProcess").on('click', function(event) {
        let hash = this.hash;
        $('html, body').animate({
            scrollTop: parseInt($(hash).offset().top - nav.outerHeight(true))
        }, 250);
    });

    navSideBar.on('mouseenter', function(event) {
        $('.navSideBar *').addClass('hover');
    });

    navSideBar.on('mouseleave', function(event) {
        $('.navSideBar *').removeClass('hover');
    });

    anchorLinks.on('click', function(event) {
        let scrollPosition = $(window).scrollTop(),
            getId = $(this).attr('href').split("#")[1],
            getSectionId = $('#' + getId + ''),
            elementTopPos1 = getSectionId.offset().top - (1.5*nav.outerHeight(true)),
            elementTopPos2 = getSectionId.offset().top - (nav.outerHeight(true)),
            elementBottomPos = getSectionId.offset().top + getSectionId.height() - (1.5*nav.outerHeight(true)),
            getNavId = $('.navSideBar a[href = "#' + getId + '"]'),
            getNavIndex = getNavId.index(),
            sideBarConstant = 2;
        console.log(getSectionId.offset().top);
        $('html, body').animate({
            scrollTop: elementTopPos1
        }, 100);
        for (let i = 0; i < anchorLinks.length; i++) {
            anchorLinks.eq(i).removeClass('navSelected circleSelected');
        }
        $(this).addClass('navSelected circleSelected');
    });

    scrollSpy();
    change1000Width();
    toggleSideBar();
    imageTileHeight();

    $(window).on("resize", function() {
        scrollSpy();
        change1000Width();
        toggleSideBar();
        imageTileHeight();
    });

    $(window).bind('scroll', function() {
        scrollSpy();
        change1000Width();
        toggleSideBar();
    });

    function scrollSpy () {
        let scrollPosition = $(window).scrollTop(),
            section = $('.section');
        section.each( function(index) {
            var elementTopPos = $(this).offset().top - (2*nav.outerHeight(true)),
                elementBottomPos = $(this).offset().top + $(this).height() - (2*nav.outerHeight(true)),
                getId = $(this).attr('id'),
                getNavId = $('.navSideBar ul li a[href = "#' + getId + '"]'),
                getNavIndex = getNavId.attr('data-index');
            if (scrollPosition >= elementTopPos && scrollPosition <= elementBottomPos) {
                anchorLinks.removeClass('navSelected circleSelected');
                getNavId.addClass('navSelected circleSelected');
                console.log('Running.');
                console.log('getNavIndex: ' + getNavIndex);
                if (getNavIndex <= ((anchorLinks.length - 1)/2)) {
                    navSideBar.animate({
                        scrollTop: -1*navSideBar.height()
                    }, 100);
                }
                if (getNavIndex > ((anchorLinks.length - 1)/2)) {
                    navSideBar.animate({
                        scrollTop: navSideBar.height()
                    }, 100);
                }
            }
        });
    }

    function change1000Width() {
        if ($(window).width() <= 750) {
            fixedElements.css('padding-top', 0);
        }
        if ($(window).width() > 750) {
            if ($(window).height() < 450) {
                fixedElements.css('padding-top', nav.outerHeight(true)*1.2);
            }
            if ($(window).height() >= 450) {
                fixedElements.css('padding-top', nav.outerHeight(true));
            }
        }
    }

    function toggleSideBar() {
        if ($(window).width() > 990) {
            navSideBar.show();
        } else {
            navSideBar.hide();
        }
    }

    function toggleWork() {
        if (pageNameString == 'index') {
            work.hide();
            if (designButton.hasClass('selected')) {
                design.show();
            }
            if (mediaButton.hasClass('selected')) {
                media.show();
            }
        } else {
        }
    }

    function imageTileHeight() {
        if ($(window).width() >= 750 && $(window).width() < 1250) {
            var currentMaxHeight = 0;
            for (let i = 0; i < projectTitle.length; i++) {
                let getHeight = projectTitle.eq(i).outerHeight(true);
                if (getHeight > currentMaxHeight) {
                    currentMaxHeight = getHeight;
                }
            }
            if (currentMaxHeight > 72) {
                currentMaxHeight = 72;
            }
            // if (currentMaxHeight < 72) {
            //     currentMaxHeight = 36;
            // }
            console.log(currentMaxHeight);
            projectTitle.css('height', currentMaxHeight);
        }
        if ($(window).width() >= 1250) {
            currentMaxHeight = 36;
            console.log(currentMaxHeight);
            projectTitle.css('height', currentMaxHeight);
        } else {
            currentMaxHeight = 0;
        }
    }
});

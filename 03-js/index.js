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

    $(".seeProcess").on('click', function(event) {
        let hash = this.hash;
        $('html, body').animate({
            scrollTop: parseInt($(hash).offset().top - nav.outerHeight(true))
        }, 250);
    });

    anchorLinks.on('click', function(event) {
        let scrollPosition = $(window).scrollTop(),
            getId = $(this).attr('href').split("#")[1],
            getSectionId = $('#' + getId + ''),
            elementTopPos1 = getSectionId.offset().top - (2*nav.outerHeight(true)),
            elementTopPos2 = getSectionId.offset().top - (nav.outerHeight(true)),
            elementBottomPos = getSectionId.offset().top + getSectionId.height() - (2*nav.outerHeight(true)),
            getNavId = $('.navSideBar a[href = "#' + getId + '"]'),
            getNavIndex = getNavId.index(),
            sideBarConstant = 2;
        console.log(getSectionId.offset().top);
        // console.log('$(this).index(): ' + $(this).index());
        $(this).siblings().removeClass('navSelected');
        $(this).addClass('navSelected');

        // $('html, body').animate({
        //     scrollTop: elementTopPos2
        // }, 100);
        // if (getNavIndex = anchorLinks.length) {
        //     getNavIndex -= 1;
        // }
        // console.log('getNavIndex: ' + (getNavIndex));
        // console.log('anchorLinks.eq(getNavIndex).position().top: ' + anchorLinks.eq(getNavIndex).position().top);
        // navSideBar.animate({
        //     scrollTop: anchorLinks.eq(getNavIndex).offset().top
        // }, 100);

        $('html, body').animate({
            scrollTop: elementTopPos2
        }, 100);
        $(this).find('button').addClass('navSelected').parents().siblings().find('button').removeClass('navSelected');
        event.preventDefault();
        if (pageNameString == 'ElectricStride') {
            sideBarConstant = 2;
        }
        if (scrollPosition >= elementTopPos1 && scrollPosition <= elementBottomPos) {
            if ($(this).index() <= ((anchorLinks.length - 1)/sideBarConstant)) {
                navSideBar.animate({
                    scrollTop: -1*navSideBar.height()
                }, 100);
            }
            if ($(this).index() > ((anchorLinks.length - 1)/sideBarConstant)) {
                navSideBar.animate({
                    scrollTop: navSideBar.height()
                }, 100);
            }
        }
    });

    // workButton.on('click', function(event) {
    //     workButton.removeClass('selected');
    //     $(this).addClass('selected');
    //     toggleWork();
    //     $('html, body').animate({
    //         scrollTop: introduction.offset().top + (1.5*introduction.outerHeight(true))
    //     }, 100);
    // });

    scrollSpy();
    change1000Width();
    toggleSideBar();
    // stickyButtons();
    // toggleWork();

    $(window).on("resize", function() {
        scrollSpy();
        change1000Width();
        toggleSideBar();
        // stickyButtons();
    });

    $(window).bind('scroll', function() {
        // console.log('defaultIndex: ' + defaultIndex);
        scrollSpy();
        change1000Width();
        toggleSideBar();
        // stickyButtons();
    });

    function scrollSpy () {
        let scrollPosition = $(window).scrollTop(),
            section = $('.section');
        // console.log('anchorLinks.length: ' + anchorLinks.length);
        section.each( function(index) {
            var elementTopPos = $(this).offset().top - (2*nav.outerHeight(true)),
                elementBottomPos = $(this).offset().top + $(this).height() - (2*nav.outerHeight(true)),
                getId = $(this).attr('id'),
                getNavId = $('.navSideBar a[href = "#' + getId + '"]'),
                getNavIndex = getNavId.index();
            if (scrollPosition >= elementTopPos && scrollPosition <= elementBottomPos) {
                getNavId.siblings().removeClass('navSelected');
                getNavId.addClass('navSelected');
                console.log('Running.');
                // switch(getNavId.index()) {
                //     case (getNavId.index() < (anchorLinks.length - 1)/2):
                //         break;
                //     case (getNavId.index() < (anchorLinks.length - 1)/2):
                //         break;
                // }
                // console.log('getNavIndex: ' + (getNavIndex));
                // console.log('anchorLinks.eq(getNavIndex).position().top: ' + anchorLinks.eq(getNavIndex).position().top);
                // if (getNavIndex = anchorLinks.length) {
                //     getNavIndex -= 1;
                // }
                // navSideBar.animate({
                //     scrollTop: Math.abs(anchorLinks.eq(getNavIndex).position().top)
                // }, 100);
                if (getNavIndex <= ((anchorLinks.length - 1)/2)) {
                    console.log('getNavIndex: ' + getNavIndex);
                    // console.log('anchorLinks.eq(getNavIndex).position().top: ' + anchorLinks.eq(getNavIndex).position().top);
                    navSideBar.animate({
                        scrollTop: -1*navSideBar.height()
                    }, 100);
                }

                if (getNavIndex > ((anchorLinks.length - 1)/2)) {
                    console.log('getNavIndex: ' + getNavIndex);
                    // console.log('anchorLinks.eq(getNavIndex).position().top: ' + anchorLinks.eq(getNavIndex).position().top);
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
            // embedResume.css('display', 'none');
        }
        if ($(window).width() > 750) {
            if ($(window).height() < 450) {
                fixedElements.css('padding-top', nav.outerHeight(true)*1.2);
            }
            if ($(window).height() >= 450) {
                fixedElements.css('padding-top', nav.outerHeight(true));
            }
            // embedResume.css('display', 'block');
        }
        // if (($(window).width() > 750 && $(window).height() > 650)) {
        //     nav.css({
        //         'position' : 'fixed',
        //         'justify-content' : 'space-between'
        //     });
        // } else {
        //     nav.css({
        //         'position' : 'relative'
        //     });
        // }
    }

    function toggleSideBar() {
        // console.log('Height of beginning element: ' + imageContainer.innerHeight());
        // console.log('Window scroll position: ' + $(window).scrollTop());
        if ($(window).width() > 990) {
            navSideBar.show();
        } else {
            navSideBar.hide();
        }
        // if (navSideBar.css('display') == 'none') {
        //     navButton.css('width', '100%');
        // } else {
        //     navButton.css('width', '72.5%');
        // }
    }

    function stickyButtons() {
        // if (($(window).scrollTop() > (introduction.offset().top + introduction.outerHeight(true))) && ($(window).width() < 750)) {
        // if (pageNameString == 'index') {
        //     if ($(window).scrollTop() >= (introduction.offset().top + introduction.outerHeight(true))) {
        //         if ($(window).height() <=  450) {
        //             if ($(window).width() <= 750) {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '100%'
        //                 });
        //             } else {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '47.5%'
        //                 });
        //             }
        //             nav.css({
        //                 'box-shadow' : '0em 0.1em 2em 0.1em white'
        //             });
        //             work.css({
        //                 'padding-top' : '1.5em'
        //             });
        //             workIntro.css({
        //                 'position' : 'relative',
        //                 'top' : '',
        //                 'left' : '',
        //                 'justify-content' : 'space-between',
        //                 'margin' : '',
        //                 'padding' : '2.5% 0em',
        //                 'width' : 'auto'
        //             });
        //             workIntroHeading.css({
        //                 'margin-left' : ''
        //             });
        //         }
        //         if ($(window).height() >  450) {
        //             if ($(window).width() <= 750) {
        //                 nav.css({
        //                     'box-shadow' : 'none'
        //                 });
        //                 work.css({
        //                     'padding-top' : '25em'
        //                 });
        //                 workIntro.css({
        //                     'position' : 'fixed',
        //                     'top' : '0',
        //                     'left' : '0',
        //                     'justify-content' : 'center',
        //                     'margin' : '0em 0em',
        //                     'padding' : '2.5% 5%',
        //                     'width' : '100%'
        //                 });
        //                 workIntroHeading.css({
        //                     'margin-left' : '',
        //                     'width' : '100%'
        //                 });
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '100%'
        //                 });
        //             } else {
        //                 nav.css({
        //                     'box-shadow' : 'none'
        //                 });
        //                 work.css({
        //                     'padding-top' : '25em'
        //                 });
        //                 workIntro.css({
        //                     'position' : 'fixed',
        //                     'top' : nav.outerHeight(true),
        //                     'left' : '0',
        //                     'justify-content' : 'space-between',
        //                     'margin' : '0em 0em',
        //                     'padding' : '0.5em 0',
        //                     'width' : '100%'
        //                 });
        //                 workIntroHeading.css({
        //                     'margin-left' : '5%',
        //                     'width' : 'auto'
        //                 });
        //                 stickButtons.css({
        //                     'margin-right' : '5%',
        //                     'width' : '42.5%'
        //                 });
        //             }
        //         }
        //     } else {
        //         if ($(window).height() <=  450) {
        //             if ($(window).width() <= 750) {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '100%'
        //                 });
        //             } else {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '47.5%'
        //                 });
        //             }
        //             nav.css({
        //                 'box-shadow' : '0em 0.1em 2em 0.1em white'
        //             });
        //             work.css({
        //                 'padding-top' : '1.5em'
        //             });
        //             workIntro.css({
        //                 'position' : 'relative',
        //                 'top' : '',
        //                 'left' : '',
        //                 'justify-content' : 'space-between',
        //                 'margin' : '',
        //                 'padding' : '2.5% 0em',
        //                 'width' : 'auto'
        //             });
        //             workIntroHeading.css({
        //                 'margin-left' : ''
        //             });
        //         }
        //         if ($(window).height() >  450) {
        //             if ($(window).width() <= 750) {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '100%'
        //                 });
        //             } else {
        //                 stickButtons.css({
        //                     'margin-right' : '',
        //                     'width' : '47.5%'
        //                 });
        //             }
        //             nav.css({
        //                 'box-shadow' : '0em 0.1em 2em 0.1em white'
        //             });
        //             work.css({
        //                 'padding-top' : '1.5em'
        //             });
        //             workIntro.css({
        //                 'position' : 'relative',
        //                 'top' : '',
        //                 'left' : '',
        //                 'justify-content' : 'space-between',
        //                 'margin' : '',
        //                 'padding' : '2.5% 0em',
        //                 'width' : 'auto'
        //             });
        //             workIntroHeading.css({
        //                 'margin-left' : ''
        //             });
                // }
                    // nav.css({
                    //     'box-shadow' : 'none'
                    // });
                    // workIntro.css({
                    //     'position' : 'fixed',
                    //     'top' : '0',
                    //     'left' : '0',
                    //     'justify-content' : 'center',
                    //     'margin' : '0em 0em',
                    //     'padding' : '2.5% 5%',
                    //     'width' : '100%'
                    // });
                    // workIntroHeading.css({
                    //     'margin-left' : '',
                    //     'width' : '100%'
                    // });
        //     }
        // } else {
        //
        // }
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
});
        //         stickButtons.css({
        //             'margin-right' : '',
        //             'width' : '47.5%'
        //         });
        //         nav.css({
        //             'box-shadow' : '0em 0.1em 2em 0.1em white'
        //         });
        //         workIntro.css({
        //             'position' : 'relative',
        //             'top' : '',
        //             'left' : '',
        //             'justify-content' : 'space-between',
        //             'margin' : '',
        //             'padding' : '2.5% 0em',
        //             'width' : 'auto'
        //         });
        //         workIntroHeading.css({
        //             'margin-left' : ''
        //         });
        //     } else {
        //
        //     }
        //     if (($(window).width() <  750) && ($(window).height() >  450)) {
        //         nav.css({
        //             'box-shadow' : 'none'
        //         });
        //         workIntro.css({
        //             'position' : 'fixed',
        //             'top' : '0',
        //             'left' : '0',
        //             'justify-content' : 'center',
        //             'margin' : '0em 0em',
        //             'padding' : '2.5% 5%',
        //             'width' : '100%'
        //         });
        //         workIntroHeading.css({
        //             'margin-left' : '',
        //             'width' : '100%'
        //         });
        //         stickButtons.css({
        //             'margin-right' : '',
        //             'width' : '100%'
        //         });
        //     } else if (($(window).width() >  750) && ($(window).height() >  450)) {
            //         nav.css({
            //             'box-shadow' : 'none'
            //         });
            //         workIntro.css({
            //             'position' : 'fixed',
            //             'top' : nav.outerHeight(true),
            //             'left' : '0',
            //             'justify-content' : 'space-between',
            //             'margin' : '0em 0em',
            //             'padding' : '0 0',
            //             'width' : '100%'
            //         });
            //         workIntroHeading.css({
            //             'margin-left' : '5%',
            //             'width' : 'auto'
            //         });
        //         stickButtons.css({
        //             'margin-right' : '5%',
        //             'width' : '43%'
        //         });
        //     } else {
        //             stickButtons.css({
        //                 'margin-right' : '',
        //                 'width' : '47.5%'
        //             });
        //             nav.css({
        //                 'box-shadow' : '0em 0.1em 2em 0.1em white'
        //             });
        //             workIntro.css({
        //                 'position' : 'relative',
        //                 'top' : '',
        //                 'left' : '',
        //                 'justify-content' : 'space-between',
        //                 'margin' : '',
        //                 'padding' : '2.5% 0em',
        //                 'width' : 'auto'
        //             });
        //             workIntroHeading.css({
        //                 'margin-left' : ''
        //             });
        //         }
        //     }
        // } else {
        //     if ($(window).width() < 750) {
        //         stickButtons.css({
        //             'margin-right' : '',
        //             'width' : '100%'
        //         });
        //     } else {
        //         stickButtons.css({
        //             'margin-right' : '',
        //             'width' : '47.5%'
        //         });
        //     }
        //     nav.css({
        //         'box-shadow' : '0em 0.1em 2em 0.1em white'
        //     });
        //     workIntro.css({
        //         'position' : 'relative',
        //         'top' : '',
        //         'left' : '',
        //         'justify-content' : 'space-between',
        //         'margin' : '',
        //         'padding' : '2.5% 0em',
        //         'width' : 'auto'
        //     });
        //     workIntroHeading.css({
        //         'margin-left' : ''
        //     });
        // }

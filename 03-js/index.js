    "use strict";

$(document).ready(function() {
    let nav = $('nav'),
        navGroup = $('.navGroup'),
        introduction = $('.introduction'),
        workIntro = $('.workIntro'),
        workIntroHeading = $('.workIntro p'),
        stickButtons = $('.stickyButtons'),
        projectButton = $('button.projectButton'),
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
        figure = $('figure'),
        imageContainer = $('.imageContainer'),
        fixedElements = $('section:first-child', '.caseStudyIntro', '.navSideBar'),
        section = $('.section'),
        content = $('.content'),
        changeSpan1 = $('.changeSpan1'),
        changeSpan2 = $('.changeSpan2'),
        changeSpan3 = $('.changeSpan3'),
        embedResume = $('.embedResume'),
        video = $('video'),
        videoButton = $('.playVideo'),
        navIndex = 0,
        videoGallery = $('.videoGallery'),
        autoplayVideo = $('.autoplayVideo'),
        // videoGalTile = $('.videoGallery .gifTile'),
        videoImageContainer = $('.videoGallery .imageContainer'),
        highlight = $('.highlight'),
        gridItem = $('.gridItem.workGallery'),
        criteria = $('.criteria'),
        gSlides = $('.gSlides'),
        equivHeight = $('.equivHeight');

        fixedElements.addClass('notransition'); // Disable transitions
        fixedElements.css('padding-top', nav.outerHeight(true) * '1.2');
        fixedElements.offsetHeight; // Trigger a reflow, flushing the CSS changes
        fixedElements.removeClass('notransition'); // Re-enable transitions

    let htmlPageName = location.href.split('/').slice(-1),
        pageNameString = htmlPageName.toString().slice(0, -5),
        defaultIndex, temporaryIndex;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        embedResume.hide();
    } else {
        embedResume.show();
    }

    // console.log(pageNameString);

    // let toCHeight = anchorLinks.last().outerHeight(true);
    // console.log('toCHeight: ' + toCHeight);
    // $('.tableOfContents::after').css('height', toCHeight);

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
            sideBarConstant = 2,
            getDataIndex = $(this).attr('data-index');
        navIndex = getDataIndex;
        // console.log(getSectionId.offset().top);
        scrollSpy();
        $('html, body').animate({
            scrollTop: elementTopPos1
        }, 300);
        for (let i = 0; i < anchorLinks.length; i++) {
            anchorLinks.eq(i).removeClass('navSelected circleSelected');
        }
        $(this).addClass('navSelected circleSelected');

        return navIndex;
    });

    videoButton.on('click', function(event) {
        let getClass = $(this).attr('class').split(' ')[0],
            getVideoClass = $('video').attr('class').split(' ')[1],
            getVideo = $('.autoplayVideo.' + getClass);

            // console.log(getClass);
            // console.log(getVideoClass);
            // console.log(getVideo);
            $('.autoplayVideo.' + getClass).toggleClass('playing');
            getVideo.each( function(index) {
                if (getVideo[index].paused) {
                    getVideo.addClass('playing');
                    getVideo[index].play();
                } else {
                    getVideo.removeClass('playing');
                    getVideo[index].pause();
                }
            });
            if ($('.autoplayVideo.' + getClass).hasClass('playing')) {
                if (getVideo.length > 1) {
                    $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Videos');
                } else {
                    $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Video');
                }
            } else {
                if (getVideo.length > 1) {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
                } else {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
                }
            }
        // if ($('.autoplayVideo.' + getClass).hasClass('playing')) {
        //     console.log('Clicked play video.');
        //     console.log($(this).text());
        //     console.log(getVideo.length);
        //     // let newText = $(this).text().replace("Play Video", "Pause Video");
        //     if (getVideo.length > 1) {
        //         $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Videos');
        //     } else {
        //         $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Video');
        //     }
        //     getVideo.each( function(index) {
        //         getVideo[index].play();
        //     });
        //     // getVideo.play();
        //     // getVideo[0].trigger('play');
        // } else {
        //     console.log('Clicked pause video.');
        //     console.log($(this).text());
        //     console.log(getVideo.length);
        //     // let newText = $(this).text().replace("Pause Video", "Play Video");
        //     if (getVideo.length > 1) {
        //         $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
        //     } else {
        //         $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
        //     }
        //     getVideo.each( function(index) {
        //         getVideo[index].pause();
        //     });
        //     // getVideo[0].trigger('pause');
        // }

        // getVideo.each( function(index) {
        //     if (getVideo[index].paused) {
        //         $('.autoplayVideo.' + getClass).addClass('playing');
                // console.log('Clicked pause video.');
                // console.log($(this).text());
                // console.log(getVideo.length);
                // let newText = $(this).text().replace("Pause Video", "Play Video");
                // if (getVideo.length > 1) {
                //     $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
                // } else {
                //     $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
                // }
            //     getVideo[index].play();
            // } else {
            //     $('.autoplayVideo.' + getClass).removeClass('playing');
                // console.log('Clicked play video.');
                // console.log($(this).text());
                // console.log(getVideo.length);
                // let newText = $(this).text().replace("Play Video", "Pause Video");
                // if (getVideo.length > 1) {
                //     $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Videos');
                // } else {
                //     $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Video');
                // }
                // getVideo[index].pause();
                // if (getVideo.length > 1) {
                //     $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
                // } else {
                //     $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
                // }
        //     }
        // });
        //
        // if ($('.autoplayVideo.' + getClass).hasClass('playing')) {
        //     if (getVideo.length > 1) {
        //         $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Videos');
        //     } else {
        //         $(this).html('<img src="mediaFiles/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Video');
        //     }
        // } else {
        //     if (getVideo.length > 1) {
        //         $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
        //     } else {
        //         $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
        //     }
        // }
    });

    scrollSpy();
    changeByWidth();
    showHide();
    gridItemHeight1();
    gridItemHeight2();
    scrollNavBar();
    highlightVisible();
    centerLastElement();
    // checkVideoPlaying();
    // imageTileHeight();

    $(window).on('resize', function() {
        scrollSpy();
        changeByWidth();
        showHide();
        gridItemHeight1();
        gridItemHeight2();
        scrollNavBar();
        highlightVisible();
        centerLastElement();
        // checkVideoPlaying();
        // imageTileHeight();
    });

    $(window).bind('scroll', function() {
        scrollSpy();
        changeByWidth();
        showHide();
        gridItemHeight1();
        gridItemHeight2();
        highlightVisible();
        centerLastElement();
        // checkVideoPlaying();
        // scrollNavBar();
    });

    function scrollSpy () {
        let section = $('.section'),
            getNavIndex;
        section.each( function(index) {
            let scrollPosition = $(window).scrollTop(),
                elementTopPos = $(this).offset().top - (2*nav.outerHeight(true)),
                elementBottomPos = $(this).offset().top + $(this).height() - (2*nav.outerHeight(true));

            if (scrollPosition > elementTopPos) {
                let getId = $(this).attr('id'),
                    getNavId = $('.navSideBar ul li a[href = "#' + getId + '"]');
                getNavIndex = getNavId.attr('data-index');
                anchorLinks.removeClass('navSelected circleSelected');
                getNavId.addClass('navSelected circleSelected');
                // console.log('Running.');
                // console.log('getNavIndex: ' + getNavIndex);
                navIndex = getNavIndex;
           }
        });
        return navIndex;
    }

    function changeByWidth() {
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
        if ($(window).width() <= 750) {
            changeSpan1.addClass('span2');
        } else {
            changeSpan1.removeClass('span2');
        }
        if ($(window).width() <= 1400) {
            changeSpan2.addClass('span2');
        } else {
            changeSpan2.removeClass('span2');
        }
        if ($(window).width() <= 1000) {
            changeSpan3.addClass('span3');
        } else {
            changeSpan3.removeClass('span3');
        }
    }

    function showHide() {
        if ($(window).width() > 1000) {
            navSideBar.show();
            projectButton.hide();
        } else {
            navSideBar.hide();
            projectButton.show();
            projectButton.css('display', 'block');
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
        }
    }

    function imageTileHeight() {
        // if (pageNameString == 'media') {
            if ($(window).width() >= 750) {
                var currentMaxHeight = 0;
                for (let i = 0; i < projectTitle.length; i++) {
                    let getHeight = projectTitle.eq(i).outerHeight(true);
                    if (getHeight > currentMaxHeight) {
                        currentMaxHeight = getHeight;
                    }
                    // if (i == projectTitle.length-1 && currentMaxHeight > getHeight) {
                    //     currentMaxHeight = getHeight;
                    // }
                }
                if (currentMaxHeight > 72) {
                    currentMaxHeight = 72;
                }
                if ($(window).width() >= 1200) {
                    currentMaxHeight = 36;
                }
                // if (currentMaxHeight < 72) {
                //     currentMaxHeight = 36;
                // }
                projectTitle.css('height', currentMaxHeight);
                $('.projectTitle.design').css('height', '90px');
                // console.log(currentMaxHeight);
            }
            if ($(window).width() >= 750) {
                $('.projectTitle.design').css('height', '72px');
                // console.log(currentMaxHeight);
            }
            // if ($(window).width() >= 1100 && currentMaxHeight < 72) {
            //     currentMaxHeight = 72;
            // } else if ($(window).width() >= 1100 && currentMaxHeight >= 72) {
            //     currentMaxHeight = 72;
            // } else {
            //     currentMaxHeight = 72;
            // }
            // console.log(currentMaxHeight);
            // projectTitle.css('height', currentMaxHeight);
        // }
    }

    function lineHeight() {
        let lineHeight = 0;
        for (let i = 0; i < anchorLinks.length; i++) {
            if (i == 0 || i == anchorLinks.length - 1) {
                lineHeight += (anchorLinks.eq(i).outerHeight/2);
            } else {
                lineHeight += anchorLinks.eq(i).outerHeight;
            }
        }
        // console.log('lineHeight: ' + lineHeight);
        $('.tableOfContents::after, .tableOfContents:after').css('height', lineHeight);
    }

    function gridItemHeight1() {
        $('.imageGroup figure:nth-of-type(even) img').css('height', $('.imageGroup figure:nth-of-type(odd) img').outerHeight(true));
        if ($(window).width() >= 750) {
            for (let i = 0; i < videoGallery.length; i++) {
                let videoGalTile = videoGallery.eq(i).children('.gifTile'),
                    even,
                    odd;
                // console.log('videoGallery length: ' + videoGallery.length);
                // console.log('videoGifTile length: ' + videoGalTile.length);
                for (let i = (videoGalTile.length - 1)/2; i > 0; i--) {
                    if (videoGalTile.length <= 2) {
                        even = 0;
                        odd = 1;
                    } else {
                        if (videoGalTile.length % 2 == 1) {
                            even = 2*i,
                            odd = 2*i - 1;
                        } else {
                            even = 2*i - 1,
                            odd = 2*i;
                        }
                    }
                    if (videoGalTile.length >= 2 && videoGalTile.length % 2 == 1 && odd == 1) {
                        videoGalTile.eq(0).find('figcaption i').css('height', 'auto');
                        videoGalTile.eq(0).find('p.category').css('height', 'auto');
                    } else {
                        let figheight1 = videoGalTile.eq(even).find('figcaption i').outerHeight(true),
                            pheight1 = videoGalTile.eq(even).find('p.category').outerHeight(true),
                            figheight2 = videoGalTile.eq(odd).find('figcaption i').outerHeight(true),
                            pheight2 = videoGalTile.eq(odd).find('p.category').outerHeight(true);
                        // console.log('odd: ' + odd + ' even: ' + even);
                        if (figheight1 >= figheight2) {
                            // console.log('true');
                            videoGalTile.eq(odd).find('figcaption i').css('height', figheight1);
                        } else {
                            videoGalTile.eq(even).find('figcaption i').css('height', figheight2);
                        }
                        if (pheight1 >= pheight2) {
                            // console.log('true');
                            videoGalTile.eq(odd).find('p.category').css('height', pheight1);
                        } else {
                            videoGalTile.eq(even).find('p.category').css('height', pheight2);
                        }
                    }
                }
            }
        } else {
            $('.videoGallery .gifTile .category, .videoGallery .gifTile figcaption i').css('height', 'auto');
        }
        if ($(window).width() >= 750) {
            for (let i = 0; i < figure.length; i++) {
                let imageTile = figure.eq(i).children('.backgroundImage.changeImg'),
                    even,
                    odd;
                if (imageTile.length <= 1) {
                    imageTile.css('height', 'auto');
                } else if (imageTile.length == 2) {
                    even = 0;
                    odd = 1;
                } else {
                    for (let i = (imageTile.length - 1)/2; i > 0; i--) {
                        if (imageTile.length % 2 == 1) {
                            even = 2*i,
                            odd = 2*i - 1;
                        } else {
                            even = 2*i - 1,
                            odd = 2*i;
                        }
                    }
                }
                if (imageTile.length > 2 && imageTile.length % 2 == 1 && odd == 1) {
                    imageTile.eq(0).css('height', 'auto');
                } else {
                    let height1 = imageTile.eq(even).outerHeight(true),
                        height2 = imageTile.eq(odd).outerHeight(true);
                    if (height1 >= height2) {
                    // console.log('true');
                        imageTile.eq(odd).css('height', height1);
                    } else {
                        imageTile.eq(even).css('height', height2);
                    }
                }
            }
            $('#journeyMap2').css('height', $('#journeyMap1').outerHeight(true));
            // console.log(equivHeight.length);
            for (let i = (equivHeight.length - 1)/2; i > 0; i--) {
                let even = 2*i - 1,
                    odd = 2*i;
                equivHeight.eq(even).css('height', equivHeight.eq(odd).outerHeight(true));
            }
        } else {
            $('#journeyMap2, figure .backgroundImage.changeImg').css('height', 'auto');
            equivHeight.css('height', 'auto');
        }
            // $('figure .backgroundImage:nth-of-type(odd)').css('height', $('figure .backgroundImage:nth-of-type(even)').outerHeight(true));
            // $('figure .backgroundImage:last-of-type').css('height', 'auto');
        // $('.gifTile:nth-of-type(1) .caption figcaption').css('height', $('.gifTile:nth-of-type(2) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(1) p').css('height', $('.gifTile:nth-of-type(2) p').outerHeight(true));
        // $('.gifTile:nth-of-type(3) .caption figcaption').css('height', $('.gifTile:nth-of-type(4) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(3) p').css('height', $('.gifTile:nth-of-type(4) p').outerHeight(true));
        // $('.gifTile:nth-of-type(5) .caption figcaption').css('height', $('.gifTile:nth-of-type(6) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(5) p').css('height', $('.gifTile:nth-of-type(6) p').outerHeight(true));
    }

    function gridItemHeight2() {
        if ($(window).width() >= 750) {
            let even, odd;
            for (let i = (videoImageContainer.length - 1)/2; i > 0; i--) {
                if (videoGalTile.length <= 2) {
                    even = 0;
                    odd = 1;
                } else {
                    if (videoGalTile.length % 2 == 1) {
                        even = 2*i,
                        odd = 2*i - 1;
                    } else {
                        even = 2*i - 1,
                        odd = 2*i;
                    }
                }
                if (videoGalTile.length % 2 == 1 && odd == 1) {
                    videoGalTile.eq(0).find('figcaption i').css('height', 'auto');
                    videoGalTile.eq(0).find('p.category').css('height', 'auto');
                } else {
                    let figheight1 = videoGalTile.eq(even).find('figcaption i').outerHeight(true),
                        pheight1 = videoGalTile.eq(even).find('p.category').outerHeight(true),
                        figheight2 = videoGalTile.eq(odd).find('figcaption i').outerHeight(true),
                        pheight2 = videoGalTile.eq(odd).find('p.category').outerHeight(true);
                    if (figheight1 >= figheight2) {
                        // console.log('true');
                        videoGalTile.eq(odd).find('figcaption i').css('height', figheight1);
                    } else {
                        videoGalTile.eq(even).find('figcaption i').css('height', figheight2);
                    }
                    if (pheight1 >= pheight2) {
                        // console.log('true');
                        videoGalTile.eq(odd).find('p.category').css('height', pheight1);
                    } else {
                        videoGalTile.eq(even).find('p.category').css('height', pheight2);
                    }
                }
            }
        } else {
            $('.videoGallery .imageContainer figcaption i, .imageContainer .videoGallery .gifTile figcaption i, .gifTile p.category').css('height', 'auto');
        }
        for (let i = 0; i < gSlides.length; i++) {
            let gSlidesWidth = gSlides.eq(i).outerWidth(true);
            gSlides.eq(i).css('height', 0.597*gSlidesWidth);
        }
        //     for (let i = 0; i < (videoImageContainer.length - 1)/2; i++) {
        //         let even = 2*i,
        //             odd = 2*i + 1,
        //             figheight1 = videoImageContainer.eq(even).find('figcaption i').outerHeight(true),
        //             figheight2 = videoImageContainer.eq(odd).find('figcaption i').outerHeight(true);
        //         // console.log('odd: ' + odd + ' even: ' + even);
        //         if (figheight1 >= figheight2) {
        //             // console.log('true');
        //             videoImageContainer.eq(odd).find('figcaption i').css('height', figheight1);
        //         } else {
        //             videoImageContainer.eq(even).find('figcaption i').css('height', figheight2);
        //         }
        //     }
        // }
        // $('.gifTile:nth-of-type(1) .caption figcaption').css('height', $('.gifTile:nth-of-type(2) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(1) p').css('height', $('.gifTile:nth-of-type(2) p').outerHeight(true));
        // $('.gifTile:nth-of-type(3) .caption figcaption').css('height', $('.gifTile:nth-of-type(4) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(3) p').css('height', $('.gifTile:nth-of-type(4) p').outerHeight(true));
        // $('.gifTile:nth-of-type(5) .caption figcaption').css('height', $('.gifTile:nth-of-type(6) .caption figcaption').outerHeight(true));
        // $('.gifTile:nth-of-type(5) p').css('height', $('.gifTile:nth-of-type(6) p').outerHeight(true));
    }

    function scrollNavBar () {
        if (navIndex <= ((anchorLinks.length - 1)/2)) {
           navSideBar.animate({
               scrollTop: -1*navSideBar.height()
           }, 300);
        } else {
            navSideBar.animate({
               scrollTop: navSideBar.height()
           }, 300);
        }
    }

    function checkVideoPlaying() {
        for (let i = 0; i < autoplayVideo.length; i++) {
            // console.log('autoplayVideo length: ' + autoplayVideo.length);
            let getButton = autoplayVideo.eq(i).siblings('figcaption').children('.playVideo'),
                getClass = getButton.attr('class').split(' ')[0],
                getVideoClass = $('video').attr('class').split(' ')[1],
                getVideo = $('.autoplayVideo.' + getClass);

            // console.log(getClass);
            // console.log(getVideoClass);
            // console.log(getVideo);
            getVideo.each( function(index) {
                if (getVideo[index].paused) {
                    getVideo.addClass('playing');
                    getVideo[index].play();
                } else {
                    getVideo.removeClass('playing');
                    getVideo[index].pause();
                }
            });
            if ($('.autoplayVideo.' + getClass).hasClass('playing')) {
                if (getVideo.length > 1) {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Videos');
                } else {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/pauseIcon.png" alt="Pause Button" class="vidControlIcon">Pause Video');
                }
            } else {
                if (getVideo.length > 1) {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Videos');
                } else {
                    $(this).html('<img src="https://res.cloudinary.com/waynephung/image/upload/c_scale,dpr_auto,f_auto,q_100,w_75/v1572331951/images/playIcon.png" alt="Play Button" class="vidControlIcon">Play Video');
                }
            }
        }
    }

    function highlightVisible () {
        //Check each element with class name '.highlight' relative to viewport. If such elements are visible in the viewport, enable highlighting.
        highlight.each( function(index) {
            let topScrollPosition = $(window).scrollTop(),
                viewportHeight = topScrollPosition + $(window).height(),
                highlightTopPosition = highlight.eq(index).offset().top,
                highlightBottomPosition = highlightTopPosition + highlight.eq(index).outerHeight(true);
            if (highlightTopPosition >= topScrollPosition && highlightBottomPosition <= viewportHeight) {
                highlight.eq(index).addClass('shown');
                // console.log('Highlight shown.');
            } else {
                highlight.eq(index).removeClass('shown');
                // console.log('Highlight hidden.');
            }
        });
    }

    function centerLastElement() {
        if ($(window).width() >= 1000 && gridItem.length % 2 == 1) {
            $('.gridItem.workGallery:last-of-type').last().css('margin', 'auto');
        } else {
            // $('.gridItem.workGallery:last-of-type').last().css('margin', 'inherit');
        }
        if ($(window).width() >= 1000 && criteria.length % 2 == 1) {
            $('.criteria:last-of-type').css('margin', '0em auto 3em auto');
            $('.criteria:last-of-type *').css('width', $('.criteria:nth-last-child(2)').outerWidth(true));
        } else {
            $('.criteria:last-of-type, .criteria:last-of-type *').css('margin', 'auto');
        }
    }

    $.mobile.loading('hide'); //Important to hide the odd "loading" text that appears when jQuery Mobile is installed.
});

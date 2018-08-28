"use strict";

$(document).ready(function() {
    // ----------------------- VARIABLE DECLARATIONS HERE -----------------------

    /* List of variable declarations that specify classes and IDs of elements
       within the body for index.html.*/

       let scrollProgressBar = $('.scrollProgressBar'),
           fullPage = $('.fullPage'),
           section = $('section'),
           leftArrow = $('.leftArrow'),
           rightArrow = $('.rightArrow'),
           mainArrow = $('#mainArrow'),
           work = $('#work'),
           workGallery = $('.workGallery'),
           gridItem = $('.gridItem'),
           // workGallery = $('.workGallery'),
           // gridBlock = $('.gridBlock'),
           // galleryFilter = $('.galleryFilter'),
           // filterContainer = $('.filtr-container'),
           // workGridItem = $('.workGridItem'),
           workImage = $('.workImage'),
           workGridText = $('.workGridText'),
           paddingContainer = $('.paddingContainer'),
           workNav = $('#workNav'),
           filterItem = $('.filterItem'),
           filter = $('.filter'),
           workBackButton = $('.workBackButton'),
           menu = $('.menu'),
           workLink = $('.workLink')
           // allFilter = $('#allFilter'),
           // shuffleFilter = $('#shuffleFilter');
       ;

       /* List of variable declarations for project.html.*/

        let introGrid = $('.introGrid'),
            projectSpacing = $('.projectSpacing'),
            navigation = $('.navigation'),
            tabSection = $('.tabSection'),
            left = $('.left'),
            right = $('.right'),
            tab = $('.tab'),
            projectMenu = $('#projectMenu'),
            mainMenu = $('.mainMenu');

   // --------------------- END OF VARIABLE DECLARATIONS ----------------------


   // ----------------------- INTERACTIVE EFFECTS HERE ------------------------

   console.log('fullPage width: ' + fullPage.outerWidth() + ' sectionWidth: ' + section.outerWidth());
   // localStorage.clear();
   let htmlPageName = location.href.split('/').slice(-1),
       pageNameString = htmlPageName.toString(),
       indexArray = retrieveIndexArray(),
       defaultIndex;
   console.log(pageNameString);
   console.log(indexArray);
   if (pageNameString == null || pageNameString == '') {
       console.log('pageNameString undefined, changed to index.html.');
       // pageNameString = 'index.html';
       if (defaultIndex == null) {
           console.log('defaultIndex undefined, changed to 0.');
         defaultIndex = getIndex('index.html', indexArray);
       }
   } else {
       defaultIndex = getIndex(pageNameString, indexArray);
   }

  console.log('Default Index: ' + defaultIndex);
   if (defaultIndex == null) {
       console.log('Default index undefined, changed to 0.');
       defaultIndex = 0;
   }
  console.log('Default Index: ' + defaultIndex);

   function retrieveIndexArray() {
       if (localStorage.currentIndex) {
           let getIndexArray = JSON.parse(JSON.stringify(localStorage.getItem('currentIndex')));
           console.log('Index array: ' + getIndexArray);
           let convertArray = JSON.parse(getIndexArray);
           console.log('Convert array: ' + convertArray);
           return convertArray;
       } else if (typeof(Storage) !== 'undefined') {
           let indices = {
               'indexHtml' : '0',
               'projectHtml' : '0'
           };
           console.log(indices);
           localStorage.setItem('currentIndex', JSON.stringify(indices));
           let getIndexArray = JSON.parse(JSON.stringify(localStorage.getItem('currentIndex')));
           console.log('Index array: ' + getIndexArray);
           let convertArray = JSON.parse(getIndexArray);
           console.log(convertArray);
           return convertArray;
       } else {
           console.log('Current index not retrieved. Sorry, your browser does not support Web Storage for localStorage...');
       }
   }

   function storeDefaultIndex(pageString, index) {
       let getIndexArray = JSON.parse(localStorage.getItem('currentIndex')),
           stringify = JSON.stringify(getIndexArray);
       // console.log('stringify: ' + stringify);
           pageNameString = pageString;
       let changedArray = changeIndexArray(pageNameString, index);
       localStorage.setItem('currentIndex', changedArray);
       console.log('Stored index: ' + localStorage.getItem('currentIndex'));
   }

   function changeIndexArray (pageName, index) {
       let getIndexArray = JSON.parse(localStorage.getItem('currentIndex')),
           stringify = JSON.stringify(getIndexArray);
       // console.log('stringify: ' + stringify);
       switch (pageName) {
           case 'index.html':
                getIndexArray.indexHtml = index.toString();
           break;
           case 'project.html':
                getIndexArray.projectHtml = index.toString();
           break;
           case undefined:
                getIndexArray.indexHtml = index.toString();
           break;
       }
       getIndexArray = JSON.stringify(getIndexArray);
       return getIndexArray;
   }

   function getIndex (pageName, array) {
       let getIndex;
       switch (pageName) {
           case 'index.html':
                getIndex = parseInt(array.indexHtml);
           break;
           case 'project.html':
                getIndex = parseInt(array.projectHtml);
           break;
           case undefined:
                getIndex = parseInt(array.indexHtml);
           break;
       }
       return getIndex;
   }

   scrolling(defaultIndex);
   leftArrow.on('click', previousTab);
   rightArrow.on('click', nextTab);
   mainArrow.on('click', toggleMainArrow);
   workPaddingBottom();

   function toggleMainArrow() {
       mainArrow.css('translate', (defaultIndex > 0) ? 'translateX(100vw)' : 'translateX(0)');
   }

  let scrollHeight = 0;
   $(document).keyup(function(e) {
   switch(e.which) {

       // case 33: //pg up
       //     scrollUp(scrollHeight, 6);
       // break;
       //
       // case 34: //pg dn
       //     scrollDown(scrollHeight, 6);
       // break;

       case 37: // left
           previousTab();
       break;

       // case 38: //up
       //     scrollUp(scrollHeight, 3);
       // break;

       case 39: //right
           nextTab();
       break;

       // case 40: //down
       //     scrollDown(scrollHeight, 3);
       // break;

       default: return; // exit this handler for other keys
       }
       event.stopImmediatePropagation();
       // e.preventDefault(); // prevent the default action (scroll / move caret)
   });

   let lastScrollLeft = 0;
    // $(window).scroll(function() {
    //     let getScrollLeft = section.eq(defaultIndex).outerWidth(),
    //         bodyWidth = fullPage.outerWidth() * (section.length - 1),
    //         distanceWidth = getScrollLeft/bodyWidth * 100;
    //     console.log('getScrollLeft: ' + getScrollLeft + ' bodyWidth: ' + bodyWidth + ' distanceWidth: ' + distanceWidth);
    //
    //     if (lastScrollLeft < getScrollLeft && distanceWidth >= 20) {
    //         nextTab();
    //     }
    //     if (lastScrollLeft > getScrollLeft && distanceWidth >= 20) {
    //         previousTab();
    //     }
    // });

    // work.on('scroll', function(){
    //     console.log('Window scrollTop: ' + $(this).scrollTop() + ' Filter top: ' + galleryFilter.offset().top + galleryFilter.outerHeight(true));
    //     // stickyNav();
    // });

    filter.on('click', function() {
        workPaddingBottom();
    });

   let resizeResponse, interval = 300;
   $(window).resize(function() {
       resizeResponse = setTimeout( function () {
           if (defaultIndex != 0 && defaultIndex < section.length) {
               console.log('Window resized.');
               scrolling(defaultIndex);
           }
       }, interval);
       // checkBrowserWidth();
       workPaddingBottom();
       projectPaddingBottom();
   });

  //  function checkBrowserWidth () {
  //      if ($(window).width() <= 600) {
  //          let options = { filterOutCss: {width: '0'}, filterInCss: {width: '100%'}}
  //          filterWorkGallery.filterizr('setOptions', options);
  //      }
  //  }
  // checkBrowserWidth();

    $.event.special.swipe.horizontalDistanceThreshold = 100;
    section.on("swipeleft", function() {
       // if ($.event.special.swipe.horizontalDistanceThreshold > 60) {
           nextTab();
           console.log('Swiped left.');
       // }
    });
    section.on("swiperight", function() {
       // if ($.event.special.swipe.horizontalDistanceThreshold > 60) {
           previousTab();
           console.log('Swiped right.');
       // }
    });

    left.on('click', previousTab);
    right.on('click', nextTab);
    tab.on('click', changeTab);

   function previousTab() {
       if (defaultIndex == 0 && defaultIndex - 1 < 0) {
           // Do nothing.
       } else {
           defaultIndex -= 1;
           scrolling(defaultIndex);
       }
   }

   function nextTab() {
       if (defaultIndex == section.length - 1 && defaultIndex + 1 >= section.length) {
           // Do nothing.
       } else {
           defaultIndex += 1;
           scrolling(defaultIndex);
       }
   }

   function changeTab () {
       let getDataIndex = parseInt($(this).attr('data-index'));
       console.log('Extracted index: ' + getDataIndex);
       defaultIndex = getDataIndex;
       console.log('Default Index: ' + defaultIndex);
       scrolling(defaultIndex);
       console.log('Clicked tab.');
       // $('#flexMenu').animate({'scrollLeft': $(".tabItem").eq(defaultIndex)});
   }

   function scrolling (index) {
       toggleMainArrow();
       changeIndex(index);
       scrollTab(index);
       scrollBody(index, 0);
       switchZIndex(index);
       storeDefaultIndex(pageNameString, index);
       // progressBar(index);
   }

   function changeIndex(num) {
       // console.log(tabcontent.length);
       if (num <= 0) {
           num = 0;
           leftArrow.prop('disabled', true);
           leftArrow.css('opacity', '0.5');
           rightArrow.prop('disabled', false);
           rightArrow.css('opacity', '1');
       } else if (num >= section.length - 1) {
           num = section.length - 1;
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
       if (num >= 0 && num <= section.length - 1) {
           openPage(num);
       }
       defaultIndex = num;
       console.log('New Index from num: ' + defaultIndex);
       return defaultIndex;
   }

   function openPage(num) {
       console.log('Clicked.');
       let i;
       for (i = 0; i < section.length; i++) {
           // tabcontent[i].style.display = (i == parseInt(num)) ? "block" : "none";
           section.eq(i).css('opacity', (i == num) ? "1" : "0"); //tabcontent.eq(parse(num)).css('opacity');
       }
       // for (i = 0; i < tab.length; i++) {
       //     tab.eq(i).css({'backgroundColor': (i == parseInt(num)) ? 'black' : 'white', 'color': (i == parseInt(num)) ? 'white' : 'black'});
       // }
   }

   function scrollBody (index, scrollHeight) {
       console.log('New Index from subSection: ' + index);
       defaultIndex = index;
       let centerBody = widthAndCenter(section, fullPage, defaultIndex);
       fullPage.animate({'scrollLeft': centerBody}, 300);
       section.eq(index).animate({'scrollTop': 0}, 300);
       scrollHeight = 0;
       return scrollHeight;
   }

   function widthAndCenter (link, container, index) {
     let x = container.outerWidth(),
         y = link.eq(index).outerWidth(true),
         z = index,
         q = 0,
         m = container.find(link);

     console.log('X: ' + x + ' Y: ' + y + ' Z: ' + z + ' Q: ' + q + ' M: ' + m);
     //Just need to add up the width of all the elements before our target.
     for (let i = 0; i < z; i++){
       q+= $(m[i]).outerWidth(true);
     }
     console.log('Q: ' + q);
     let width = Math.max(0, (q - ((x - y)/2)));
     console.log('Width: ' + width);
     return width;
   }

   function switchZIndex (index) {
       section.each( function() {
           section.css('z-index', '1');
       });
       section.eq(index).css('z-index', '2');
   }

   // function scrollUp(scrollHeight, scrollNumber) {
   //     let sectionHeight = 0;
   //     section.eq(defaultIndex).children().each( function() {
   //         sectionHeight += $(this).outerHeight(true);
   //         console.log('sectionHeight: ' + sectionHeight);
   //     });
   //     let actualScroll = sectionHeight / scrollNumber;
   //     console.log('actualScroll: ' + actualScroll);
   //     scrollHeight -= actualScroll;
   //     if (scrollHeight <= 0) {
   //         scrollHeight = 0;
   //     }
   //     section.eq(defaultIndex).animate({'scrollTop': scrollHeight}, 50);
   //     return scrollHeight;
   // }
   //
   // function scrollDown(scrollHeight, scrollNumber) {
   //     let sectionHeight = 0;
   //     section.eq(defaultIndex).children().each( function() {
   //         sectionHeight += $(this).outerHeight(true);
   //         console.log('sectionHeight: ' + sectionHeight);
   //     });
   //     let actualScroll = sectionHeight / scrollNumber;
   //     console.log('actualScroll: ' + actualScroll);
   //     scrollHeight += actualScroll;
   //     if (scrollHeight >= sectionHeight) {
   //         scrollHeight = sectionHeight;
   //     }
   //     section.eq(defaultIndex).animate({'scrollTop': scrollHeight}, 50);
   //     return scrollHeight;
   // }

   function progressBar(index) {
       let sectionWidth = section.outerWidth(),
           totalWidth = sectionWidth * (section.length - 1),
           percentage = ((sectionWidth * (index)) / totalWidth) * 100;
       scrollProgressBar.css('width', percentage + "%");
       if (index == section.length - 1) {
           scrollProgressBar.css({'opacity' : '0', 'transform' : 'translateY(-8px)'});
       } else {
           scrollProgressBar.css({'opacity' : '1', 'transform' : 'translateY(0px)'});
       }
   }

   // let stickyFilter = galleryFilter.offset().top;
   // function stickyNav() {
   //      if (work.scrollTop() >= stickyFilter) {
   //          galleryFilter.addClass('sticky');
   //          $('.sticky').css('top', galleryFilter.outerHeight(true) + 'px');
   //      } else {
   //          galleryFilter.removeClass('sticky');
   //          $('.sticky').css('top', '0');
   //      }
   //  }

   // workGridItem.hover (function () {
   //     $(this).find(workImage).css('transform', 'scale(1.5)');
   // }, function () {
   //     $(this).find(workImage).css('transform', 'scale(1.1)');
   // });

   gridItem.hover(function (event) {
       if ($(event.currentTarget).hasClass('hidden')) {
           event.stopPropagation();
           return;
       } else {
           console.log('Hovered');
           $(event.currentTarget).find(workImage).css('transform', 'scale(1.5)');
           $(event.currentTarget).find(workGridText).css({'width': '100%', 'opacity' : '1'});
       }
   }, function (event) {
       $(event.currentTarget).find(workImage).css('transform', 'scale(1.1)');
       $(event.currentTarget).find(workGridText).css({'width': '0', 'opacity' : '0'});
   });

   function workPaddingBottom () {
       let galleryPBottom = workNav.outerHeight(true);
       paddingContainer.css('padding-bottom', galleryPBottom + 'px');
   }

    // let workGalHeight = workGallery.outerHeight(true);
    // filterWorkGallery.filterizr('filter', 'all');
    //
    // filter.on('click', function () {
    //     let tag = $(this).attr('data-filter');
    //     $(this).toggleClass('filterEnabled');
    //     shuffleFilter.removeClass('filterEnabled');
    //     // work.animate({'scrollTop': workGallery.scrollTop()}, 300);
    //     // workImage.css('height', ($(this).hasClass('filterEnabled')) ? '100%' : '0');
    //     // workImage.css('transform', (workImage.hasClass('filteredOut')) ? 'scale(0)' : 'scale(1)');
    // });

    // let filterWorkGallery = workGallery.filterizr({
    //     layout: 'sameSize',
    //     animationDuration: 0.3,
    //     delay: 2,
    //     easing: 'ease-in-out',
    //     filterOutCss: {
    //         width: '0',
    //         height: '0',
    //         'max-height': '0',
    //         'overflow': 'hidden',
    //         padding: '0',
    //         transform: 'scale(0) translate3d(0px, 1542px, 0px)',
    //         transition: '0.3s ease-in-out'
    //     },
    //     filterInCss: {
    //         width: '50%',
    //         height: 'auto',
    //         'max-height': '100%',
    //         padding: '2.5%',
    //         transform: 'scale(1) translate3d(0px, 1542px, 0px)',
    //         transition: '0.3s ease-in-out'
    //     },
    //     multifilterLogicalOperator: 'or',
    //     setupControls: false
    // });
    //
    // shuffleFilter.on('click', function () {
    //     filterWorkGallery.filterizr('shuffle');
    // });

    filter.on('click', function(event) {
        let tag = $(event.currentTarget).data('multifilter');
        $(event.currentTarget).toggleClass('filterEnabled');
        filter.each( function(i, filterTag) {
            if ($( filterTag ).hasClass('filterEnabled')) {
                tag = $( filterTag ).data('multifilter');
                $('.gridItem[data-tag="' + tag + '"').removeClass('hidden');
            } else {
                tag = $( filterTag ).data('multifilter');
                $('.gridItem[data-tag="' + tag + '"').addClass('hidden');
            }
        });
        if (!$('#designFilter').hasClass('filterEnabled') && !$('#mediaFilter').hasClass('filterEnabled') && !$('#otherFilter').hasClass('filterEnabled')) {
            gridItem.removeClass('hidden');
        }
    });

    workBackButton.on('click', previousTab);

    menu.on('click', function () {
        navigation.toggleClass('hideMenu');
        $('.navigation *, #workNav *').not($('.mainMenu, .mainMenu *')).toggleClass('hideNav');
        $('#bar1, #bar2, #bar3').toggleClass('shift');
        mainMenu.toggleClass('showMenu');
        projectPaddingBottom();
    });

    workLink.on('click', storeDefaultIndex('index.html', 2));


        // $('.gridItem').each( function(i) {
        //     if ($(this).attr('data-tag') != tag) {
        //         $(this).addClass('hidden');
        //     } else {
        //         $(this).removeClass('hidden');
        //     }
        // });
        //else {
        //     if ($('#designFilter').hasClass('filterEnabled')) {
        //         tag = $('#designFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').removeClass('hidden');
        //     } else {
        //         tag = $('#designFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').addClass('hidden');
        //     }
        //     if ($('#mediaFilter').hasClass('filterEnabled')) {
        //         tag = $('#mediaFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').removeClass('hidden');
        //     } else {
        //         tag = $('#mediaFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').addClass('hidden');
        //     }
        //     if ($('#otherFilter').hasClass('filterEnabled')) {
        //         tag = $('#otherFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').removeClass('hidden');
        //     } else {
        //         tag = $('#otherFilter').data('multifilter');
        //         $('.gridItem[data-tag="' + tag + '"').addClass('hidden');
        //     }
        // }
        // if ($('.filter[data-multifilter!="' + tag + '"]')).hasClass('filterEnabled') {
        //     $('.gridItem[data-tag!="' + tag + '"]').removeClass('hidden');
        // } else {
        //     $('.gridItem[data-tag!="' + tag + '"]').addClass('hidden');
        // }
        // $('.filter[data-multifilter!="' + tag + '"]').removeClass('filterEnabled');

        // if ($('#designFilter').hasClass('filterEnabled')) {
        //     $('.gridItem').filter('[data-tag="' + $('#designFilter').data('multifilter') + '"]').removeClass('hidden');
        // }
        // if ($('#mediaFilter').hasClass('filterEnabled')) {
        //     $('.gridItem').filter('[data-tag="' + $('#mediaFilter').data('multifilter') + '"]').removeClass('hidden');
        // }
        // if ($('#otherFilter').hasClass('filterEnabled')) {
        //     $('.gridItem').filter('[data-tag="' + $('#otherFilter').data('multifilter') + '"]').removeClass('hidden');
        // }
    //     if (!filter.hasClass('filterEnabled')) {
    //         $('.gridItem').removeClass('hidden');
    //     }
    // });

    // filter.on('click', function() {
    //     filter.each( function() {
    //         if (!$(this).hasClass('filterEnabled')) {
    //            $('.gridItem').filter('[data-tag="' + tag + '"]').addClass('hidden');
    //        }
    //     });
    // });
    //
    // let tag;
    // $('#designFilter').on('click', function() {
    //     tag = $(this).data('multifilter');
    //     $(this).toggleClass('filterEnabled');
    //     $('.gridItem').addClass('hidden');
    //     $('.gridItem').filter('[data-tag="' + tag + '"]').removeClass('hidden');
    //     selectAll();
    // });
    // $('#mediaFilter').on('click', function() {
    //     tag = $(this).data('multifilter');
    //     $(this).toggleClass('filterEnabled');
    //     $('.gridItem').addClass('hidden');
    //     $('.gridItem').filter('[data-tag="' + tag + '"]').removeClass('hidden');
    //     selectAll();
    // });
    // $('#otherFilter').on('click', function() {
    //     tag = $(this).data('multifilter');
    //     $(this).toggleClass('filterEnabled');
    //     $('.gridItem').addClass('hidden');
    //     $('.gridItem').filter('[data-tag="' + tag + '"]').removeClass('hidden');
    //     selectAll();
    // });
    //
    // function selectAll () {
    //     if (filter.not('filterEnabled')) {
    //         $('.gridItem').removeClass('filterEnabled');
    //     }
    // }

        // $('.gridItem').each( function(i) {
        //     console.log($(this).attr('data-tag'));
        //     if ($(this).attr('data-tag') != tag) {
        //         $(this).addClass('hidden');
        //     } else {
        //         $(this).removeClass('hidden');
        //     }
        // });
        // filter.each( function(i) {
        //     if ($(this).hasClass('checked')) {
        //         $(this).addClass('hidden');
        //     } else {
        //         $(this).removeClass('hidden');
        //     }
        // });

    projectPaddingBottom();
    function projectPaddingBottom () {
    // projectMenuWidth = navigation.outerWidth(true),
        let projectMenuHeight;
        if (mainMenu.hasClass('showMenu')) {
            projectMenuHeight = mainMenu.outerHeight(true);
        } else {
            projectMenuHeight = navigation.outerHeight(true);
        }
        projectSpacing.css('padding-bottom', projectMenuHeight + 'px');
    }

    function scrollTab (index) {
        console.log('New Index from scrollTab: ' + index);
        defaultIndex = index;
        let center = widthAndCenter(tab, tabSection, defaultIndex);
        tabSection.animate({"scrollLeft": center}, 300);
        console.log('Data-index property retrieved from tab: ' + $(".tabItem").eq(defaultIndex).attr("data-index"));
    }

    function widthAndCenter (link, container, index) {
        let x = container.outerWidth(),
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
});

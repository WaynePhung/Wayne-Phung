"use strict";

$(document).ready(function() {
    // ----------------------- VARIABLE DECLARATIONS HERE -----------------------

    // Header variables.
    let header = $('header'),
        name = $('.name h1'),
        links = $('.dropDownList a, .dropDownNav a, #contact a'),
        body = $('body'),
        dropDownMenu = $('.dropDownMenu'),
        dropDownButton = $('.dropDownButton'),
        dropDownText = $('.dropDownText'),
        dropDownList = $('.dropDownList'),
        dropDownNav = $('.dropDownNav'),
        dropDownItem = $('.dropDownItem');

    let bodySection = $('.bodySection'),
        mainText = $('.mainText'),
        mainArrow = $('.mainArrow');

    let intro = $('#intro'),
        work = $('#work'),
        sectionTitle = $('.sectionTitle');

   // --------------------- END OF VARIABLE DECLARATIONS ----------------------

   // ----------------------- INTERACTIVE EFFECTS HERE ------------------------
   let htmlPageName = location.href.split('/').slice(-1),
       pageNameString = htmlPageName.toString(),
       indexArray = retrieveIndexArray(),
       defaultIndex, linkClicked,
       getHeaderHeight = header.outerHeight(true);

   console.log(pageNameString);
   console.log(indexArray);
   if (pageNameString == null || pageNameString == '') {
       console.log('pageNameString undefined, changed to index.html.');
       pageNameString = 'index.html';
       if (defaultIndex == null) {
         console.log('defaultIndex undefined, changed to 0.');
         defaultIndex = getIndex(pageNameString, indexArray);
       }
   } else {
       defaultIndex = getIndex(pageNameString, indexArray);
   }

   console.log('defaultIndex: ' + defaultIndex);

   function retrieveIndexArray() {
       if (localStorage.index) {
           let getIndexArray = JSON.parse(JSON.stringify(localStorage.getItem('index')));
           console.log('Index array: ' + getIndexArray);
           let convertArray = JSON.parse(getIndexArray);
           console.log('Convert array: ' + convertArray);
           return convertArray;
       } else if (typeof(Storage) !== 'undefined') {
           let indices = {
               'revampedIndexHtml' : '0'
               // 'projectHtml' : '0'
           };
           console.log(indices);
           localStorage.setItem('index', JSON.stringify(indices));
           let getIndexArray = JSON.parse(JSON.stringify(localStorage.getItem('index')));
           console.log('Index array: ' + getIndexArray);
           let convertArray = JSON.parse(getIndexArray);
           console.log(convertArray);
           return convertArray;
       } else {
           console.log('Current index not retrieved. Sorry, your browser does not support Web Storage for localStorage...');
       }
   }

   function storeDefaultIndex(pageNameString, index) {
       let getIndexArray = JSON.parse(localStorage.getItem('index')),
           stringify = JSON.stringify(getIndexArray);
           console.log('index: ' + index);
           console.log('stringify: ' + stringify);
           console.log('pageNameString: ' + pageNameString);
       let changedArray = changeIndexArray(getIndexArray, pageNameString, index);
       localStorage.setItem('index', changedArray);
       console.log('Stored index: ' + localStorage.getItem('index'));
   }

   function changeIndexArray (indexArray, pageName, index) {
       // console.log('stringify: ' + stringify);
       console.log('pageName: ' + pageName);
       console.log('index: ' + index);
        if (indexArray.revampedIndexHtml == null) {
            indexArray.revampedIndexHtml = 0;
        } else {
            if (pageName == 'revampedIndex.html') {
                indexArray.revampedIndexHtml = index.toString();
                console.log('Changed index to: ' + indexArray.revampedIndexHtml);
            }
        }
        // if (indexArray.projectHtml == null) {
        //     indexArray.projectHtml = 0;
        // } else {
        //     if (pageName == 'fingo.html') {
        //         indexArray.projectHtml = index.toString();
        //         console.log('Changed project index to: ' + indexArray.projectHtml);
        //     }
        // }
       // switch (pageName) {
       //     case 'index.html':
       //         if (indexArray.revampedIndexHtml == null) {
       //             indexArray.revampedIndexHtml = 0;
       //         }
       //         indexArray.revampedIndexHtml = String(index);
       //         console.log('indexArray -index: ' + indexArray.revampedIndexHtml);
       //     break;
       //     case 'project.html':
       //         if (indexArray.projectHtml == null) {
       //              indexArray.projectHtml = 0;
       //         }
       //         indexArray.projectHtml = String(index);
       //         console.log('indexArray - project: ' + indexArray.projectHtml);
       //     break;
       //     case undefined:
       //         if (indexArray.revampedIndexHtml == null) {
       //             indexArray.revampedIndexHtml = 0;
       //         }
       //         indexArray.revampedIndexHtml = String(index);
       //         console.log('indexArray - index: ' + indexArray.revampedIndexHtml);
       //         if (indexArray.projectHtml == null) {
       //              indexArray.projectHtml = 0;
       //         }
       //         indexArray.projectHtml = String(index);
       //         console.log('indexArray - project: ' + indexArray.projectHtml);
       //     break;
       //     default:
       //         indexArray.revampedIndexHtml = index;
       //         indexArray.projectHtml = index;
       // }
       console.log('indexArray.revampedIndexHtml: ' + indexArray.revampedIndexHtml);
       // console.log('indexArray.projectHtml: ' + indexArray.projectHtml);
       let getIndexArray = JSON.stringify(indexArray);
       console.log('getIndexArray: ' + getIndexArray);
       return getIndexArray;
   }

   function getIndex (pageName, array) {
       let getIndex;
       console.log('pageName: ' + pageName);
       console.log('array: ' + array);
       switch (pageName) {
           case 'revampedIndex.html':
               if (array.revampedIndexHtml == null) {
                   array.revampedIndexHtml = 0;
               }
                getIndex = parseInt(array.revampedIndexHtml);
           break;
           // case 'project.html':
           //      if (array.projectHtml == null) {
           //          array.projectHtml = 0;
           //      }
           //      getIndex = parseInt(array.projectHtml);
           // break;
           case undefined:
               if (array.revampedIndexHtml == null) {
                   array.revampedIndexHtml = 0;
               }
               // if (array.projectHtml == null) {
               //     array.projectHtml = 0;
               // }
                getIndex = parseInt(array.revampedIndexHtml);
           break;
       }
       console.log('indexArray.revampedIndexHtml: ' + array.revampedIndexHtml);
       // console.log('indexArray.projectHtml: ' + array.projectHtml);
       console.log('indexArray: ' + indexArray);
       console.log('getIndex: ' + getIndex);
       return getIndex;
   }

   $(window).resize(function() {
       marginMainText();
       changeNav();
       marginMainText();
       collapseMenu();
   });

   marginMainText();
   function marginMainText() {
       mainText.css('padding-top', header.outerHeight(true) + 'px');
       // console.log('padding-top: ' + header.outerHeight(true));
       // sectionTitle.css('padding-top', 32 + header.outerHeight(true) + 'px');
       dropDownItem.css('width', dropDownButton.innerWidth(true) + 'px');
       $('.dropDownItem h3').css('width', dropDownButton.innerWidth(true) + 'px');
   }

   let checkLinkClicked = false;
   $(window).on('scroll', function() {
       changeNav();
       collapseMenu();
       // changeSection(defaultIndex);
       trackScroll();
       // replaceDropText(defaultIndex);
       toggleActive();
   });
   function changeNav() {
       if ($(window).scrollTop() > ($(window).height() * (1/10))) {
           header.css({
               'background-color' : 'black',
               // 'opacity' : '0',
               'z-index' : '1',
               'font-size' : '0.5em',
               'padding' : '1.5em'
           });
           if ($(window).width() <= 750) {
               dropDownMenu.css({
                   'display' : 'inline-block'
               });
               dropDownNav.css({
                   'display' : 'none'
               });
           } else {
               dropDownMenu.css({
                   'display' : 'none'
               });
               dropDownNav.css({
                   'display' : 'flex'
               });
           }
           // name.css('font-size', '2.5em');
       } else {
           header.css({
               'background-color' : 'transparent',
               // 'opacity' : '1',
               'z-index' : '2',
               'font-size' : '1em',
               'padding' : '1em'
           });
           $('.dropDownMenu, .dropDownNav').css({
               'display' : 'none'
           });
           // name.css('font-size', '3em');
       }

   }

   function collapseMenu () {
       $('.dropDownButton, .dropDownList').removeClass('showMenu');
       $('.dropdownButton i').removeClass('fa-angle-up').addClass('fa-angle-down');
   }

   // changeSection(defaultIndex);
   function changeSection (defaultIndex) {
       // if ($(window).offset.top <= bodySection.eq(defaultIndex).offset.top) {
       //     console.log("Less than current default.");
       //     $('.dropDownItem.active').removeClass('active');
       //     defaultIndex = (defaultIndex > 0) ? defaultIndex - 1 : 0;
       //     dropDownItem.eq(defaultIndex).addClass('active');
       // } else if ($(window).offset.top >= bodySection.eq(defaultIndex).offset.top) {
       //     console.log("Greater than current default.");
       //     $('.dropDownItem.active').removeClass('active');
       //     defaultIndex = (defaultIndex < bodySection.length - 2) ? defaultIndex + 1 : bodySection.length - 1;
       //     dropDownItem.eq(defaultIndex).addClass('active');
       // } else {
       //     defaultIndex = 0;
       // }
       dropDownItem.each( function(i) {
           let getScroll = $(window).scrollTop();
            if ($(this).scrollTop() <= getScroll) {
                $('.dropDownItem.active').removeClass('active');
                dropDownItem.eq(i).addClass('active');
            // } else if ($(this).scrollTop() >= $(window).scrollTop()) {
            //     $('.dropDownItem.active').removeClass('active');
            //     defaultIndex += 1;
            //     dropDownItem.eq(defaultIndex).addClass('active');
            } else {
                $('.dropDownItem.active').removeClass('active');
                $('.dropDownItem:first').addClass('active');
            }
       });
       console.log('Current index: ' + defaultIndex);
       return defaultIndex;
   }

   trackScroll();
   function trackScroll() {
       let subtractHeader = header.outerHeight(true),
           bodySectionLength = parseInt(bodySection.length - 1);
       console.log('Bodysection length: ' + bodySectionLength);
       // console.log('Work position: ' + (bodySection.eq(1).position().top - subtractHeader));
       for (let i = 0; i < bodySection.length; i++) {
           if ($(window).scrollTop() < (bodySection.eq(0).position().top) + bodySection.eq(0).outerHeight(true) - 32 - subtractHeader) {
               dropDownText.text('Intro');
           } else if (i != bodySectionLength && $(window).scrollTop() >= (bodySection.eq(i).position().top + bodySection.eq(i).outerHeight(true) - 32 - subtractHeader) && $(window).scrollTop() < (bodySection.eq(i + 1).position().top + bodySection.eq(i + 1).outerHeight(true) - 32 - subtractHeader)) {
               defaultIndex = i;
               dropDownText.text($(".dropDownList .dropDownItem[data-index='" + defaultIndex +"']").text());
               console.log('Reached ' + $(".dropDownList .dropDownItem[data-index='" + defaultIndex +"']").text() + ' Section');
           } else {

           }
       }
       storeDefaultIndex(pageNameString, defaultIndex);
       return defaultIndex;
   }

   toggleActive();
   function toggleActive() {
       dropDownItem.removeClass('active');
       $(".dropDownList .dropDownItem[data-index='" + defaultIndex +"']").addClass('active');
       $(".dropDownNav .dropDownItem[data-index='" + defaultIndex +"']").addClass('active');
       if (dropDownText.text() == 'Menu') {
           dropDownItem.removeClass('active');
       }
       return defaultIndex;
   }

   replaceHeaderText();
   function replaceHeaderText() {
       let getScrollPos = $(window).scrollTop(),
           getSectionPos;
       for (let i = 0; i < dropDownItem.length; i++) {
           // getSection
       }
       replaceDropText(defaultIndex);
   }

   replaceDropText(defaultIndex);
   function replaceDropText(index) {
       if ($('.dropDownList .dropDownItem').eq(index).data('track') == null) {
           dropDownText.text('Menu');
       } else {
           console.log('ReplaceDropText: ' + $(".dropDownList .dropDownItem[data-index='" + index +"']").text());
           dropDownText.text($(".dropDownList .dropDownItem[data-index='" + index +"']").text());
       }
   }

   dropDownButton.on('click', function() {
       $('.dropDownButton, .dropDownList').toggleClass('showMenu');
       if (dropDownButton.hasClass('showMenu')) {
           $('.dropDownButton i').removeClass('fa-angle-down').addClass('fa-angle-up');
       } else {
           $('.dropdownButton i').removeClass('fa-angle-up').addClass('fa-angle-down');
       }
   });

   dropDownItem.on('click', function(event) {
       let defaultMenuItemIndex = parseInt($(event.currentTarget).data('index'));
       $('.dropDownButton, .dropDownList').removeClass('showMenu');
       dropDownItem.removeClass('active');
       $(event.currentTarget).addClass('active');
       // replaceDropText(defaultMenuItemIndex);
   });

   links.on('click', function(event) {
       $('.dropDownButton, .dropDownList').removeClass('showMenu');
       $('.dropdownButton i').removeClass('fa-angle-up').addClass('fa-angle-down');
       let hash = this.hash;
       $('html, body').animate({
           scrollTop: parseInt($(hash).offset().top - header.outerHeight(true))
       }, 450);
       linkClicked = true;
       console.log('linkClicked from onClick: ' + linkClicked);
       defaultIndex = parseInt($(event.currentTarget).find(dropDownItem).data('index'));
       console.log('data Index retrieved: ' + $(event.currentTarget).find(dropDownItem).data('index'));
       console.log('defaultIndex: ' + defaultIndex);
       // replaceDropText(defaultIndex);
       // dropDownItem.removeClass('active');
       // let extractDataIndex = parseInt($(event.currentTarget).find('.dropDownItem').data('track'));
       // console.log('extractedIndex: ' + extractDataIndex);
       // defaultIndex = extractDataIndex;
       toggleActive();
       storeDefaultIndex(pageNameString, defaultIndex);
       event.preventDefault();
   });

   mainArrow.on('click', function() {
       if ($(window).scrollTop() <= ($(window).height() * (1/10))) {
           $('html, body').animate({
               scrollTop: intro.offset().top - header.innerHeight()
           }, 450);
       } else {
           $('html, body').animate({
               scrollTop: intro.offset().top - header.outerHeight(true)
           }, 450);
       }
       defaultIndex = 0;
       storeDefaultIndex(pageNameString, defaultIndex);
       return defaultIndex;
   });

   // mainArrow.on('click', function() {
   //     $('html, body').animate({
   //         scrollTop: work.offset().top
   //     }, 450);
   // });
});

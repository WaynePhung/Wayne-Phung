"use strict";
$(document).ready(function() {

    let scrollProgressBar = $('.scrollProgressBar'),
        fullPage = $('.fullPage'),
        section = $('section'),
        leftArrow = $('.leftArrow'),
        rightArrow = $('.rightArrow');
    ;

    let defaultIndex = 0;
    console.log('Default Index: ' + defaultIndex);
    scrolling(defaultIndex);
    leftArrow.on('click', previousTab);
    rightArrow.on('click', nextTab);

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            previousTab();
        break;

        case 39: //right
            nextTab();
        break;

        default: return; // exit this handler for other keys
        }
        event.stopImmediatePropagation();
        // e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    let resizeResponse, interval = 10;
    $(window).resize(function() {
        resizeResponse = setTimeout( function () {
            if (defaultIndex != 0 && defaultIndex < section.length) {
                console.log('Window resized.');
                scrolling(defaultIndex);
            }
        }, interval);
    });

    section.on("swipeleft", function() {
        nextTab();
        console.log('Swiped left.');
    });
    section.on("swiperight", function() {
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
    }

    function nextTab() {
        if (defaultIndex == section.length - 1 && defaultIndex + 1 >= section.length) {
            // Do nothing.
        } else {
            defaultIndex += 1;
            scrolling(defaultIndex);
        }
    }

    function scrolling (index) {
        changeIndex(index);
        scrollBody(defaultIndex);
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
    }

    function scrollBody (index) {
        console.log('New Index from subSection: ' + index);
        defaultIndex = index;
        let centerBody = widthAndCenter(section, fullPage, defaultIndex);
        fullPage.animate({"scrollLeft": centerBody}, 300);
        section.eq(index).animate({scrollTop:0}, 300);
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
});

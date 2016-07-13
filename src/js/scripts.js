function setupDynamicSite() {
  'use strict';

  if ($('html').hasClass('static-site')) {
    return;
  }

  if (!$('html').hasClass('svg')) { // Fallback to static site if SVG is not supported
    $('html').removeClass('dynamic-site');
    $('html').addClass('static-site');
    return;
  }

  var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
  var tooltips = ['INTRO', 'COLOR THEMES', 'PHOTO DIARY', 'STORYBOOK', 'REVIEWS & FREE DOWNLOAD', 'MADE BY PROJECT9'];

  var $pageFooter = $('.js-page-footer');
  var $slides = $('.js-slides');
  var $colorCards = $('.js-colors');
  var $iPhone = $('.js-iphone');
  var $iPhoneOverlay = $('.js-iphone-overlay');
  var $reviewsSwipe = $('.js-reviews-swipe');
  var $reviewsNextButton = $('.js-reviews-next');
  var $reviewsPrevButton = $('.js-reviews-prev');
  var $fullpageNavigation = $('#fp-nav');

  $slides.fullpage({
    verticalCentered  : false,
    css3              : true,
    navigation        : true,
    navigationPosition: 'right',
    navigationTooltips: tooltips,

    afterRender: function() {
      $fullpageNavigation = $('#fp-nav');
    },

    onLeave: function(index, nextIndex) {
      $slides.removeClass(numbers[index]);
      $slides.addClass(numbers[nextIndex]);
      $iPhone.attr('class', 'iphone__viewbox js-iphone ' + numbers[nextIndex]); // jQuery addClass and removeClass don't work with SVG
      // $iPhone.attr('class', 'colors js-colors ' + (nextIndex === 6 ? '' : ''));
      $pageFooter.toggleClass('visible', nextIndex === tooltips.length -1 || nextIndex === tooltips.length );
      $fullpageNavigation.toggleClass('hidden', nextIndex === tooltips.length);
      $colorCards.attr('class', 'colors js-colors ' + (nextIndex === 2 ? 'visible' : ''));
      $iPhoneOverlay.toggleClass('bring-to-front', nextIndex > 0 && nextIndex <= tooltips.length);
    },
  });

  var swipe = new Swipe($reviewsSwipe[0], {
    continuous: true,
  });

  $reviewsNextButton.click(function() {
    swipe.next();
  });

  $reviewsPrevButton.click(function() {
    swipe.prev();
  });
}

setupDynamicSite();

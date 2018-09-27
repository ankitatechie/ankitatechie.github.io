$(function() {

  var isMobile;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;

    // Mobile height fix
    $('.height-fix').each(function() {
      var h = $(this).height();
      $(this).height(h);
    });
  }

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }


  // NAV POSITION
  var navPos = $('nav').position().top;
  var lastPos = 0;
  var lockTimer;

  $(window).on('scroll', function() {

    var pos = $(window).scrollTop();
    var pos2 = pos + 50;
    var scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#home').offset().top) {
      highlightLink('home'); 
    }
    if (pos2 > $('#about').offset().top) { 
      highlightLink('about'); 
    }
    if (pos2 > $('#projects').offset().top) { 
      highlightLink('projects'); 
    }
    if (pos2 > $('#contact').offset().top ||
      pos + $(window).height() === $(document).height()) {
        highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if(!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover')
    }

    lockTimer = setTimeout(function(){
      $('body').removeClass('disable-hover')
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $("nav").find('[dest="' + anchor + '"]').addClass('active');
  }


  // EVENT HANDLERS
  $('.page-link').click(function() {
    var anchor = $(this).attr("dest");
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $("nav").find('[dest="'+ anchor +'"]').addClass('active');

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  // SCROLL ANIMATIONS
  function onScrollInit( items, elemTrigger ) {
    var offset = $(window).height() / 1.6
    items.each( function() {
      var elem = $(this);
      var animationClass = elem.attr('data-animation');
      var animationDelay = elem.attr('data-delay');

      elem.css({
        '-webkit-animation-delay':  animationDelay,
        '-moz-animation-delay':     animationDelay,
        'animation-delay':          animationDelay,
      });

      var trigger = (elemTrigger) ? trigger : elem;

      trigger.waypoint(function() {
        elem.addClass('animated').addClass(animationClass);
        if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
        },{
          triggerOnce: true,
          offset: offset,
      });
    });
  }

  setTimeout(function() { onScrollInit($('.waypoint')) }, 10);

});
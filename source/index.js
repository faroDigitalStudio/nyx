(function(){
  var DESKTOP_W = 1000;

  function setHeaderState() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var scrolled = y > 80;
    var $header = $("#header");

    if (w >= DESKTOP_W) {
      // Desktop: transparent at top, solid when scrolled
      if (scrolled) {
        $header.addClass("is-scrolled").removeClass("is-top");
      } else {
        $header.removeClass("is-scrolled").addClass("is-top");
      }
      // No desktop hero padding
      $("#top_part").css("marginTop","0px");
    } else {
      // Mobile: always solid
      $header.addClass("is-scrolled").removeClass("is-top");
      // Ensure hero sits below actual header height
      $("#top_part").css("marginTop", $header.outerHeight() + "px");
    }
  }

  // Lightbox helpers
  window.magnify = function(imglink){
    $("#img_here").css("background","url('"+imglink+"') center center");
    $("#magnify").css("display","flex").addClass("animated fadeIn");
    setTimeout(function(){ $("#magnify").removeClass("animated fadeIn"); },800);
  };
  window.closemagnify = function(){
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function(){
      $("#magnify").css("display","none").removeClass("animated fadeOut");
      $("#img_here").css("background","none");
    },800);
  };

  // Hide loader
  setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut").css("display","none");
    },800);
  },1650);

  // Smooth anchor scroll
  $(document).on("click","a[href^='#']", function(e){
    var hash = this.hash;
    if (!hash) return;
    var $target = $(hash);
    if ($target.length){
      e.preventDefault();
      $("html,body").animate({ scrollTop: $target.offset().top }, 800, function(){
        window.location.hash = hash;
      });
    }
  });

  // Back to top (logo + footer logo)
  $(document).on("click", "#logo a, .logo-link", function(e){
    e.preventDefault();
    $("html, body").animate({scrollTop:0}, 500);
  });

  // Initial + reactive
  $(function(){
    setHeaderState();
    // after fonts/images paint
    setTimeout(function(){
      setHeaderState();
      window.dispatchEvent(new Event('scroll'));
    }, 0);
  });

  window.addEventListener("scroll", setHeaderState);
  window.addEventListener("resize", setHeaderState);
})();

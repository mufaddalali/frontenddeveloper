$(document).ready(function () {
  /*page loader*/
  setTimeout(function () {
    $(".page-loader").fadeOut(1000);
    $(".wrapper").delay(1000).fadeIn(2000);
  }, 4000);

  // set parameters
  $(".link").click(function () {
    var mouselinkforpage = $(this).attr("data-link");
    if (mouselinkforpage == "pagecompany") {
      var container = document.querySelector(".pagecompany .reveal");
      var inner = document.querySelector(".pagecompany .inner");
    } else if (mouselinkforpage == "pageproduction") {
      var container = document.querySelector(".pageproduction .reveal");
      var inner = document.querySelector(".pageproduction .inner");
    } else if (mouselinkforpage == "pageevent") {
      var container = document.querySelector(".pageevent .reveal");
      var inner = document.querySelector(".pageevent .inner");
    } else if (mouselinkforpage == "pagecontact") {
      var container = document.querySelector(".pagecontact .reveal");
      var inner = document.querySelector(".pagecontact .inner");
    } else {
      var container = document.querySelector(".reveal");
      var inner = document.querySelector(".inner");
    }

    // Mouse
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function () {
        return "(" + this.x + ", " + this.y + ")";
      },
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);

    //----------------------------------------------------

    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function () {
      return counter++ % refreshRate === 0;
    };

    //----------------------------------------------------

    var onMouseEnterHandler = function (event) {
      update(event);
    };

    var onMouseLeaveHandler = function () {
      inner.style = "";
    };

    var onMouseMoveHandler = function (event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };

    //----------------------------------------------------

    var update = function (event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / inner.offsetHeight / 2).toFixed(2),
        (mouse.x / inner.offsetWidth / 2).toFixed(2)
      );
    };

    var updateTransformStyle = function (x, y) {
      var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      inner.style.transform = style;
      inner.style.webkitTransform = style;
      inner.style.mozTranform = style;
      inner.style.msTransform = style;
      inner.style.oTransform = style;
    };

    //--------------------------------------------------------

    container.onmousemove = onMouseMoveHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmouseenter = onMouseEnterHandler;
  });

  var currentAnimation;
  var requestedAnimation;

  $(".link").each(function (index, element) {
    var pagelink = $(this).attr("data-link");

    gsap.set("." + pagelink + " .close-scroll-indicator", {
      rotation: 0,
      scale: 0,
      x: "0%",
      y: "0%",
    }),
      gsap.set("." + pagelink + " .reveal", { autoAlpha: 1 });

    var trans = gsap.timeline({
      paused: true,
      onReverseComplete: playRequestedAnimation,
      defaults: {
        duration: 0.6,
        delay: 0.2,
        ease: Power4.easeOut,
      },
    });

    if (pagelink == "pageproduct") {
      if ($(window).width() < 768) {
        trans
          .to("." + pagelink, { zIndex: 5, opacity: 1 })
          .from("." + pagelink + " .frame-product-left", { x: "100%" }, 0)
          .from("." + pagelink + " .frame-product-middle", { x: "-100%" }, 0.3)
          .from("." + pagelink + " .frame-product-right", { x: "100%" }, 0.6)
          .to(
            "." + pagelink + " .frame-product-left .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1
          )
          .to(
            "." + pagelink + " .frame-product-middle .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1.2
          )
          .to(
            "." + pagelink + " .frame-product-right .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1.4
          )
          .to(
            "." + pagelink + " .close-scroll-indicator",
            0.5,
            {
              scale: 1,
              x: 0,
              y: 0,
              rotation: 90,
              ease: Back.easeOut.config(1.7),
              delay: 1,
            },
            1
          )
          .reversed(true);
      } else {
        trans
          .to("." + pagelink, { zIndex: 5, opacity: 1 })
          .from("." + pagelink + " .frame-product-left", { y: "100%" }, 0)
          .from("." + pagelink + " .frame-product-middle", { y: "-100%" }, 0.3)
          .from("." + pagelink + " .frame-product-right", { y: "100%" }, 0.6)
          .to(
            "." + pagelink + " .frame-product-left .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1
          )
          .to(
            "." + pagelink + " .frame-product-middle .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1.2
          )
          .to(
            "." + pagelink + " .frame-product-right .frame-product-content",
            {
              opacity: 1,
              y: 0,
            },
            1.4
          )
          .to(
            "." + pagelink + " .close-scroll-indicator",
            0.5,
            {
              scale: 1,
              x: 0,
              y: 0,
              rotation: 90,
              ease: Back.easeOut.config(1.7),
              delay: 1,
            },
            1
          )
          .reversed(true);
      }
    } else {
      trans
        .to("." + pagelink, { zIndex: 5, opacity: 1 })
        .from("." + pagelink + " .frame-left", { x: "-100%" }, 0)
        .from("." + pagelink + " .frame-right", { x: "100%" }, 0)
        .from(
          "." + pagelink + " .reveal",
          1,
          { xPercent: -140, ease: Power4.out },
          0.7
        )
        .from("." + pagelink + " .reveal-image", 1, {
          xPercent: 100,
          delay: -1,
          ease: Power4.out,
        })
        .from("." + pagelink + " .pic-text", { x: "100%", duration: 1.4 }, 1.1)
        .to(
          "." + pagelink + " .close-scroll-indicator",
          0.5,
          {
            scale: 1,
            x: 0,
            y: 0,
            rotation: 90,
            ease: Back.easeOut.config(1.7),
            delay: 1,
          },
          1
        )
        .reversed(true);
    }
    this.animation = trans;
  });

  //on click of scorp btn
  $(".scorp-btn").click(function () {
    //clicks.play();
    gsap.to(".nav-bar ul li", { y: -10, stagger: 0.14 });
    $(".link").eq($(".scorp-btn").index(this)).trigger("click");
  });

  // FOR NORMAL LINKS ON
  $(".link").click(function () {
    basicaddonsclick();

    let medialink = $(this).attr("data-link");
    $(this).addClass("active");
    requestedAnimation = this.animation;

    if (currentAnimation) {
      currentAnimation.reverse();
    } else {
      setTimeout(() => {
        playRequestedAnimation();
      }, 1000);
    }

    if (requestedAnimation == currentAnimation) {
      requestedAnimation.play();
    }

    if ($(window).width() < 768) {
      $(".menu-mobile .fa").removeClass("fa-times");
      $(".main-menu").removeClass("main-menu-open");
    }
    $(".media-slides img").addClass("hide-image");

    requestedAnimation.eventCallback("onComplete", () => {
      if (medialink == "pagemedia") {
        slick();
        $(".media-slides img").removeClass("hide-image");
      } else {
        $(".media-carousel").slick("unslick");
        $(".media-slides img").addClass("hide-image");
      }
    });
  });

  function playRequestedAnimation() {
    if (requestedAnimation != undefined) {
      requestedAnimation.play();
    }
    currentAnimation = requestedAnimation;
  }
  function reversecurrentanimation() {
    currentAnimation.reverse();
  }

  function basicaddonsclick() {
    gsap.to(".logo", { width: "70px", height: "70px" });
    gsap.to(".nav-bar ul li", { y: -10, stagger: 0.14 });
    $(".link").removeClass("active");
    $(".main-header").removeClass("product-page-header");
    $(".side-link").addClass("any-page-open");
    $(".footer .right").hide();
    $("footer.footer").css({ width: "50%" });
    $(".pic-text").animate({ scrollTop: 0 }, 500, "swing");
  }

  $(".close-scroll-indicator").click(function () {
    gsap.to(".nav-bar ul li", {
      y: 0,
      stagger: 0.14,
    });
    //clicks.play();
    $(".link").removeClass("active");
    gsap.to(".logo", { width: "100px", height: "100px" });
    reversecurrentanimation();
    requestedAnimation = this.animation;

    $(".pic-text").animate({ scrollTop: 0 }, 500, "swing");
    setTimeout(function () {
      $(".side-link").removeClass("any-page-open");
      $("footer.footer").css({ width: "100%" });
      $(".footer .right").show();
    }, 2500);
  });

  // MAIN HOME PAGE SLIDER
  var currentslide = 0;
  gsap.set(".project", { autoAlpha: 0 });

  const sl = gsap.utils.toArray(".project");
  const targets = gsap.utils.toArray(".bottom-arrow");

  let isDown = true;

  targets[0].addEventListener("click", homeslides);
  sl.forEach(function (obj, i) {
    let homepageslider = gsap.timeline({
      defaults: {
        duration: 0.8,
        delay: 0.9,
        ease: Power4.easeOut,
      },
    });

    homepageslider
      .set(".pp-" + i, { autoAlpha: 1 })
      .to(".pp-" + i + " .cover .frame.left-frame", { y: 0 })
      .to(".pp-" + i + " .cover .frame.right-frame", { y: 0 }, 0.1)
      .to(".pp-" + i + " .bg-frame", { opacity: 1 }, "-=1.4")
      .to(".pp-" + i + " .mask.mask-left", { x: "-100%" }, "-=1.2")
      .to(".pp-" + i + " .mask.mask-right", { x: "200%" }, "-=1.6")
      .to(".pp-" + i + " h3.heading", { y: 0 }, "-=1.4");
    homepageslider.reversed(true);
    obj.anim = homepageslider;
  });

  // AUTOMATIC SLIDER MOVEMENT
  let isInterval;
  // isInterval = setInterval(function () {
  //   $(".bottom-arrow").trigger("click");
  // }, 8000);

  function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  var returnedFunction = debounce(function (event) {
    console.log(event);

    if (event.deltaY < 0) {
      isDown = false;
      $(".bottom-arrow").trigger("click");
    } else {
      isDown = true;
      $(".bottom-arrow").trigger("click");
    }
  }, 10);

  // ON MOUSE WHEEL AND SWIPE
  // document
  //   .getElementById("projectWheel")
  //   .addEventListener("wheel", returnedFunction.bind(this), { passive: false });

  function homeslides() {
    clearInterval(isInterval);
    // SLIDER AUTOPLAY FUNCTIONALITY
    setTimeout(() => {
      clearInterval(isInterval);
      // isInterval = setInterval(function () {
      //   $(".bottom-arrow").trigger("click");
      // }, 5000);
    }, 2000);
    sl[currentslide].anim.timeScale(0.9).reverse();
    if (currentslide == 5) {
      if (isDown == true) {
        currentslide = 0;
      } else {
        currentslide = currentslide - 1;
      }
    } else {
      if (isDown == true) {
        currentslide = currentslide + 1;
      } else {
        if (currentslide == 0) {
          currentslide = 5;
        } else {
          currentslide = currentslide - 1;
        }
      }
    }
    setTimeout(() => {
      sl[currentslide].anim.play();
    }, 2500);
  }

  setTimeout(() => {
    let blubs = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: Power4.easeOut,
      },
    });

    blubs.to(".nav-bar ul li", { autoAlpha: 1, y: 0, stagger: 0.24 });
    blubs.to(".icons-logo", { duration: 0.8, autoAlpha: 1 }, 1.5);
    blubs.to(".logo", { autoAlpha: 1, duration: 3 }, 2.2);

    sl[currentslide].anim.play();
  }, 4000);

  // SLICK SLIDER
  function slick() {
    $(".media-carousel").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><svg viewBox="0 0 19.45 11.64"><path d="M9.73 11.64L0 1.38 1.45 0l8.28 8.73L18 0l1.45 1.38-9.72 10.26"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-next"><svg viewBox="0 0 19.45 11.64"><path d="M9.73 11.64L0 1.38 1.45 0l8.28 8.73L18 0l1.45 1.38-9.72 10.26"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  $(".menu-mobile").click(function () {
    $(".menu-mobile .fa").toggleClass("fa-times");
    $(".main-menu").toggleClass("main-menu-open");
  });

  $(".inside-page-bottom-arrow").click(function () {
    $(".pic-text").animate({ scrollTop: $(".pic-text")[0].scrollHeight }, 2500);
  });

  $(".bottom-arrow").mouseenter(() => {
    //clicks.play();
  });

  let logo_ = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.6,
      delay: 0.2,
      ease: Power4.easeOut,
    },
  });
  logo_
    .to(".logo", { width: "200px", height: "200px" })
    .to(".logo img", { border: "3px solid #ffc107" }, "-=0.7")
    .to(".download-cv", { autoAlpha: 1 }, "-=0.4")
    .to(".logo-text", { autoAlpha: 1, x: 40, duration: 1 }, "-=0.7");

  $(".logo").mouseenter(function () {
    //logohover.play();
    logo_.play();
  });
  $(".logo").mouseleave(function () {
    logo_.timeScale(1.1).reverse();
  });

  //var logohover = new Howl({ src: ["sounds/clicks.mp3"] });
  //var introweb = new Howl({ src: ["sounds/intro.mp3"] });
  // var clicks = new Howl({ src: ["sounds/logo-hover.mp3"] });
  // introweb.play();
});

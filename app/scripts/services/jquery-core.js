'use strict';

/* jshint ignore:start */

/**
 * @ngdoc function
 * @name liaFrontendApp.service:JqueryCoreService
 * @description
 * # MainCtrl
 * Controller of the liaFrontendApp
 */
angular.module('liaFrontendApp')
  .service('JqueryCoreService', function ($log, $rootScope) {
    var self = this;
    var tool = $("<div id='sub-menu-nav' style='position:fixed;z-index:9999;'></div>");

    /*
     * Functions
     */

    this.toggleSideBar = function () {
      var b = $("#sidebar-collapse")[0];
      var w = $("#cl-wrapper");
      var s = $(".cl-sidebar");

      if (w.hasClass("sb-collapsed")) {
        $(".fa", b).addClass("fa-angle-left").removeClass("fa-angle-right");
        w.removeClass("sb-collapsed");
        $.cookie('FLATDREAM_sidebar', 'open', {expires: 365, path: '/'});
      } else {
        $(".fa", b).removeClass("fa-angle-left").addClass("fa-angle-right");
        w.addClass("sb-collapsed");
        $.cookie('FLATDREAM_sidebar', 'closed', {expires: 365, path: '/'});
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - toggleSideBar');
      }
    };

    this.updateHeight = function () {
      if (!$("#cl-wrapper").hasClass("fixed-menu")) {
        var button = $("#cl-wrapper .collapse-button").outerHeight();
        var navH = $("#head-nav").height();
        //var document = $(document).height();
        var cont = $("#pcont").height();
        var sidebar = ($(window).width() > 755 && $(window).width() < 963) ? 0 : $("#cl-wrapper .menu-space .content").height();
        var windowH = $(window).height();

        if (sidebar < windowH && cont < windowH) {
          if (($(window).width() > 755 && $(window).width() < 963)) {
            var height = windowH;
          } else {
            var height = windowH - button;
          }
        } else if ((sidebar < cont && sidebar > windowH) || (sidebar < windowH && sidebar < cont)) {
          var height = cont + button;
        } else if (sidebar > windowH && sidebar > cont) {
          var height = sidebar + button;
        }

        $("#cl-wrapper .menu-space").css("min-height", height);
      } else {
        $("#cl-wrapper .nscroller").nanoScroller({preventPageScrolling: true});
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - updateHeight');
      }
    };

    this.handleSidebarAndContentHeight = function () {
      var content = $('.page-content');
      var sidebar = $('.cl-vnavigation');

      if (!content.attr("data-height")) {
        content.attr("data-height", content.height());
      }

      if (sidebar.height() > content.height()) {
        content.css("min-height", sidebar.height() + 120);
      } else {
        content.css("min-height", content.attr("data-height"));
      }

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - handleSidebarAndContentHeight');
      }

    };

    this.update_height = function () {
      var button = $("#cl-wrapper .collapse-button");
      var collapseH = button.outerHeight();
      var navH = $("#head-nav").height();
      var height = $(window).height() - ((button.is(":visible")) ? collapseH : 0);
      scroll.css("height", height);
      $("#cl-wrapper .nscroller").nanoScroller({preventPageScrolling: true});
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - update_height');
      }
    };

    /*
     * service wide function
     */

    function showMenu(_this, e) {
      if (($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul", _this).length > 0) {
        $(_this).removeClass("ocult");
        var menu = $("ul", _this);
        if (!$(".dropdown-header", _this).length) {
          var head = '<li class="dropdown-header">' + $(_this).children().html() + "</li>";
          menu.prepend(head);
        }

        tool.appendTo("body");
        var top = ($(_this).offset().top + 8) - $(window).scrollTop();
        var left = $(_this).width();

        tool.css({
          'top': top,
          'left': left + 8
        });
        tool.html('<ul class="sub-menu">' + menu.html() + '</ul>');
        tool.show();

        menu.css('top', top);
      } else {
        tool.hide();
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - showMenu');
      }
    };

    /*
     * Calls and anonymous Functions
     */

    this.fixedMenu = function () {
      if ($("#cl-wrapper").hasClass("fixed-menu")) {
        $('#head-nav').addClass('navbar-fixed-top');
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - fixedMenu');
      }
    };

    this.verticalMenu = function () {
      $(".cl-vnavigation li ul").each(function () {
        $(this).parent().addClass("parent");
      });

      $(".cl-vnavigation li ul li.active").each(function () {//If li.active is a sub-menu item open all its parents

        $(this).parents(".sub-menu").css({'display': 'block'});
        $(this).parents(".parent").addClass("open");

      });

      $('.cl-vnavigation li > a').on('click', function (e) {
        if ($(this).next().hasClass('sub-menu') === false) {
          return;
        }
        var parent = $(this).parent().parent();


        parent.children('li.open').children('a').children('.arrow').removeClass('open');
        parent.children('li.open').children('a').children('.arrow').removeClass('active');
        parent.children('li.open').children('.sub-menu').slideUp(200);
        parent.children('li').removeClass('open');
        if ($('#cl-wrapper').hasClass('sb-collapsed') === false) {
          var sub = jQuery(this).next();
          if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("active");
            sub.slideUp(200, function () {
              this.handleSidebarAndContentHeight;
            });
          } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200, function () {
              this.handleSidebarAndContentHeight;
            });
          }
        }
        e.preventDefault();
      });
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - verticalMenu');
      }
    };

    this.autoCloseMenu = function () {
      if ($('#cl-wrapper').hasClass('sb-collapsed')) {
        var elem = $('.cl-sidebar ul');
        elem.children('li.open').children('a').children('.arrow').removeClass('open');
        elem.children('li.open').children('a').children('.arrow').removeClass('active');
        elem.children('li.open').children('.sub-menu').slideUp(0);
        elem.children('li').removeClass('open');
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - autoCloseMenu');
      }
    };

    /*Small devices toggle*/
    this.smallDeviceToogle = function () {
      $(".cl-toggle").click(function (e) {
        var ul = $(".cl-vnavigation");
        ul.slideToggle(300, 'swing', function () {
        });
        e.preventDefault();
      });
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - smallDeviceToogle');
      }
    };

    /*Collapse sidebar*/
    this.sidebarCollape = function () {
      $("#sidebar-collapse").click(function () {
        this.toggleSideBar;
      });
      if ($("#cl-wrapper").hasClass("fixed-menu")) {
        var scroll = $("#cl-wrapper .menu-space");
        scroll.addClass("nano nscroller");
        $(window).resize(function () {
          this.update_height;
        });
        this.update_height;
        $("#cl-wrapper .nscroller").nanoScroller({preventPageScrolling: true});
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - sidebarCollape');
      }
    };


    /*SubMenu hover */

    this.subMenuHover = function () {
      $(".cl-vnavigation li").hover(function (e) {
        showMenu(this, e);
      }, function (e) {
        tool.removeClass("over");
        setTimeout(function () {
          if (!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0) {
            tool.hide();
          }
        }, 500);
      });
      tool.hover(function (e) {
        $(this).addClass("over");
      }, function () {
        $(this).removeClass("over");
        tool.fadeOut("fast");
      });
      $(document).click(function () {
        tool.hide();
      });
      $(document).on('touchstart click', function (e) {
        tool.fadeOut("fast");
      });
      tool.click(function (e) {
        e.stopPropagation();
      });
      $(".cl-vnavigation li").click(function (e) {
        if ((($("#cl-wrapper").hasClass("sb-collapsed") || ($(window).width() > 755 && $(window).width() < 963)) && $("ul", this).length > 0) && !($(window).width() < 755)) {
          showMenu(this, e);
          e.stopPropagation();
        }
      });

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - subMenuHover');
      }
    };


    /*Return to top*/
    this.returnToTop = function () {
      var offset = 220;
      var duration = 500;
      var button = $('<a href="#" class="back-to-top"><i class="fa fa-angle-up"></i></a>');
      button.appendTo("body");
      jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
          jQuery('.back-to-top').fadeIn(duration);
        } else {
          jQuery('.back-to-top').fadeOut(duration);
        }
      });
      jQuery('.back-to-top').click(function (event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
      });

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - returnToTop');
      }
    };

    this.ActivateTooltip = function () {
      /*Tooltips*/
      $('.ttip, [data-toggle="tooltip"]').tooltip();
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - ActivateTooltip');
      }
    };
    this.ActivatePopover = function () {
      /*Popover*/
      $('[data-popover="popover"]').popover();
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - ActivatePopover');
      }
    };

    /*
     * Activate Main Plugins
     */

    this.bodyAnimate = function () {
      if ($('body').hasClass('animated')) {
        $("#cl-wrapper").css({opacity: 1, 'margin-left': 0});
      }

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - bodyAnimate');
      }
    };

    this.portletActions = function () {
      /*Porlets Actions*/
      $('.minimize').click(function (e) {
        var h = $(this).parents(".header");
        var c = h.next('.content');
        var p = h.parent();
        c.slideToggle();
        p.toggleClass('closed');
        e.preventDefault();
      });

      $('.refresh').click(function (e) {
        var h = $(this).parents(".header");
        var p = h.parent();
        var loading = $('<div class="loading"><i class="fa fa-refresh fa-spin"></i></div>');

        loading.appendTo(p);
        loading.fadeIn();
        setTimeout(function () {
          loading.fadeOut();
        }, 1000);

        e.preventDefault();
      });

      $('.close-down').click(function (e) {
        var h = $(this).parents(".header");
        var p = h.parent();

        p.fadeOut(function () {
          $(this).remove();
        });
        e.preventDefault();
      });

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - portletActions');
      }
      /*End of porlets actions*/
    };


    this.cookieCollapse = function () {
      //Check cookie for menu collapse (ON DOCUMENT READY)
      if ($.cookie('FLATDREAM_sidebar') && $.cookie('FLATDREAM_sidebar') == 'closed') {
        $('#cl-wrapper').addClass('sb-collapsed');
        $('.fa', $('#sidebar-collapse')[0]).addClass('fa-angle-right').removeClass('fa-angle-left');
      }
      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - cookieCollapse');
      }
    };

    this.enableCheckboxes = function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
      });
    };

    this.initialize = function () {
      $log.debug('jquery core service - initialize');

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - initialize - start');
      }

      this.fixedMenu();
      this.verticalMenu();
      this.autoCloseMenu();
      this.smallDeviceToogle();
      this.sidebarCollape();
      this.subMenuHover();
      this.returnToTop();
      this.ActivateTooltip();
      this.ActivatePopover();
      this.bodyAnimate();
      this.portletActions();
      this.cookieCollapse();
      this.enableCheckboxes();

      if ($rootScope.jqueryDebugEnabled) {
        $log.info('jquery core - initialize - end');
      }
    }
  });

/* jshint ignore:end */

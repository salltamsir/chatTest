/* ====================================================
 * jQuery Is In Viewport.
 * https://github.com/frontid/jQueryIsInViewport
 * Marcelo Iván Tosco (capynet)
 * Inspired on https://stackoverflow.com/a/40658647/1413049
 * ==================================================== */
!function ($) {
  'use strict'

  var plugin

  var Class = function (el, cb) {
    plugin = this
    this.$el = $(el)
    this.cb = cb
    watch()
    return this
  }

  /**
   * Checks if the element is in.
   *
   * @returns {boolean}
   */
  function isIn () {
    var $win = $(window)
    var elementTop = plugin.$el.offset().top
    var elementBottom = elementTop + plugin.$el.outerHeight()
    var viewportTop = $win.scrollTop()
    var viewportBottom = viewportTop + $win.height()
    return elementBottom > viewportTop && elementTop < viewportBottom
  }

  /**
   * Launch a callback indicating when the element is in and when is out.
   */
  function watch () {
    var _isIn = false

    $(window).on('resize scroll', function () {

      if (isIn() && _isIn === false) {
        plugin.cb('entered')
        _isIn = true
      }

      if (_isIn === true && !isIn()) {
        plugin.cb('leaved')
        _isIn = false
      }

    })
  }

  // jQuery plugin.
  //-----------------------------------------------------------
  $.fn.isInViewport = function (cb) {
    return this.each(function () {
      var $element = $(this)
      var data = $element.data('isInViewport')
      if (!data) {
        $element.data('isInViewport', (new Class(this, cb)))
      }
    })
  }

}(window.jQuery)

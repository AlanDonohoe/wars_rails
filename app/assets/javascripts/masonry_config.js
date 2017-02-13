var masonryConfig = (function () {
  'use strict';

  return {
    init: function init() {
      // $('.grid').masonry({
      //   // options
      //   itemSelector: '.grid-item',
      //   columnWidth: 200
      // });
      // external js: masonry.pkgd.js

      $('.masonry-grid').masonry({
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer',
        percentPosition: true
      });

    }
  };
}());
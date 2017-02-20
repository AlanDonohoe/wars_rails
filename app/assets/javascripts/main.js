// File that replicates is in the non-rails, gulp/bower only version
$(function(){
  'use strict';
  //countDownTimer.init();
  masonryConfig.init();
  $('.tlt').textillate(
    {
      initialDelay: 1000,
      in: {
        // set the effect name
        effect: 'fadeInFlash',

        // set the delay factor applied to each consecutive character
        delayScale: 2.5,

        // set the delay between each character
        delay: 190,

        // set to true to animate all the characters at the same time
        sync: false,

        // randomize the character sequence
        // (note that shuffle doesn't make sense with sync = true)
        shuffle: true,

        // reverse the character sequence
        // (note that reverse doesn't make sense with sync = true)
        reverse: false,

        // callback that executes once the animation has finished
        callback: function () {}
      }
    }
  );
});
var countDownTimer = (function () {
  'use strict';

  return {
    init: function init() {
        $('.clock').countdownDigital({
            dateTo: '2016-10-23T20:00',
            labels: false,
            showBlank: true,
            showMSecs: true,
            seperatorChar: ',',
            pad: 10
        });

    setTimeout(function(){
        $('#main-container').show();
    }, 500);
    }
  };
}());
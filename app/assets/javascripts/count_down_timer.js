var countDownTimer = (function () {
  'use strict';

  return {
    init: function init() {
        $('.clock').countdownDigital({
            dateTo: '2016-09-23T20:00',
            labels: false,
            showBlank: true,
            showMSecs: true,
            seperatorChar: ','
        });

    setTimeout(function(){
        $('#main-container').show();
    }, 500);
    }
  };
}());
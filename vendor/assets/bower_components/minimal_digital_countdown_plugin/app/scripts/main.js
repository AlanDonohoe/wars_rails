(function (window, $) {
    'use strict';
    $.fn.countdownDigital = function (options) {

        // Default parameters
        var _defaults = $.extend({
            dateTo: '2016-06-21',
            dateNow: null,
            labels: false,
            showBlank: true,
            seperator: true,
            seperatorChar: ',',
            showMSecs: false,
            refreshRateMsecs: 0,
            pad: 8

        }, options);

        var _digits = [
            'zero',
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine'
        ];

        var _labels = [
            'seconds'
        ];

        var _mSecsRefreshDisplay;

        function pad(num, size) {
            // Add the leading zeros to the numbers
            var s = num + '';
            while (s.length < size) { s = '0' + s; }
            return s;
        }

        function addCommas(numbers) {
            if (_defaults.showMSecs === true && numbers.length > 4) { numbers.splice(numbers.length - 3, 0, 'colon'); }
            return numbers;
        }

        function drawCountdown(element) {

            var num, numSplit, numSplitWithCommas, isComma, isColon, digit, i;
            var dateTo = moment(_defaults.dateTo);
            var dateNow = (_defaults.dateNow === null) ? moment() : _defaults.dateNow;
            var dateDiff = _defaults.showMSecs === true ? dateTo.diff(dateNow) : dateTo.diff(dateNow, 'seconds');
            var digitHolder = $('<div class="_digits"></div>').appendTo(element);

            $.each(_labels, function(labelKey, labelVal) {
                if(dateDiff > 0) {
                    num = pad(dateDiff, _defaults.pad);
                    numSplit = num.toString().split('');
                } else {
                    numSplit = ['0', '0'];
                }
                numSplitWithCommas = addCommas(numSplit);
                var label = $('<div></div>', {
                    class: 'each ' + labelVal
                });
                $.each(numSplitWithCommas, function(numberKey, numberVal) {
                    isComma = (numberVal === 'comma') ? true : false;
                    isColon = (numberVal === 'colon') ? true : false;

                    if (isComma) {
                        digit = $('<div></div>', {
                            class: 'comma digit ' + labelVal + '_' + numberKey
                        });
                        digit.append('<span class="comma">' + _defaults.seperatorChar + '</span>');
                    } else if (isColon) {
                        digit = $('<div></div>', {
                            class: 'colon digit ' + labelVal + '_' + numberKey
                        });
                        digit.append('<span class="colon">.</span>');
                    } else {
                        digit = $('<div></div>', {
                            class: 'real-number digit ' + labelVal + '_' + numberKey
                        });
                        for(i = 1; i < 8; i += 1){
                            digit.append('<span class="side d' + i + '">');
                        }
                        if(dateDiff > 0) {
                            digit.addClass(_digits[numberVal]);
                        } else {
                            digit.addClass('zero');
                        }
                    }
                    digit.appendTo(label);
                });
                if (_defaults.labels) { label.append('<span class="text">' + labelVal + '</span>'); }
                label.append('<span class="dots"></span>');
                label.appendTo(digitHolder);
            });

        }

        function updateTime(element) {

            var dateTo = moment(_defaults.dateTo);
            var dateNow = (_defaults.dateNow === null) ? moment() : _defaults.dateNow;
            var dateDiff = _defaults.showMSecs === true ? dateTo.diff(dateNow) : dateTo.diff(dateNow, 'seconds');

            if(dateDiff > 0) {
                $.each(_labels, function(key, val){
                    var num = pad(dateDiff, _defaults.pad);
                    var numSplit = num.toString().split('');
                    var numSplitWithCommas = addCommas(numSplit);
                    var dig, isComma, isColon;

                    $.each(numSplitWithCommas, function(keyNo, valNo){
                      isComma = valNo === 'comma' ? true : false;
                      isColon = valNo === 'colon' ? true : false;
                        if (isComma) {
                            dig = $(element).find('.digit.' + val + '_' + keyNo);
                            dig.removeClass().addClass('comma digit ' + val + '_' + keyNo);
                        }
                        else if (isColon) {
                            dig = $(element).find('.digit.' + val + '_' + keyNo);
                            dig.removeClass().addClass('colon digit ' + val + '_' + keyNo);
                        } else {
                            dig = $(element).find('.digit.' + val + '_' + keyNo);
                            dig.removeClass().addClass('real-number digit ' + val + '_' + keyNo + ' ' + _digits[valNo]);
                        }
                    });
                });
            } else {
                $.each(_labels, function(){
                    var dig = $(element).find('.digit');
                    dig.addClass('zero');
                });
            }
        }

        function startCountdown(element) {
            setInterval(
                function() {
                    updateTime(element);
                }, _mSecsRefreshDisplay);
        }

        // Return instance
        return this.each(function(){

            var element = $(this);
            // only need to update display every second if we not showing msecs
            _mSecsRefreshDisplay = _defaults.showMSecs === true ? 210 : 1000;
            // override refreshRate if its been manually set
            _mSecsRefreshDisplay = _defaults.refreshRateMsecs > 0 ?
              _defaults.refreshRateMsecs : _mSecsRefreshDisplay;
            drawCountdown(element);
            startCountdown(element);
        });
    };

}(window, jQuery));

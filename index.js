/* globals define */

/**
 * @preserve seconds2timecode
 * https://github.com/sjwilliams/seconds2timecode
 * Copyright (c) 2016 Josh Williams; Licensed MIT
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function() {

  /**
   * Time in seconds to a formatted timecode string.
   * 
   * 19 -> 00:00:19 (or 00:19, 0:19, etc, based on padding)
   * 
   * @param  {Number} secs
   * @param  {Nummber} padding
   * @return {String} hh:mm:ss
   */
  return function(secs, padding){
    secs = parseInt(secs, 10);
    padding = (padding !== undefined && parseInt(padding, 10) > -1 && parseInt(padding, 10) < 7) ? parseInt(padding, 10) : 6; // default is the full 00:00:00 format

    var hours   = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - (hours * 3600)) / 60);
    var seconds = secs - (hours * 3600) - (minutes * 60);
    
    var hhmmss = '';

    // generated string in hhmmss format.
    [seconds, minutes, hours].forEach(function(unit, i){
      if (unit < 10) unit = '0'+unit;
      hhmmss = unit + hhmmss;
    });


    // drop all the leading zeros except for the ones used for padding
    var firstNoneZeroCharacterIndex = 0;
    for (var i = 0; i < hhmmss.length; i++) {
      if (hhmmss[i] != '0') {
        firstNoneZeroCharacterIndex = i;
        break;
      }
    }
    
    hhmmss = hhmmss.slice(firstNoneZeroCharacterIndex - (padding + (hhmmss.length)) );

    // add colons in. hhmmss to hh:mm:ss
    var formatted = '';
    for (var k = 0, len = hhmmss.length; k < len; k++) {
      if (k > 0 && k % 2 === 0) {
        formatted = hhmmss[len - 1 - k] + ':' +  formatted;
      } else {
        formatted = hhmmss[len - 1 - k] + formatted;
      }
    }

    return formatted.length == 2 ? '0:' + formatted : formatted;
  };
}));
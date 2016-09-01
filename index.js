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
    
    // zero pad if unit value is less then 10
    [hours, minutes, seconds].forEach(function(unit){
      if (unit < 10) {
        unit = "0"+unit;
      }
    });

    var formatted = hours+':'+minutes+':'+seconds;

    // honor padding setting
    var timecodeCharacters = formatted.split('').reverse();
    var timecodeCharactersFormatted = timecodeCharacters.slice( 0, timecodeCharacters.indexOf('0') + padding );

    // don't allow string to start with a ":"
    if (timecodeCharactersFormatted[timecodeCharactersFormatted.length - 1] === ':') {
      timecodeCharactersFormatted.pop();
    }

    return timecodeCharactersFormatted.reverse().join('');
  };
}));
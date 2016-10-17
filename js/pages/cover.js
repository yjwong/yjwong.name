/*!
 * Yong Jie's Website - pages/cover.js
 * http://yjwong.name
 * Copyright 2014 Wong Yong Jie
 */

(function () {
  'use strict';

  jQuery(document).on('ready', function () {
    jQuery('[data-toggle="tooltip"]').tooltip();
    
    // Set up the ambitions ticker.
    var ambitions = document.getElementsByClassName('ambition-ticker');
    var ambitionsTickCount = 0;
    var ambitionsTickerFunc = function () {
      var ambitionId = ambitionsTickCount % ambitions.length;
      var prevAmbitionId = ambitionId - 1;
      if (prevAmbitionId < 0) {
        prevAmbitionId = ambitions.length - 1;
      }
      
      jQuery(ambitions[prevAmbitionId]).hide();
      jQuery(ambitions[ambitionId]).show();
      
      ambitionsTickCount++;
      setTimeout(ambitionsTickerFunc, 2000);
    };
    
    ambitionsTickerFunc();
  });
} ());
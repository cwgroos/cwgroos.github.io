/*jslint browser: true*/
/*global $, jQuery*/

$(function () {
    'use strict';
    var BART = 'http://api.bart.gov/api/bsa.aspx', Key = 'MW9S-E7SL-26DU-VV8V';
        
    $.get(BART, {cmd: 'bsa', key: Key, date: 'today'}, function (data) {
        var type = $(data).find('type').text();
        
        if (type === 'DELAY') {
            // Display yellow delay alert
            $('p:last').after('<div class="alert alert-warning" role="alert">' + $(data).find('description').text() + '</div>');
        } else if (type === 'EMERGENCY') {
            // Display red delay alert
            $('p:last').after('<div class="alert alert-danger" role="alert">' + $(data).find('description').text() + '</div>');
        } else {
            // Display green alert box - everything should be OK if we get here
            $('p:last').after('<div class="alert alert-success" role="alert">' + $(data).find('description').text() + '</div>');
        }
    });
    
});
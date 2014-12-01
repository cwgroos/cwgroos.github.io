/*jslint browser: true*/
/*global $, jQuery*/

$(function () {
    'use strict';
    
    //$('p').each(function () {
    //    $(this).html('<b>' + this.innerHTML + '</b>');
    //});
    //$HTML.before('<b>TEST</b>');
    
    //$('p:first').html('<b>' + $HTML + '</b>');
    
    //$('p:last').html().after('</b>');
    var BART = 'http://api.bart.gov/api/bsa.aspx', Key = 'MW9S-E7SL-26DU-VV8V';
    
    //$.get(BART, 'cmd=bsa&key=' + Key + '&date=today', function (data) {
        //e.preventDefault();
        //$('p:last').after('<p>' + data + '</p>');
        //$('p:last').html(data);
        //var xmlDoc = $.parseXML(data), $xml = $(xmlDoc), $desc = $xml.find('description');
        
    $.get(BART, {cmd: 'bsa', key: Key, date: 'today'}, function (data) {
        var type = $(data).find('type').text();
        
        if (type === 'DELAY') {
            // Display yellow delay alert
            $('p:last').after('<p>' + $(data).find('description').text() + '</p>');
        } else if (type === 'EMERGENCY') {
            // Display red delay alert
            $('p:last').after('<p>' + $(data).find('description').text() + '</p>');
        } else {
            // Display green alert box - everything should be OK if we get here
            $('p:last').after('<div class="alert alert-success" role="alert">' + $(data).find('description').text() + '</div>');
        }
        //$('p:last').after('<p>' + $(data).find('time').text() + '</p>');
    });
    
});
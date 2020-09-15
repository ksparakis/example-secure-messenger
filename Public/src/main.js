"use strict";
var $ = require( "jquery" );
const mq = require('./repo/rabbit');
const view = require('./view/view');
const state = require('./repo/state');

// All app state as global variables this is flawed for many reasons,
// but for the sake of getting things done quickly going to do it this way.

var GLOBAL_STATE = new state();

$( document ).ready(function() {
    // Handler for .ready() called.
    //view.DrawDashboard();
    view.DrawWelcomeScreen();
    view.SetLoginPageListeners(GLOBAL_STATE);
});




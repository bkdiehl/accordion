"use strict";

var _Accordion = require("./modules/Accordion");

var accordion = new _Accordion.Accordion({
    accordion: ".accordion",
    activeClass: "active",
    // singleOpen: false,
    transitionTime: 300,
    transitionType: 'ease-in-out',
    selectors: [".selector", ".sub-selector", ".sub-selector2"],
    scrollToOffset: 30
});

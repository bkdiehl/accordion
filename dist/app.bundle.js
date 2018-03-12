/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _accordion = __webpack_require__(/*! ./modules/accordion */ \"./modules/accordion.js\");\n\nvar accordion = new _accordion.Accordion({\n    accordion: \".accordion\",\n    activeClass: \"active\",\n    // singleOpen: false,\n    transition: 300,\n    selectors: [\".selector\", \".sub-selector\", \".sub-selector2\"]\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./modules/accordion.js":
/*!******************************!*\
  !*** ./modules/accordion.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/*\r\n TO DO\r\n 1. SEE IF YOU NEED TO MOVE THE VIEWPORT IF THE CLICKED ELEMENT MOVES OUT OF VIEWPORT\r\n 2. ADD A STYLES OBJECT TO MORE EASILY APPLY/UNDERSTAND THE STYLES THAT ARE BEING ADDED/REMOVED\r\n*/\n\nvar Accordion = exports.Accordion = function () {\n\tfunction Accordion(options) {\n\t\tvar _this = this;\n\n\t\t_classCallCheck(this, Accordion);\n\n\t\t//plugin properties\n\t\tthis.accordion = document.querySelector(options.accordion);\n\t\tthis.activeClass = options.activeClass || \"active\";\n\t\tthis.singleOpen = options.singleOpen != undefined ? options.singleOpen : true;\n\t\tthis.transition = options.transition;\n\t\tthis.elements = options.selectors.reduce(function (obj, selector, index) {\n\t\t\tobj[index] = Array.from(_this.accordion.querySelectorAll(selector));\n\t\t\tobj[index].forEach(function (item) {\n\t\t\t\titem.dataset.level = index;\n\n\t\t\t\t//initial selector sibling element style (accordion items)\n\t\t\t\t_this.setSiblingStyles(item);\n\n\t\t\t\titem.addEventListener('click', function (e) {\n\t\t\t\t\tvar targetLvl = e.target.dataset.level;\n\t\t\t\t\t_this.elements[targetLvl].forEach(function (item) {\n\t\t\t\t\t\treturn item == e.target ? _this.toggle(item) : _this.close(item);\n\t\t\t\t\t});\n\t\t\t\t\t_this.setHeight();\n\t\t\t\t\t_this.isInViewport(e.target);\n\t\t\t\t});\n\t\t\t});\n\t\t\treturn obj;\n\t\t}, {});\n\t\tthis.layerCount = Object.keys(this.elements).length;\n\n\t\t//resize event to change accordion height when switching to a smaller screen\n\t\tvar resizeListener = void 0;\n\t\twindow.addEventListener('resize', function (e) {\n\t\t\tclearTimeout(resizeListener);\n\t\t\tresizeListener = setTimeout(function () {\n\t\t\t\t_this.setHeight();\n\t\t\t}, 100);\n\t\t});\n\t}\n\n\t_createClass(Accordion, [{\n\t\tkey: 'toggle',\n\t\tvalue: function toggle(elem) {\n\t\t\tvar _this2 = this;\n\n\t\t\tif (this.singleOpen) {\n\t\t\t\t//if only a single panel is allowed to be open, close all children panels\n\t\t\t\tvar activeChildren = Array.from(elem.nextElementSibling.querySelectorAll('.' + this.activeClass));\n\t\t\t\tif (activeChildren.length > 0) {\n\t\t\t\t\tactiveChildren.forEach(function (child) {\n\t\t\t\t\t\treturn child.classList.remove(_this2.activeClass);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t\telem.classList.toggle(this.activeClass);\n\t\t}\n\t}, {\n\t\tkey: 'close',\n\t\tvalue: function close(elem) {\n\t\t\tif (this.singleOpen) elem.classList.remove(this.activeClass);\n\t\t}\n\t}, {\n\t\tkey: 'setHeight',\n\t\tvalue: function setHeight() {\n\t\t\tvar _this3 = this;\n\n\t\t\tfor (var i = this.layerCount - 1; i >= 0; i--) {\n\t\t\t\t// for each layer of the accordion starting at the inner most layer\n\t\t\t\tthis.elements[i].forEach(function (elem) {\n\t\t\t\t\tvar sib = elem.nextElementSibling;\n\n\t\t\t\t\t//only change the height from 0 if it's the active accordion element\n\t\t\t\t\tif (elem.classList.contains(_this3.activeClass)) {\n\t\t\t\t\t\t//clone the node, append to elem, calc height, remove clone\t\t\t\t\n\t\t\t\t\t\tvar clone = sib.cloneNode(true);\n\t\t\t\t\t\tclone.style.height = null;\n\t\t\t\t\t\telem.appendChild(clone);\n\t\t\t\t\t\tsib.style.height = clone.offsetHeight + \"px\";\n\t\t\t\t\t\tclone.remove();\n\t\t\t\t\t} else {\n\t\t\t\t\t\tsib.style.height = 0;\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'isInViewport',\n\t\tvalue: function isInViewport(elem) {\n\t\t\tvar rect = elem.getBoundingClientRect();\n\t\t\tconsole.log(rect);\n\t\t}\n\t}, {\n\t\tkey: 'setSiblingStyles',\n\t\tvalue: function setSiblingStyles(elem) {\n\t\t\t//initial styles\n\t\t\tvar sib = elem.nextElementSibling;\n\t\t\tsib.style.overflow = 'hidden';\n\t\t\tsib.style.height = 0;\n\t\t\tsib.style.transition = this.transition / 1000 + 's';\n\t\t}\n\t}]);\n\n\treturn Accordion;\n}();\n\n//# sourceURL=webpack:///./modules/accordion.js?");

/***/ })

/******/ });
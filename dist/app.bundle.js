!function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=34)}([function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){var r=e(21)("wks"),i=e(6),o=e(0).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,n,e){t.exports=!e(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var e=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=e)},function(t,n){t.exports={}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var r=e(3);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var r=e(9),i=e(30),o=e(28),u=Object.defineProperty;n.f=e(2)?Object.defineProperty:function(t,n,e){if(r(t),n=o(n,!0),r(e),i)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(10),i=e(7);t.exports=e(2)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){var r=e(32);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){"use strict";e.r(n);e(33);function r(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"linear",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments[4],o={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return t<.5?2*t*t:(4-2*t)*t-1},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t}},u=window.pageYOffset,c="now"in window.performance?performance.now():(new Date).getTime(),a=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),f=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight,s="number"==typeof t?t:t.offsetTop-r,l=Math.round(a-s<f?a-f:s);if("requestAnimationFrame"in window==!1)return window.scroll(0,l),void(i&&i());!function t(){var r="now"in window.performance?performance.now():(new Date).getTime(),a=Math.min(1,(r-c)/n),f=o[e](a);window.scroll(0,Math.ceil(f*(l-u)+u)),window.pageYOffset!==l?requestAnimationFrame(t):i&&i()}()}var i=function(){function t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}();new(function(){function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.accordion=Array.from(document.querySelectorAll(n.accordion)),this.activeClass=n.activeClass||"active",this.singleOpen=void 0==n.singleOpen||n.singleOpen,this.transitionTime=n.transitionTime||300,this.transitionType=n.transitionType||"linear",this.transitionEnd,this.scrollToOffset=n.scrollToOffset||0,this.accordion.forEach(function(t){var r=n.selectors.reduce(function(n,i,o){return n[o]=Array.from(t.querySelectorAll(i)),n[o].forEach(function(t){null!=t.nextElementSibling&&"BR"==t.nextElementSibling.nodeName&&t.parentNode.removeChild(t.nextElementSibling),null!=t.nextElementSibling&&0!=t.nextElementSibling.children.length||(n[o]=n[o].filter(function(n){return n!=t}))}),n[o].forEach(function(t){t.dataset.level=o,e.setSiblingStyles(t),t.addEventListener("click",function(t){var n=t.target.dataset.level;r[n].forEach(function(n){return n==t.target?e.toggle(n):e.close(n)}),e.setHeight(r),e.isInViewport(t.target)})}),n},{})});var r=void 0;window.addEventListener("resize",function(t){clearTimeout(r),r=setTimeout(function(){e.setHeight()},100)})}return i(t,[{key:"toggle",value:function(t){var n=this;if(this.singleOpen){var e=Array.from(t.nextElementSibling.querySelectorAll("."+this.activeClass));e.length>0&&e.forEach(function(t){return t.classList.remove(n.activeClass)})}t.classList.toggle(this.activeClass)}},{key:"close",value:function(t){this.singleOpen&&t.classList.remove(this.activeClass)}},{key:"setHeight",value:function(t){for(var n=this,e=Object.keys(t).length-1;e>=0;e--)t[e].forEach(function(t){var e=t.nextElementSibling;if(t.classList.contains(n.activeClass)){var r=e.cloneNode(!0);r.style.height="auto",t.parentNode.appendChild(r),e.style.height=r.offsetHeight+"px",r.parentNode.removeChild(r)}else e.style.height=0})}},{key:"isInViewport",value:function(t){var n=this;t.classList.contains(this.activeClass)&&(clearTimeout(this.transitionEnd),this.transitionEnd=setTimeout(function(){var e=t.getBoundingClientRect(),i=t.nextElementSibling.getBoundingClientRect();e.top<0||e.height+i.height>=window.innerHeight?r(t,n.transitionTime,"linear",n.scrollToOffset):e.height+i.height<window.innerHeight&&window.innerWidth<768&&r(t.nextElementSibling,n.transitionTime,"linear",n.scrollToOffset)},this.transitionTime))}},{key:"setSiblingStyles",value:function(t){var n=t.nextElementSibling;n.style.overflow="hidden",n.style.height=0,n.style.transition=this.transitionTime/1e3+"s "+this.transitionType,t.parentNode.classList.add("accordion-item")}}]),t}())({accordion:".accordion",activeClass:"active",transitionTime:300,transitionType:"ease-in-out",selectors:[".accordion > li > strong",".accordion > li > ul > li > strong"],scrollToOffset:150})},function(t,n,e){var r=e(1)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!i)return!1;var e=!1;try{var o=[7],u=o[r]();u.next=function(){return{done:e=!0}},o[r]=function(){return u},t(o)}catch(t){}return e}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(15),i=e(1)("toStringTag"),o="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),i))?e:o?r(n):"Object"==(u=r(n))&&"function"==typeof n.callee?"Arguments":u}},function(t,n,e){var r=e(16),i=e(1)("iterator"),o=e(5);t.exports=e(4).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,n,e){"use strict";var r=e(10),i=e(7);t.exports=function(t,n,e){n in t?r.f(t,n,i(0,e)):t[n]=e}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n,e){var r=e(19),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,n,e){var r=e(0),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,e){var r=e(5),i=e(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,n,e){var r=e(9);t.exports=function(t,n,e,i){try{return i?n(r(e)[0],e[1]):n(e)}catch(n){var o=t.return;throw void 0!==o&&r(o.call(t)),n}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var r=e(24);t.exports=function(t){return Object(r(t))}},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(0),i=e(11),o=e(26),u=e(6)("src"),c=Function.toString,a=(""+c).split("toString");e(4).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var f="function"==typeof e;f&&(o(e,"name")||i(e,"name",n)),t[n]!==e&&(f&&(o(e,u)||i(e,u,t[n]?""+t[n]:a.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:i(t,n,e):(delete t[n],i(t,n,e)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,n,e){var r=e(3);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){var r=e(3),i=e(0).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,n,e){t.exports=!e(2)&&!e(8)(function(){return 7!=Object.defineProperty(e(29)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(0),i=e(4),o=e(11),u=e(27),c=e(12),a=function(t,n,e){var f,s,l,p,d=t&a.F,h=t&a.G,v=t&a.S,g=t&a.P,y=t&a.B,m=h?r:v?r[n]||(r[n]={}):(r[n]||{}).prototype,w=h?i:i[n]||(i[n]={}),x=w.prototype||(w.prototype={});for(f in h&&(e=n),e)l=((s=!d&&m&&void 0!==m[f])?m:e)[f],p=y&&s?c(l,r):g&&"function"==typeof l?c(Function.call,l):l,m&&u(m,f,l,t&a.U),w[f]!=l&&o(w,f,p),g&&x[f]!=l&&(x[f]=l)};r.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){"use strict";var r=e(12),i=e(31),o=e(25),u=e(23),c=e(22),a=e(20),f=e(18),s=e(17);i(i.S+i.F*!e(14)(function(t){Array.from(t)}),"Array",{from:function(t){var n,e,i,l,p=o(t),d="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,g=void 0!==v,y=0,m=s(p);if(g&&(v=r(v,h>2?arguments[2]:void 0,2)),void 0==m||d==Array&&c(m))for(e=new d(n=a(p.length));n>y;y++)f(e,y,g?v(p[y],y):p[y]);else for(l=m.call(p),e=new d;!(i=l.next()).done;y++)f(e,y,g?u(l,v,[i.value,y],!0):i.value);return e.length=y,e}})},function(t,n,e){e(13),t.exports=e(39)},,,,,function(t,n){}]);
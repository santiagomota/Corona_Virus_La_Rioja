"use strict";!function(l){var t="offset",e="client",o=function(){},i=void 0===l.addEventListener,u={loopDelay:50,maxLoop:5,debug:!0,found:o,notfound:o,complete:o};var r=function(){var r={};this.addUrl=function(t){return r[t]={url:t,state:"pending",format:null,data:null,result:null},r[t]},this.setResult=function(t,e,n){var o=r[t];if(null==o&&(o=this.addUrl(t)),o.state=e,null!=n){if("string"==typeof n)try{n=function(e){var n;try{n=JSON.parse(e)}catch(t){try{n=new Function("return "+e)()}catch(t){y("Failed secondary JSON parse",!0)}}return n}(n),o.format="json"}catch(t){o.format="easylist"}return o.data=n,o}o.result=null}},a=[],s=null,d={cssClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links"},c={nullProps:[t+"Parent"],zeroProps:[]};c.zeroProps=[t+"Height",t+"Left",t+"Top",t+"Width",t+"Height",e+"Height",e+"Width"];var n={quick:null,remote:null},f=null,p={test:0,download:0};function m(t){return"function"==typeof t}function y(t,e){(u.debug||e)&&l.console&&l.console.log&&(e?console.error("[ABD] "+t):console.log("[ABD] "+t))}function v(t){y("start beginTest"),1!=f&&(!0,b(t),n.quick="testing",p.test=setTimeout(function(){!function t(e,n){var o;var r=document.body;var l=!1;null==s&&(y("recast bait"),b(e||d));if("string"==typeof e)return y("invalid bait used",!0),void(g()&&setTimeout(function(){!1},5));0<p.test&&(clearTimeout(p.test),p.test=0);null!==r.getAttribute("abp")&&(y("found adblock body attribute"),l=!0);for(o=0;o<c.nullProps.length;o++){if(null==s[c.nullProps[o]]){4<n&&(l=!0),y("found adblock null attr: "+c.nullProps[o]);break}if(1==l)break}for(o=0;o<c.zeroProps.length&&1!=l;o++)0==s[c.zeroProps[o]]&&(4<n&&(l=!0),y("found adblock zero attr: "+c.zeroProps[o]));if(void 0!==window.getComputedStyle){var i=window.getComputedStyle(s,null);"none"!=i.getPropertyValue("display")&&"hidden"!=i.getPropertyValue("visibility")||(4<n&&(l=!0),y("found adblock computedStyle indicator"))}!0;l||n++>=u.maxLoop?(y("exiting test loop - value: "+(f=l)),function(){var t,e;if(null===f)return;for(t=0;t<a.length;t++){e=a[t];try{null!=e&&(m(e.complete)&&e.complete(f),f&&m(e.found)?e.found():!1===f&&m(e.notfound)&&e.notfound())}catch(t){y("Failure in notify listeners "+t.Message,!0)}}}(),g()&&setTimeout(function(){!1},5)):p.test=setTimeout(function(){t(e,n)},u.loopDelay)}(t,1)},5))}function b(t){var e,n=document.body,o="width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;";if(null!=t&&"string"!=typeof t){for(null!=t.style&&(o+=t.style),s=function(t,e){var n,o,r=e;if(o=document.createElement(t),r)for(n in r)r.hasOwnProperty(n)&&o.setAttribute(n,r[n]);return o}("div",{class:t.cssClass,style:o}),y("adding bait node to DOM"),n.appendChild(s),e=0;e<c.nullProps.length;e++)s[c.nullProps[e]];for(e=0;e<c.zeroProps.length;e++)s[c.zeroProps[e]]}else y("invalid bait being cast")}function g(){if(null===s)return!0;try{m(s.remove)&&s.remove(),document.body.removeChild(s)}catch(t){}return!(s=null)}function h(){var t,e,n,o,r=u.fireNow||!0;document.readyState&&"complete"==document.readyState&&(r=!0),t=function(){v(d)},r?t():(e=l,n="load",o=t,i?e.attachEvent("on"+n,o):e.addEventListener(n,o,!1))}var P={version:"1.0",init:function(t){var e,n;if(t){for(e in n={complete:o,found:o,notfound:o},t)t.hasOwnProperty(e)&&("complete"==e||"found"==e||"notFound"==e?n[e.toLowerCase()]=t[e]:u[e]=t[e]);a.push(n),new r,h()}}};l.adblockDetector=P}(window);
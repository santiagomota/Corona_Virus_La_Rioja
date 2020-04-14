webpackJsonpVoonto([11],{78:function(e,n){
/*! Case - v1.6.1 - 2019-01-11
* Copyright (c) 2019 Nathan Bubna; Licensed MIT, GPL */
(function(){"use strict";var n=function(e,n){return n=n||"",e.replace(/(^|-)/g,"$1\\u"+n).replace(/,/g,"\\u"+n)},r=n("20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7","00"),t="a-z"+n("DF-F6,F8-FF","00"),l="A-Z"+n("C0-D6,D8-DE","00"),p=function(e,n,p,o){return e=e||r,n=n||t,p=p||l,o=o||"A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via",{capitalize:new RegExp("(^|["+e+"])(["+n+"])","g"),pascal:new RegExp("(^|["+e+"])+(["+n+p+"])","g"),fill:new RegExp("["+e+"]+(.|$)","g"),sentence:new RegExp('(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")(['+n+"])","g"),improper:new RegExp("\\b("+o+")\\b","g"),relax:new RegExp("([^"+p+"])(["+p+"]*)(["+p+"])(?=[^"+p+"]|$)","g"),upper:new RegExp("^[^"+n+"]+$"),hole:/[^\s]\s[^\s]/,apostrophe:/'/g,room:new RegExp("["+e+"]")}},o=p(),c={re:o,unicodes:n,regexps:p,types:[],up:String.prototype.toUpperCase,low:String.prototype.toLowerCase,cap:function(e){return c.up.call(e.charAt(0))+e.slice(1)},decap:function(e){return c.low.call(e.charAt(0))+e.slice(1)},deapostrophe:function(e){return e.replace(o.apostrophe,"")},fill:function(e,n,r){return null!=n&&(e=e.replace(o.fill,function(e,r){return r?n+r:""})),r&&(e=c.deapostrophe(e)),e},prep:function(e,n,r,t){if(e=null==e?"":e+"",!t&&o.upper.test(e)&&(e=c.low.call(e)),!n&&!o.hole.test(e)){var l=c.fill(e," ");o.hole.test(l)&&(e=l)}return r||o.room.test(e)||(e=e.replace(o.relax,c.relax)),e},relax:function(e,n,r,t){return n+" "+(r?r+" ":"")+t}},u={_:c,of:function(e){for(var n=0,r=c.types.length;n<r;n++)if(u[c.types[n]].apply(u,arguments)===e)return c.types[n]},flip:function(e){return e.replace(/\w/g,function(e){return(e==c.up.call(e)?c.low:c.up).call(e)})},random:function(e){return e.replace(/\w/g,function(e){return(Math.round(Math.random())?c.up:c.low).call(e)})},type:function(e,n){u[e]=n,c.types.push(e)}},a={lower:function(e,n,r){return c.fill(c.low.call(c.prep(e,n)),n,r)},snake:function(e){return u.lower(e,"_",!0)},constant:function(e){return u.upper(e,"_",!0)},camel:function(e){return c.decap(u.pascal(e))},kebab:function(e){return u.lower(e,"-",!0)},upper:function(e,n,r){return c.fill(c.up.call(c.prep(e,n,!1,!0)),n,r)},capital:function(e,n,r){return c.fill(c.prep(e).replace(o.capitalize,function(e,n,r){return n+c.up.call(r)}),n,r)},header:function(e){return u.capital(e,"-",!0)},pascal:function(e){return c.fill(c.prep(e,!1,!0).replace(o.pascal,function(e,n,r){return c.up.call(r)}),"",!0)},title:function(e){return u.capital(e).replace(o.improper,function(e,n,r,t){return r>0&&r<t.lastIndexOf(" ")?c.low.call(e):e})},sentence:function(e,n,r){return e=u.lower(e).replace(o.sentence,function(e,n,r){return n+c.up.call(r)}),n&&n.forEach(function(n){e=e.replace(new RegExp("\\b"+u.lower(n)+"\\b","g"),c.cap)}),r&&r.forEach(function(n){e=e.replace(new RegExp("(\\b"+u.lower(n)+"\\. +)(\\w)"),function(e,n,r){return n+c.low.call(r)})}),e}};for(var i in a.squish=a.pascal,a)u.type(i,a[i]);var f="function"==typeof f?f:function(){};f("object"==typeof e&&e.exports?e.exports=u:this.Case=u)}).call(this)}});
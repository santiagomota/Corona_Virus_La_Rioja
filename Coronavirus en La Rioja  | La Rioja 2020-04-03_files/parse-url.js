webpackJsonpVoonto([5],{174:function(t,r,e){"use strict";t.exports=function(t,r){!0===r&&(r=0);var e=t.indexOf("://"),n=t.substring(0,e).split("+").filter(Boolean);return"number"==typeof r?n[r]:n}},381:function(t,r,e){"use strict";var n=e(174);t.exports=function t(r){if(Array.isArray(r))return-1!==r.indexOf("ssh")||-1!==r.indexOf("rsync");if("string"!=typeof r)return!1;var e=n(r);return r=r.substring(r.indexOf("://")+3),!!t(e)||r.indexOf("@")<r.indexOf(":")}},76:function(t,r,e){"use strict";var n=e(174),s=e(381);t.exports=function(t){var r={protocols:n(t),protocol:null,port:null,resource:"",user:"",pathname:"",hash:"",search:"",href:t},e=t.indexOf("://"),o=null,i=null;return t.startsWith(".")&&(t.startsWith("./")&&(t=t.substring(2)),r.pathname=t,r.protocol="file"),r.protocol=r.protocol||r.protocols[0]||(s(t)?"ssh":"/"===t.charAt(1)?(t=t.substring(2))&&"":"file"),-1!==e&&(t=t.substring(e+3)),i=t.split("/"),"file"!==r.protocol&&(r.resource=i.shift()),2===(o=r.resource.split("@")).length&&(r.user=o[0],r.resource=o[1]),2===(o=r.resource.split(":")).length&&(r.resource=o[0],r.port=parseInt(o[1]),isNaN(r.port)&&(r.port=null,i.unshift(o[1]))),i=i.filter(Boolean),r.pathname=r.pathname||("file"!==r.protocol||"/"===r.href[0]?"/":"")+i.join("/"),2===(o=r.pathname.split("#")).length&&(r.pathname=o[0],r.hash=o[1]),2===(o=r.pathname.split("?")).length&&(r.pathname=o[0],r.search=o[1]),r}}});
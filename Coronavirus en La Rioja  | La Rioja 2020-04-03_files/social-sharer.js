(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{41:function(e,t,n){"use strict";n.r(t);var i=n(21),a=n.n(i),c=n(20),o=n.n(c),r=n(2),s=n.n(r),u=n(3),d=n.n(u),l=n(0),h=screen.width/2-250,p="top=".concat(125,", width=").concat(500,",\n  left=").concat(h,", height=").concat(350,", toolbar=").concat(0,",\n  menubar=").concat(0,", titlebar=").concat(0,", status=").concat(0),m=/(twitter)@(\w*)/,f=l.Base.app().lookup("vocento.site.content.section"),w=function(){function e(t){s()(this,e),this.containers=t}return d()(e,[{key:"run",value:function(){var e=this;o()(this.containers).forEach((function(t){e.element$=t,e.init()}))}},{key:"init",value:function(){var e=this.element$.getAttribute("data-voc-social-sharer"),t=this.element$.getAttribute("data-share-url")||document.location.href;if(this._url=this._checkSite(t.split("#")[0]),this._typeButton=this.element$.getAttribute("data-voc-type-button"),m.test(e)){var n=e.split("@"),i=a()(n,2);e=i[0],this._twitterUser=i[1]}this._addEventListener(e)}},{key:"_addEventListener",value:function(e){switch(e){case"facebook":this.element$.addEventListener("click",this.onFacebook.bind(this));break;case"twitter":this.element$.addEventListener("click",this.onTwitter.bind(this));break;case"linkedin":this.element$.addEventListener("click",this.onLinkedIn.bind(this));break;case"mail":this.element$.addEventListener("click",this.onMail.bind(this));break;case"whatsapp":this.element$.setAttribute("action","share/whatsapp/share"),this.element$.addEventListener("click",this.onWhatsapp.bind(this))}}},{key:"section",value:function(){return"string"==typeof f?f.trim().replace(/ /g,"-"):""}},{key:"generateTagHash",value:function(e){return"#vca=".concat(this._typeButton,"&vso=rrss&vmc=").concat(e,"&vli=").concat(this.section())}},{key:"onFacebook",value:function(){var e=this.generateTagHash("fb");window.open("//www.facebook.com/sharer.php?u=".concat(encodeURIComponent(this._url+e)),"popup",p)}},{key:"onTwitter",value:function(){var e=this.generateTagHash("tw"),t=this._twitterUser?"&via=".concat(this._twitterUser):this._checkTwitterUser()?this._checkTwitterUser():"";window.open("//twitter.com/share?text=".concat(encodeURI(this._getTitle()),"&url=").concat(encodeURIComponent(this._url+e)).concat(t),"popup",p)}},{key:"onLinkedIn",value:function(){var e=this.generateTagHash("lk");window.open("//www.linkedin.com/shareArticle?url=".concat(encodeURIComponent(this._url+e)),"popup",p)}},{key:"_getQueryParamsForOnMailUrl",value:function(){var e=this._getEditions(),t=this.generateTagHash("em"),n=encodeURIComponent(this._url+t),i=e&&e.hasEditions?"&":"?",a=encodeURIComponent(this._getTitle()),c=encodeURIComponent(document.location.origin),o=document.querySelector('meta[name="description"]'),r=document.querySelector('meta[name="title"]');return[n,i,a,c,r?encodeURIComponent(r.getAttribute("content")):"",o?encodeURIComponent(o.getAttribute("content")):"",encodeURIComponent("ns_campaign=rrss&ns_mchannel=boton&ns_fee=0&ns_source=em&ns_linkname=undefined"),document.querySelector('meta[name="twitter:site"]')?encodeURIComponent(document.querySelector('meta[name="twitter:site"]').content.slice(1)):""]}},{key:"onMail",value:function(){var e,t,n,i,c,o,r,s,u=this._getQueryParamsForOnMailUrl(),d=a()(u,8);e=d[0],t=d[1],n=d[2],i=d[3],c=d[4],o=d[5],r=d[6],s=d[7],window.open("//www.addthis.com/tellfriend_v2.php?v=300&winname=addthis&pub=ra-537cb4845172d4ab&source=men-300&lng=es&s=email&url=".concat(e).concat(t).concat(r,"&title=").concat(n,"&ate=AT-ra-537cb4845172d4ab/-/-/58f8b5fff498d9d5/2&uid=58f87b3c13039483&description=").concat(o,"&ufbl=1&ct=0&ui_email_to=&ui_email_from=&ui_email_note=&pre=").concat(i,"&tt=0&captcha_provider=recaptcha2&pro=0&ats=passthrough=twitter=via=").concat(s,"&text=").concat(c,"&imp_url=0&smd=rsi=&gen=0&rsc=&dr=").concat(i,"&sta=AT-ra-537cb4845172d4ab/-/-/58f8b5fff498d9d5/1&hideEmailSharingConfirmation=undefined&service=email&media=undefined&email_template=undefined&email_vars=undefined&atc=pubid=ra-537cb4845172d4ab&ui_language=es&data_track_clickback=false&data_track_addressbar=false&ui_click=false&product=undefined&widgetId=undefined&ui_pane=email&rb=false"))}},{key:"onWhatsapp",value:function(){var e=this.generateTagHash("wh");window.open("whatsapp://send?text=".concat(encodeURIComponent(this._url+e)),"popup",p)}},{key:"_checkSite",value:function(e){var t=this._getEditions();return-1===location.search.indexOf("edtn")&&t&&t.hasEditions?"".concat(e,"?").concat(t.queryString,"=").concat(t.current):e}},{key:"_getTitle",value:function(){var e=document.querySelector('meta[name="twitter:title"]');return e?e.content:document.title}},{key:"_checkTwitterUser",value:function(){var e=document.querySelector('meta[name="twitter:site"]');return e&&e.content?"&via=".concat(e.content.slice(1)):""}},{key:"_getEditions",value:function(){return l.Base.app().lookup("vocento.site.editions")}}]),e}();t.default=w}}]);
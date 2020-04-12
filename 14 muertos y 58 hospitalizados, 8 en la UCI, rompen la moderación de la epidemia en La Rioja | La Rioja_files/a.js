(function () {
    var Pixel=function (host,token) {

        function randomString(length) {
            var result = "";
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i = 0; i < length; i++) {
                result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            return result;
        }

        function getScreenDimensions() {
            var width = 0;
            var height = 0;

            if(window.screen.availWidth && window.screen.width) {
                width = window.screen.availWidth > window.screen.width ? window.screen.width : window.screen.availWidth;
            } else {
                width = window.screen.availWidth || window.screen.width;
            }

            if(window.innerWidth && window.innerWidth < width) {
                width = window.innerWidth;
            }

            if(window.screen.availHeight && window.screen.height) {
                height = window.screen.availHeight > window.screen.height ? window.screen.height : window.screen.availHeight;
            } else {
                height = window.screen.availHeight || window.screen.height;
            }

            if(window.innerHeight && window.innerHeight < height) {
                height = window.innerHeight;
            }

            // Check orientation
            if(window.innerWidth / window.innerHeight > 1) {
                return {
                    width: width > height ? width : height,
                    height: height < width ? height : width
                };
            } else {
                return {
                    width: width < height ? width : height,
                    height: height > width ? height : width
                };
            }
        }
        function getPageHeight() {
            var body = document.body || {};
            var html = document.documentElement || {};

            return Math.max(
                body.scrollHeight || 0,
                body.offsetHeight || 0,
                html.clientHeight || 0,
                html.scrollHeight || 0,
                html.offsetHeight || 0
            );
        }
        function calculateScrollPercent() {

            var body = document.body || {};
            var html = document.documentElement || {};

            var screenDimensions = getScreenDimensions();
            var pageHeight = getPageHeight();

            var scrollTop = html.scrollTop || body.scrollTop || window.pageYOffset || 0;
            var scrollDown = Math.min(scrollTop + screenDimensions.height, pageHeight);

            var scrollPercent = 0;
            if(pageHeight > 0) {
                scrollPercent = (scrollDown / pageHeight) * 100;
            }

            // scrollPercent: 0 <= x <= 100
            return scrollPercent;
        }

        if(!host||!token) return;

        if(host.indexOf(".spxl.socy.es", host.length - ".spxl.socy.es".length) < 0) {
            host = "json.spxl.socy.es";
        }

        this.token      = token;
        this.host       = host;
        this.referrer   = document.referrer;
        this.time_init  = Date.now()/1000;
      	this.counter = 0;

        var $pixel=this;
        var $mat=$pixel.mat=null;

        this.getCookie=function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if    (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        };
        this.setCookie=function (cname, cvalue, exhours) {
          var d = new Date();
          d.setTime(d.getTime() + (exhours*60*60*1000));
          var expires = "expires="+ d.toUTCString();
           if (cname != "md_pxl_n") {
            	document.cookie = cname + "=";
            	document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            	document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
            	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            	//document.cookie = cname + "=" + cvalue + ";" + expires;
           } else {
             	////// seteamos mat_n con local storage
             	localStorage.setItem("md_pxl_n", cvalue);
             	localStorage.setItem("md_pxl_n_expires", expires);
             	
           }
        };
        this.serialize=function (obj) {
            var str = "";
            for (var key in obj) {
                if (str != "") str += "&";
                str += key + "=" + encodeURIComponent(obj[key]);
            }
            return str;
        };
        this.get=function (url,dataObject,callback,errorCallback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    if(typeof callback==="function") callback(xhr.responseText);
                }
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                    if(typeof errorCallback==="function") errorCallback(xhr.responseText);
                }
            };
            xhr.open("GET", url+"?"+this.serialize(dataObject), true);
            xhr.send();
        };
        this.getWithCredentials=function (url,dataObject,callback,errorCallback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    if(typeof callback==="function") callback(xhr.responseText);
                }
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                    if(typeof errorCallback==="function") errorCallback(xhr.responseText);
                }
            };
            xhr.withCredentials = true;
            xhr.open("GET", url+"?"+this.serialize(dataObject), true);
            xhr.send();
        };
        this.getJSON=function (url,dataObject,callback,errorCallback) {
            this.get(url,dataObject,function (data) {
                callback(JSON.parse(data));
            },function (data) {
                if(typeof errorCallback==="function") errorCallback(JSON.parse(data));
            });
        };
        this.getJSONWithCredentials=function (url,dataObject,callback,errorCallback) {
            this.getWithCredentials(url,dataObject,function (data) {
                callback(JSON.parse(data));
            },function (data) {
                if(typeof errorCallback==="function") errorCallback(JSON.parse(data));
            });
        };
      
        this.ping=function (seconds, id_media) {
            if(!this.idv) return;

            if(typeof seconds !=="number") seconds=0;
            if(seconds===0) return;

            var $this=this;
          
            window.setTimeout(function () {
              	
              	$pixel.counter = $pixel.counter + 1;
              	
                $pixel.get("https://ping1.socy.es/ping.json",{
                    idv:$pixel.idv,
                    t  :$pixel.token,
                    time:Math.floor(Date.now()/1000-$this.time_init),
                    prof:Math.floor($pixel.maxScroll),
                  	c: $pixel.counter,
                  	i: id_media,
                  	a: Math.floor(Date.now()/1000)
                },function (pingObject) {
                    $pixel.ping(seconds, id_media);
                });
            },seconds*1000);
        };

        this._ga  = this.getCookie("_ga");
        this._gid = this.getCookie("_gid");
        this.maxScroll=calculateScrollPercent();
        this._uid = this._ga || this._gid || this.getCookie("__bs_id") || ("bs.1.0."+randomString(12));
        this.setCookie("__bs_id", this._uid, 8760);

        // init
        var data= {
            t:      $pixel.token,
            r:      $pixel.referrer,
            _ga:    $pixel._ga,
            _gid:   $pixel._gid,
            _uid:   $pixel._uid
        };

        /// TODO coger dominio solo (sin subdominios)
        if(document.referrer===""|| (document.referrer.indexOf(window.location.host)<0 && document.referrer.indexOf("traffic.besocy.com")<0)) {
            sessionStorage.setItem("original_visit","");
        }

        /// Transmitirle los valores conseguidos en cookies
        // if(!!$pixel.getCookie("mat_n"))              data.n               = $pixel.getCookie("mat_n");
      	if(!!localStorage.getItem("md_pxl_n"))          data.n               = localStorage.getItem("md_pxl_n");
        if(!!sessionStorage.getItem("matSessionID"))    data.matSession      = sessionStorage.getItem("matSessionID");
        if(!!sessionStorage.getItem("original_visit"))  data.original_visit  = sessionStorage.getItem("original_visit");

        var camp_id, url_search, tc;

        // Conseguir tracking code
        if (!!location.search) {

            url_search = new URLSearchParams(location.search);
            tc = url_search.get("_tcode");
            camp_id = url_search.get("sp_ad");

            if (!!tc) {
                data._tcode = tc;
            }
        }

        if (!!location.hash) {

            url_search = new URLSearchParams(location.hash.replace("#",""));
            tc = url_search.get("_tcode");
            camp_id = url_search.get("sp_ad");

            if (!!tc) {
                data._tcode = tc;
            }
        }

        dt_spxl_CO = {
            camp_id: camp_id,
            getData: function () {

                var that = this;

                return new Promise(function (resolve, reject) {
                    try {

                        if(! that.camp_id) {
                            reject({error:0, error_msg:"Not campaign found"});
                            return;
                        }

                        var request = new XMLHttpRequest();

                        request.open('GET', "https://co.socy.es/"+that.camp_id, true);
                        request.onload = function() {
                            if (request.status >= 200 && request.status < 400) {
                                if (data = JSON.parse(request.responseText)) {
                                    resolve(data);
                                } else {
                                    reject({error:2, error_msg:"json parse error"});
                                }
                            } else {
                                reject({error:1, error_msg:"http error"});
                            }
                        };

                        request.onerror = function() {
                            reject({error:1, error_msg:"http error"});
                        };

                        request.send();

                    } catch (e) {
                        reject(e);
                    }
                });
            }
        };

        // Se hace la petición al servidor de una visita
        $pixel.getJSON("https://"+host+"/pixel.json", data, function (responseData) {

            var data=responseData;

            $pixel.idv        = data.__IDV__;
            $pixel.browserId  = data.__NAVEGADOR__;
            $pixel.cookies    = data.__COOKIES__; /// Mientras sigamos en el paradigma de activacion por cookie
            $pixel.medio      = data.__MEDIADATA__;
            $pixel.adsocyTest = data.__ADSOCY_TEST__;

            // Set adsocyTest as session storage
            $pixel.adsocyTest = !!$pixel.adsocyTest ? JSON.stringify($pixel.adsocyTest) : '';
            if (!!$pixel.adsocyTest) {
                sessionStorage.setItem("adsocy_test", $pixel.adsocyTest);
            }

            // Set cookies as local cookies
            for (var cookie in $pixel.cookies) {
                if(!$pixel.cookies[cookie] || $pixel.cookies[cookie]=="false") {
                    $pixel.setCookie(cookie,$pixel.cookies[cookie],0);
                } else $pixel.setCookie(cookie,$pixel.cookies[cookie],148);
            }

            if ($pixel.idv) {

                // Excepciones
                if(window.location.href.indexOf("ref=iframe")>-1||!!window.frameElement) return; // Si está en iframe
                //if(typeof $ !== "function") return; // Si no hay jquery

                /// Comienza trackeo de duración y profundidad
                if($pixel.medio && $pixel.medio.ping && $pixel.medio.ping>0) $pixel.ping(parseInt($pixel.medio.ping),parseInt($pixel.medio.id));

                //// Si es externo se graba en una variable el idv
                if(document.referrer===""|| (document.referrer.indexOf(window.location.host)<0 && document.referrer.indexOf("traffic.besocy.com")<0)) {
                    sessionStorage.setItem("original_visit",$pixel.idv);
                }

                // Calcular la profundidad
                window.onscroll=function () {
                    var actualScroll=calculateScrollPercent();
                    if(actualScroll>$pixel.maxScroll) $pixel.maxScroll=actualScroll;
                };

                function loadMAT() {
                    if(typeof Mat != 'undefined' && window.__mat_data) {
                        $mat=$pixel.mat=new Mat($pixel,window.__mat_data);
                    }
                }

                function getMAT(endpoint, styles, script, noCacheEndpoint) {
                    //if (!!$pixel.getCookie("_MAT_TK_") && $pixel.getCookie("_MAT_TK_").substring(0,4)!=="void" && $pixel.medio.id && !window.frameElement&& /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                    if (!!$pixel.getCookie("_MAT_TK_") && $pixel.getCookie("_MAT_TK_").substring(0,4)!=="void" && $pixel.medio.id && !window.frameElement) {
                        /// Llamada para conseguir el json de mat
                        var metaKeywords=document.querySelector("meta[name='keywords']");

                        if(!endpoint) {
                            endpoint = "https://mat.socy.es/mat.json";
                        }

                        if(!styles) {
                            styles = "https://mat.socy.es/mat/css/"+$pixel.token+"?mat_token="+$pixel.getCookie("_MAT_TK_");
                        }

                        if(!script) {
                            script="https://mat.socy.es/mat/js/"+$pixel.token+"?mat_token="+$pixel.getCookie("_MAT_TK_");
                        }

                        /// MAT CSS
                        var link, dlink= document.getElementsByTagName("link")[0];

                        link = document.createElement("link");
                        link.id = 'mat-styles';
                        link.rel="stylesheet";
                        link.href=styles;

                        dlink.parentNode.insertBefore(link, dlink);

                        /// MAT JS
                        var matScript= document.createElement('script');
                        matScript.setAttribute("crossorigin", "anonymous");
                        matScript.setAttribute("async", "1");
                        matScript.onload = loadMAT;
                        pixelScript.parentNode.insertBefore(matScript, pixelScript);
                        matScript.src=script;

                        /// MAT DATA
                        $pixel.getJSON(endpoint,{
                            "media"                 : $pixel.medio.id,
                            "matToken"              : $pixel.getCookie("_MAT_TK_"), /// Mientras siga en modo beta todo
                            //"mst"                 : $pixel.getCookie("mst"),
                            //"t"                   : $pixel.token,
                            //"w"                   : screen.width,
                            "_ga"                   : $pixel._uid,
                            //"_gid"                : $pixel._gid,
                            "matSession"            : !!sessionStorage.getItem("matSessionID") ? sessionStorage.getItem("matSessionID") : '',
                            //"matSessionCurrent"   : !!sessionStorage.getItem("matSessionCurrent") ? sessionStorage.getItem("matSessionCurrent") : false,
                            //"idv"                 : $pixel.idv,
                            //"keywords"            : metaKeywords?metaKeywords.content:"",
                            //"cat"                 : typeof dataLayer==="object" && dataLayer[0] && dataLayer[0].subcategoria ? dataLayer[0].subcategoria : "",
                            "_"                     : noCacheEndpoint ? (new Date().getTime()) : '',
                            "adsocyTest"            : !!sessionStorage.getItem("adsocy_test") ? sessionStorage.getItem("adsocy_test") : '',
                            "matR"                  : !!document.location.href ? document.location.href : $pixel.referrer
                        },function (data) {
                            if(data.mat) { // Si hay datos de mat carga js y css

                                window.__mat_data = data;
                                if(data.session) {
                                    $pixel.setCookie("matSessionID", data.session, 1);
                                }
                                loadMAT();

                            } else {
                                $pixel.setCookie("_MAT_TK_","void_1_notengoelementomatdata",0);
                            }
                        },function (data) {
                            $pixel.setCookie("_MAT_TK_","void_2_loadfail",0);
                        });
                    }
                }

                /// Fase 2, ir a buscar el token si no está (puede estar y ser void)
                var checkOptions = null;

                if(!$pixel.getCookie("_MAT_TK_") && $pixel.medio.id && $pixel.medio.phase==2) {
                    checkOptions = {
                        media: $pixel.medio.id
                    };
                } else if (!!$pixel.getCookie("_MAT_TK_") && $pixel.getCookie("_MAT_TK_").substring(0,4)!=="void" && $pixel.medio.id) {
                    checkOptions = {
                        media: $pixel.medio.id,
                        matToken: $pixel.getCookie("_MAT_TK_")
                    }
                }

                if(checkOptions) {
                    $pixel.getJSON("https://mat.socy.es/mat.php/check", checkOptions, function(matCheck) {
                        if(matCheck.result == 'success' && matCheck.data && matCheck.data.token) {
                            $pixel.setCookie("_MAT_TK_", matCheck.data.token, 1);
                            var endpoint = null;
                            var noCache = false;
                            if(!!$pixel.getCookie("__MAT_REGENERATE__") && $pixel.getCookie("__MAT_REGENERATE__").substring(0,4) != "void") {
                                $pixel.setCookie("__MAT_REGENERATE__", "void_3", 1);
                                endpoint = matCheck.endpointRegenerate;
                                noCache = true;
                            } else {
                                endpoint = matCheck.endpoint;
                            }
                            getMAT(endpoint, matCheck.styles, matCheck.script, noCache);
                        } else {
                            $pixel.setCookie("_MAT_TK_", "void_4_noencontramosuntoken", 0.1);
                        }
                    },function () {
                        $pixel.setCookie("_MAT_TK_", "void_5_checkfail", 0.1);
                    });
                }
            }
        });
    };
  
  
    /*

    var post = function (url, dataObject, callback, errorCallback) {
        var serializeData = function (obj) {
            var str = "";
            for (var key in obj) {
                if (str != "") str += "&";
                str += key + "=" + encodeURIComponent(obj[key]);
            }
            return str;
        };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if(typeof callback==="function") callback(xhr.responseText);
            }
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                if(typeof errorCallback==="function") errorCallback(xhr.responseText);
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(serializeData(dataObject));
    };

    var errorHandler = function(msg, url, line, col, err) {
        post("https://spixel.socy.es/error.php", {"error": "" + msg + " @ " + url + ":" + line + "/" + col});
        return false;
    };

    if(window.addEventListener) {
        window.addEventListener("error", function(e) {
            errorHandler(e.message, e.filename, e.lineno, e.colno, e.error);
            return false;
        });
    } else {
        var oldErrorHandler = window.onerror;
        window.onerror = function(msg, url, line, col, err) {
            errorHandler(msg, url, line, col, err);
            if(oldErrorHandler) {
                return oldErrorHandler(msg, url, line, col, err);
            } else {
                return false;
            }
        }
    }
    */

    var pixelScript=document.currentScript || document.getElementById("dogtrack-pixel")|| document.getElementById("dogtrack-app") || document.getElementById("besocy_spixel");
    var parser = document.createElement('a');

    parser.href=pixelScript.src;
    if(!pixelScript.dataset.h) pixelScript.dataset.h = pixelScript.h||parser.hostname;
    if(!pixelScript.dataset.t) {
        var t = pixelScript.t||parser.pathname.replace("/pixel/js/","").replace("pixel/js/","");
        if(typeof t === 'string' && t.indexOf('/') > -1) t = t.substring(0, t.indexOf('/'));
        pixelScript.dataset.t = t;
    }
    //// TODO sacar t sin referer
    pixelScript.p=new Pixel(pixelScript.dataset.h,pixelScript.dataset.t);
})();

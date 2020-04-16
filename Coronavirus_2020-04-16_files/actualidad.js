/* Javascript Actualidad */

$(document).ready(function () {

    // main.js . REPASAR SI ESTÁ TODO BIEN


    /* Menu cabecera */
    // dropdown
//        $('.cabecera .parent').addClass('dropdown');
//        $('.cabecera .parent > a').addClass('dropdown-toggle');
//        $('.cabecera .parent > a').attr('data-toggle', 'dropdown');
//        $('.cabecera .parent > a').append('<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>');
//        $('.cabecera .parent > ul').addClass('dropdown-menu');


    /* Livechat */
    /*var LHCChatOptions = {};
     LHCChatOptions.opt = {widget_height: 340, widget_width: 300, popup_height: 520, popup_width: 500};
     (function () {
     var po = document.createElement('script');
     po.type = 'text/javascript';
     po.async = true;
     var referrer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://') + 1)) : '';
     var location = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
     po.src = '//chat.larioja.org/index.php/esp/chat/getstatus/(click)/internal/(position)/original/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(theme)/1/(department)/5?r=' + referrer + '&l=' + location;
     var s = document.getElementsByTagName('script')[0];
     s.parentNode.insertBefore(po, s);
     })();*/

    /* Bootstrap Slider */
    $("#precio-evento").slider({
        tooltip: 'always',
        tooltip_position: 'bottom'
    });

    /* Calendario https://github.com/uxsolutions/bootstrap-datepicker */
    /*$('div#calendario').datepicker({
     format: "dd/mm/yyyy",
     weekStart: 1,
     todayBtn: "linked",
     language: "es",
     daysOfWeekHighlighted: "0,6",
     todayHighlight: true
     });*/

    /* Tooltips de Bootstrap */
    $('[data-toggle="tooltip"]').tooltip();





    /****** Javascript para Diseño ******/


    /* scroll suavizado en enlaces a anclas */
    $(function () {
        $('a.ancla[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, 1000);
                    return false;
                }
            }
        });
    });

    /* Enlace subir */
    // $('#subir').backTop({
    //     'position': 400,
    //     'speed': 800,
    //     'color': '#00523e'
    // });
    // if ($(window).width() < 769)
    // {
    //     $('#subir').css({
    //         'right': '5px',
    //         'bottom': '5px'
    //     });
    // }


    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
        }
    }


    /* Cambiar icono login */
    if ($(".fa-power-off").length) {

        $("#menutop .fa-user-circle").addClass("logueado");

    }

    /* Enlaces de Interes */
    $(".weblink-category img, .weblinks img").addClass("img-responsive img-rounded");

    /* Cálculo de altura automática de iframes */

	if ($(".iframe iframe").length) {
        $.ajax({
            url: "/web_lariojaorg/vendor/iframe-resizer/js/iframeResizer.min.js",
            dataType: "script",
            async: true,
            global: false,
            success: function () {
                $(".iframe iframe").iFrameResize({
                    initCallback: function (iframe) {
                        $(iframe).attr("scrolling", "no");
                    }
                });
            }
        });
    }


    //////////////////////////////////////
    //////////////////////////////////////
    // Aquí empieza ACTUALIDAD.js original




    // Megamenu Dropdown con hover
//    if($(window).width() > 768)
//    {
//    	$('.megamenu-actualidad ul.nav li.dropdown').hover(function() {
//    	  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(300);
//    	}, function() {
//    	  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(300);
//    	});
//    }
//
//    else { }

    $('li.dropdown.yamm-fw a.hamburger').on('click tap', function (event) {
        $(this).parent().toggleClass('open');
        $('body').toggleClass('movil');
    });

    $('body').on('click tap', function (e) {
        if (!$('li.dropdown.yamm-fw').is(e.target)
                && $('li.dropdown.yamm-fw').has(e.target).length === 0
                && $('.open').has(e.target).length === 0
                ) {
            $('li.dropdown.yamm-fw').removeClass('open');
            $('body').removeClass('movil');
        }
    });



    // Light Gallery Plugin --- http://sachinchoolur.github.io/lightGallery/
    $(".lightgallery").lightGallery({
        thumbnail: true,
        hash: false,
        selector: ".lightgallery a",
        share: false
    });


    $("#html5-videos").lightGallery({
        fullScreen: false,
        zoom: false,
        hash: false,
        selector: "#html5-videos a",
        share: false
    });


    $('#Fotogalerias').carousel({
        pause: true,
        hash: false,
        interval: false
    });
    $('#Utilidades').carousel({
        pause: true,
        hash: false,
        interval: false
    });
    $('.carousel').carousel();

    $('#link-camaras-web').on('click', function (e) {
        e.preventDefault();
        $('#carousel-camaras-web').find('.item a').first().trigger('click');
    });

    $('.descargar-informe .btn').on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest("form");
        window.location = $form.attr('action') + $form.find('select')[0].value;
    });

    /* Refrescar logo de cabecera */
    fecha = new Date();
    $(".logo-actualidad img").attr("src", "/images/template/logo-actualidad.png?v=" + fecha.getFullYear() + fecha.getMonth() + fecha.getDate() + "01");


    /* Aplicar estilos a las tablas */

    /* en noticias y eventos*/
    $('.cuerpo-actualidad table').addClass('table table-striped table-condensed');
    $(".cuerpo-actualidad table").wrap("<div class='table-responsive'></div>");

    /* en infografias */
    $('.infografia table').addClass('table table-striped table-condensed');
    $(".infografia table").wrap("<div class='table-responsive'></div>");


    /**
     * @author       Rob W <gwnRob@gmail.com>
     * @website      http://stackoverflow.com/a/7513356/938089
     * @version      20131010
     * @description  Executes function on a framed YouTube video (see website link)
     *               For a full list of possible functions, see:
     *               https://developers.google.com/youtube/js_api_reference
     * @param String frame_id The id of (the div containing) the frame
     * @param String func     Desired function to call, eg. "playVideo"
     *        (Function)      Function to call when the player is ready.
     * @param Array  args     (optional) List of arguments to pass to function func*/
    function callPlayer(frame_id, func, args) {
        if (window.jQuery && frame_id instanceof jQuery)
            frame_id = frame_id.get(0).id;
        var iframe = document.getElementById(frame_id);
        if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
            iframe = iframe.getElementsByTagName('iframe')[0];
        }

        // When the player is not ready yet, add the event to a queue
        // Each frame_id is associated with an own queue.
        // Each queue has three possible states:
        //  undefined = uninitialised / array = queue / 0 = ready
        if (!callPlayer.queue)
            callPlayer.queue = {};
        var queue = callPlayer.queue[frame_id],
                domReady = document.readyState == 'complete';

        if (domReady && !iframe) {
            // DOM is ready and iframe does not exist. Log a message
            window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
            if (queue)
                clearInterval(queue.poller);
        } else if (func === 'listening') {
            // Sending the "listener" message to the frame, to request status updates
            if (iframe && iframe.contentWindow) {
                func = '{"event":"listening","id":' + JSON.stringify('' + frame_id) + '}';
                iframe.contentWindow.postMessage(func, '*');
            }
        } else if (!domReady ||
                iframe && (!iframe.contentWindow || queue && !queue.ready) ||
                (!queue || !queue.ready) && typeof func === 'function') {
            if (!queue)
                queue = callPlayer.queue[frame_id] = [];
            queue.push([func, args]);
            if (!('poller' in queue)) {
                // keep polling until the document and frame is ready
                queue.poller = setInterval(function () {
                    callPlayer(frame_id, 'listening');
                }, 250);
                // Add a global "message" event listener, to catch status updates:
                messageEvent(1, function runOnceReady(e) {
                    if (!iframe) {
                        iframe = document.getElementById(frame_id);
                        if (!iframe)
                            return;
                        if (iframe.tagName.toUpperCase() != 'IFRAME') {
                            iframe = iframe.getElementsByTagName('iframe')[0];
                            if (!iframe)
                                return;
                        }
                    }
                    if (e.source === iframe.contentWindow) {
                        // Assume that the player is ready if we receive a
                        // message from the iframe
                        clearInterval(queue.poller);
                        queue.ready = true;
                        messageEvent(0, runOnceReady);
                        // .. and release the queue:
                        while (tmp = queue.shift()) {
                            callPlayer(frame_id, tmp[0], tmp[1]);
                        }
                    }
                }, false);
            }
        } else if (iframe && iframe.contentWindow) {
            // When a function is supplied, just call it (like "onYouTubePlayerReady")
            if (func.call)
                return func();
            // Frame exists, send message
            iframe.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": func,
                "args": args || [],
                "id": frame_id
            }), "*");
        }
        /* IE8 does not support addEventListener... */
        function messageEvent(add, listener) {
            var w3 = add ? window.addEventListener : window.removeEventListener;
            w3 ?
                    w3('message', listener, !1)
                    :
                    (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
        }
    }

    // Pausar los videos de youtube dentro del carrusel de timelapses de webcams
    $("#carousel-timelapse a.carousel-control").click(function () {
        $("#carousel-timelapse .item").each(function () {
            callPlayer($(this).attr('id'), 'pauseVideo');
        });
    });

    // Para no cachear las imágenes (webcams)
    $('.no-cache img').each(function(){
        $(this).attr('src',$(this).attr('src')+ '?' + (new Date()).getTime());
    });
    $('.no-cache .item a').each(function(){
        $(this).attr('href',$(this).attr('href')+ '?' + (new Date()).getTime());
    });


});

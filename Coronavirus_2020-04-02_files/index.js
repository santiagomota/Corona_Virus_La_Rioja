$(document).ready(function () {
    $(document).on('change', '.filtro', function (e) {
        var field = $(this).data('field');
        var value = encodeURIComponent($(this).val());
        // Cuando carga el datepicker no actualizar el filtro
        var n = field.indexOf("fecha_");
        if (n === 0 && value == '') {
            return false;
        }

        var params = get_params(location.search);
        if (params['filtros']) {
            var filtros = JSON.parse(params['filtros']);
        } else {
            var filtros = {};
        }

        if (value !== '') {
            filtros[field] = value;
        } else {
            delete filtros[field];
        }
        if (field === 'text') {
            delete params['q'];
        }

        reloadListado(filtros, params['q'], 1);
    });
    $(document).on('change', '.filtro-checkbox', function (e) {
        var params = get_params(location.search);
        if (params['filtros']) {
            var filtros = JSON.parse(params['filtros']);
        } else {
            var filtros = {};
        }

        var field = $(this).data('field');
        var value = encodeURI($(this).data('value'));
        var checked = $(this).prop('checked');
        if (checked) {
// add
            if (!filtros[field]) {
                filtros[field] = [];
            } else if (typeof filtros[field] === 'string') {
                filtros[field] = [filtros[field]];
            }
            filtros[field].push(value);
        } else {
// remove
            if (filtros[field]) {
                if (typeof filtros[field] === 'string') {
                    filtros[field] = [filtros[field]];
                }
                var index = filtros[field].indexOf(value);
                if (index > -1) {
                    filtros[field].splice(index, 1);
                }
            }
        }

        reloadListado(filtros, params['q'], 1);
    });
    $(document).on('click', '.filtro-remove', function (e) {
        var params = get_params(location.search);
        if (params['filtros']) {
            var filtros = JSON.parse(params['filtros']);
        } else {
            var filtros = {};
        }

        var field = $(this).data('field');
        var filtro_index = $(this).data('filtro-index');
        if (typeof filtro_index !== "undefined") {
            filtros[field].splice(filtro_index, 1);
        } else {
            delete filtros[field];
            if (field === "text") {
                delete params['q'];
            }
        }

        reloadListado(filtros, params['q'], 1);
    });
    $(document).on('change', '.sort', function (e) {
        var params = get_params(location.search);
        params['sort'] = $(this).val();
        var url = window.location.href.split('?')[0];
        window.location = url + '?' + jQuery.param(params) + '#listado';
    });
    $(document).on('click', '.pagination a', function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        var params = get_params(location.search);

        params['page'] = page;
        if (params['filtros']) {
            var filtros = JSON.parse(params['filtros']);
        } else {
            var filtros = {};
        }
        var url = window.location.href.split('?')[0];
        window.location = url + '?' + jQuery.param(params) + '#listado';
    });
    filtro_fecha = function (elem) {
        var field = elem.data('field');
        var rango = elem.data('rango'); // desde o hasta

        var value = encodeURIComponent(elem.val());
        // Cuando carga el datepicker no actualizar el filtro ?!
        if (value == '') {
            return false;
        }

        var params = get_params(location.search);
        if (params['filtros']) {
            var filtros = JSON.parse(params['filtros']);
        } else {
            var filtros = {};
        }

        if (rango === undefined) {
            if (value !== '') {
                filtros[field] = value;
            } else {
                delete filtros[field];
            }
        } else {
            if (value !== '') {
// add
                if (!filtros[field]) {
                    filtros[field] = {};
                }
                filtros[field][rango] = value;
            } else {
// remove
                if (filtros[field]) {
                    if (filtros[field][rango]) {
                        delete filtros[field][rango];
                    }
                }
            }
        }

        reloadListado(filtros, params['q'], 1);
    }


    $(document).on('keyup', '.filtro-rapido', function () {
        filter = $(this).val().toUpperCase();
        $checkboxes = $(this).parent().parent().find('.checkbox label');
        $checkboxes.each(function () {
            if ($(this).text().toUpperCase().indexOf(filter) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    reloadListado = function (filtros, query, page) {
        json_flat = JSON.stringify(filtros);
        sort = $('#sort').val();
        var params = {'filtros': json_flat, 'q': query, 'page': page, 'sort': sort};
        window.history.pushState(null, '', '?' + jQuery.param(params));
        //window.history.pushState(null, '', '?filtros=' + json_flat);
        $.ajax({
            type: 'POST',
            url: base + '/' + controller + '/listaAJAX?' + jQuery.param(params),
            //url: base + '/' + controller + '/listaAJAX?filtros=' + json_flat,
            success: function (response) {
                if (response.status === "success") {
                    if (typeof response.content !== "undefined") {
                        $('.listado-facetado').html(response.content);
                    }
                } else {
                    alert('No se ha podido recargar el listado.');
                }
            },
            dataType: 'json'
        });
        /* SIN AJAX:
         * var url = window.location.href.split('?')[0];
         window.location = url + '?filtros=' + json_flat + '#listado';
         */
    };
    $(document).on('click', '.btn-like', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var like = $(this).data('like');
        $.ajax({
            type: 'POST',
            url: base + '/noticia/like',
            data: {
                "id": id,
                "like": like
            },
            success: function (response) {
                if (response.status === "success" && typeof response.data !== "undefined") {
                    if (like == 1) {
                        var megustas = parseInt($('#megustas').text(), 10);
                        $('#megustas').html(megustas + 1);
                    } else {
                        var nomegustas = parseInt($('#nomegustas').text(), 10);
                        $('#nomegustas').html(nomegustas + 1);
                    }
                } else {
                    //alert("Error");
                }
                //$(document).find(".addSancion").before(response.data);
                //+1
            },
            dataType: 'json'
        });
    });
    $(document).on('click', '.btn-voto', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var voto = $(this).data('voto');
        var btn_voto = $(this);
        $.ajax({
            type: 'POST',
            url: base + '/noticia/votarComentario',
            data: {
                "id": id,
                "voto": voto
            },
            success: function (response) {
                if (response.status === "success" && typeof response.data !== "undefined") {
                    var votos = parseInt(btn_voto.find("span").text(), 10);
                    if (response.data == 'quitar') {
                        btn_voto.find("span").html(votos - 1);
                    } else {
                        btn_voto.find("span").html(votos + 1);
                        if (response.data == 'cambiar') {
                            var btn_contrario = btn_voto.siblings().first().find("span");
                            var votos_contrario = parseInt(btn_contrario.text(), 10);
                            btn_contrario.html(votos_contrario - 1);
                        }
                    }
                } else {
                    //alert("Es necesario estar logueado");
                }
            },
            dataType: 'json'
        });
    });

    $(document).on('click', '.btn-responder', function (e) {
        e.preventDefault();
        var id_comentario = $(this).data('id_comentario');
        $('#id_parent').val(id_comentario);
        var form_comment_reply = $(document).find('#form_comentarios_reply');
        if (!form_comment_reply.length > 0) {
            var form_comment_reply = $('#form_comentarios').clone();
            form_comment_reply.attr('id', 'form_comentarios_reply');
        }
        $(this).parent().append(form_comment_reply);
    });
    $(document).on('change', '#sort-comentarios', function (e) {
        e.preventDefault();
        var id_item = $(this).data('id_item');
        var sort = $(this).val();
        $.ajax({
            type: 'POST',
            url: base + '/ckan/comentarios',
            data: {
                'id_item': id_item,
                'sort': sort
            },
            success: function (response) {
                if (response.status === "success" && typeof response.content !== "undefined") {
                    $('#listado_comentarios').html(response.content);
                } else {
                    //alert("Error");
                }
            },
            dataType: 'json'
        });
    });

    $('.selector-fecha').datepicker({
        language: "es",
        weekStart: 1,
        autoclose: true
    });

    $('.filtro-fecha').datepicker({
        language: "es",
        weekStart: 1,
        autoclose: true
    }).on('changeDate', function (e) {
        filtro_fecha($(this));
    });

    $(document).on('click', '.btn-vermascomentarios', function (e) {
        e.preventDefault();
        $('.vermascomentarios').show();
        $(this).hide();
    });

    if (jQuery().dataTable) {
        var table = $(".listadoPublicacionesNumeros").DataTable({
            "info": false,
            "lengthChange": false,
            "pageLength": 25
        });
    }

});

$(document).ajaxComplete(function (event, request, settings) {
    $('.filtro-fecha').datepicker({
        language: "es",
        weekStart: 1,
        autoclose: true
    }).on('changeDate', function (e) {
        filtro_fecha($(this));
    });
});

var get_params = function (search_string) {

    var parse = function (params, pairs) {
        var pair = pairs[0];
        var parts = pair.split('=');
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts.slice(1).join('='));
        // Handle multiple parameters of the same name
        if (typeof params[key] === "undefined") {
            params[key] = value;
        } else {
            params[key] = [].concat(params[key], value);
        }

        return pairs.length == 1 ? params : parse(params, pairs.slice(1))
    }

    // Get rid of leading ?
    return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
}
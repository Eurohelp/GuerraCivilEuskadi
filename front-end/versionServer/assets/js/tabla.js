var url = "http://guerracivileuskadi.eurohelp.es/blazegraph/namespace/kb/sparql";
var diccionarioLabels = {
    person: "Persona",
    birthPlace: "Lugar de nacimiento",
    deathPlace: "Lugar de fallecimiento",
    deathMode: "Causa de la muerte",
    label: "Nombre",
    bombardment: "Bombardeo",
    location: "Localización",
    source: "Fuente",
    comment: "Información",
    legeguneaurl: "Url",
    title: "Título"
};
var userLang = navigator.language || navigator.userLanguage;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function generarTabla(tipoEvento, fecha) {

    console.log(tipoEvento);
    console.log(fecha);

    if (tipoEvento.includes("missing-person")) {

        var sentencia = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "select * where { " +
            "     ?person dbo:date '" + fecha + "'^^xsd:date ." +
            "   ?person rdf:type <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/missing-person> ." +
            "     ?person <http://dbpedia.org/ontology/birthPlace> ?birthPlace ." +
            "   ?person <http://dbpedia.org/ontology/deathPlace> ?deathPlace ." +
            "   ?person <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/death-mode> ?deathMode ." +
            "   ?person rdfs:label ?label" +
            "}";

        contadorRepeticiones = 0;

        var options = {
            type: 'POST',
            url: url,
            crossDomain: true,
            data: "query=" + sentencia,
            dataType: 'xml',
            success: function(responseData, textStatus, jqXHR) {
                var value = responseData.someKey;
            },
            error: function(responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        }

        $.ajax(options).done(function(respuesta) {

            tabla = "";
            tabla += "<tr>";
            var tablaCabeceras = [];

            $(respuesta).find("head").find("variable").each(function(index, element) {

                console.log(respuesta);

                tablaCabeceras.push(String($(element).attr("name")));

                contadorRepeticiones++;
            });

            tabla += "<th>" + diccionarioLabels[tablaCabeceras[4]] + '</th>';
            for (i = 0; i < tablaCabeceras.length - 1; i++) {
                tabla += "<th>" + diccionarioLabels[tablaCabeceras[i]] + '</th>';
            }
            tabla += "</tr>";
            var l;

            $(respuesta).find("results").find("result").each(function(index, element) {

                tabla += "<tr>";
                person = $(element).find("binding[name='person']").find("uri").text();
                birthPlace = $(element).find("binding[name='birthPlace']").find("uri").text();
                deathPlace = $(element).find("binding[name='deathPlace']").find("uri").text();
                deathMode = $(element).find("binding[name='deathMode']").find("uri").text();
                label = $(element).find("binding[name='label']").find("literal").text();

                tabla += '<td>' + label + '</a></td>';
                tabla += '<td>' + '<a href=' + person + ' target="_blank">' +
                    person + '</a></td>';
                tabla += '<td>' + '<a href=' + birthPlace + ' target="_blank">' +
                    birthPlace + '</a></td>';
                tabla += '<td>' + '<a href=' + deathPlace + ' target="_blank">' +
                    deathPlace + '</a></td>';
                tabla += '<td>' + '<a href=' + deathMode + ' target="_blank">' +
                    deathMode + '</a></td>';

                tabla += "</tr>";

            });

            var posicionTabla = document.getElementById('contenedorTabla');
            posicionTabla.innerHTML = '<table border=1>' + tabla + '</table>';

        });
    }

    if (tipoEvento.includes("bombing")) {

        var sentencia = "prefix dcterm: <http://purl.org/dc/terms/>" +
            "PREFIX eli: <http://data.europa.eu/eli/ontology#>" +
            "PREFIX schema: <http://schema.org/>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "select * where {" +
            "     ?bombardment dbo:date '" + fecha + "'^^xsd:date ." +
            "   ?bombardment rdf:type <http://dbpedia.org/resource/Aerial_bombing_of_cities> ." +
            "?bombardment schema:location ?location ." +
            "   ?bombardment dcterm:source ?source ." +
            "     ?bombardment rdfs:comment ?comment ." +
            "}";

        contadorRepeticiones = 0;

        var options = {
            type: 'POST',
            url: url,
            crossDomain: true,
            data: "query=" + sentencia,
            dataType: 'xml',
            success: function(responseData, textStatus, jqXHR) {
                var value = responseData.someKey;
            },
            error: function(responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        }

        $.ajax(options).done(function(respuesta) {
            console.log(respuesta);

            tabla = "";
            tabla += "<tr>";

            $(respuesta).find("head").find("variable").each(function(index, element) {

                tabla += "<th>" + diccionarioLabels[String($(element).attr("name"))] + '</th>';

                contadorRepeticiones++;
            });

            tabla += "</tr>";
            var l;

            $(respuesta).find("results").find("result").each(function(index, element) {

                tabla += "<tr>";
                bombardment = $(element).find("binding[name='bombardment']").find("uri").text();
                source = $(element).find("binding[name='source']").find("literal").text();
                localizacion = $(element).find("binding[name='location']").find("uri").text();
                comment = $(element).find("binding[name='comment']").find("literal").text();

                tabla += '<td>' + '<a href=' + bombardment + ' target="_blank">' +
                    bombardment + '</a></td>';
                tabla += '<td>' +
                    source + '</a></td>';
                tabla += '<td>' + '<a href=' + localizacion + ' target="_blank">' +
                    localizacion + '</a></td>';
                tabla += '<td>' +
                    comment + '</a></td>';

                tabla += "</tr>";

            });

            var posicionTabla = document.getElementById('contenedorTabla');
            posicionTabla.innerHTML = '<table border=1>' + tabla + '</table>';

        });
    }

    if (tipoEvento.includes("LegalResource")) {

        var sentencia = "PREFIX eli: <http://data.europa.eu/eli/ontology#>" +
            "PREFIX schema: <http://schema.org/>" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "select ?legeguneaurl ?title where { " +
            "     ?legalResource dbo:date '" + fecha + "'^^xsd:date ." +
            "   ?legalResource rdf:type <http://data.europa.eu/eli/ontology#LegalResource> ." +
            "     ?legalResource eli:is_realized_by ?legalexpresion ." +
            "   ?legalexpresion eli:title ?title ." +
            "?eliformat eli:embodies ?legalexpresion ." +
            "?eliformat schema:mainEntityOfPage ?legeguneaurl ." +
            "}";

        contadorRepeticiones = 0;

        var options = {
            type: 'POST',
            url: url,
            crossDomain: true,
            data: "query=" + sentencia,
            dataType: 'xml',
            success: function(responseData, textStatus, jqXHR) {
                var value = responseData.someKey;
            },
            error: function(responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        }

        $.ajax(options).done(function(respuesta) {
            console.log(respuesta);

            tabla = "";
            tabla += "<tr>";

            $(respuesta).find("head").find("variable").each(function(index, element) {

                tabla += "<th>" + diccionarioLabels[String($(element).attr("name"))] + '</th>';

                contadorRepeticiones++;
            });

            tabla += "</tr>";
            var l;

            $(respuesta).find("results").find("result").each(function(index, element) {

                titulo = $(element).find("binding[name='title']").find("literal").text();
                legeguneaurl = $(element).find("binding[name='legeguneaurl']").find("uri").text();

                if ((userLang == "es-ES" || userLang == "es") && legeguneaurl.includes("es_def")) {
                    tabla += "<tr>";
                    tabla += '<td>' + '<a href=' + legeguneaurl + ' target="_blank">' +
                        legeguneaurl + '</a></td>';
                    tabla += '<td>' +
                        titulo + '</a></td>';
                    tabla += "</tr>";
                } else if (userLang == "eu" && legeguneaurl.includes("eu_def")) {
                    tabla += "<tr>";
                    tabla += '<td>' + '<a href=' + legeguneaurl + ' target="_blank">' +
                        legeguneaurl + '</a></td>';
                    tabla += '<td>' +
                        titulo + '</a></td>';
                    tabla += "</tr>";
                }

            });

            var posicionTabla = document.getElementById('contenedorTabla');
            posicionTabla.innerHTML = '<table border=1>' + tabla + '</table>';

        });
    }
}
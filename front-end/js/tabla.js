var url = "http://guerracivileuskadi.eurohelp.es:18888/blazegraph/namespace/kb/sparql";

function generarTabla() {

    var sentencia = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
        "PREFIX dbo: <http://dbpedia.org/ontology/>" +
        "select * where { " +
        "     ?person dbo:date '1936-02-12'^^xsd:date ." +
        "   ?person rdf:type <http://id.euskadi.eus/def/euskadipedia/missing-person> ." +
        "     ?person <http://dbpedia.org/ontology/birthPlace> ?birthPlace ." +
        "   ?person <http://dbpedia.org/ontology/deathPlace> ?deathPlace ." +
        "   ?person <http://id.euskadi.eus/def/euskadipedia/death-mode> ?deathMode ." +
        "   ?person rdfs:label ?label" +
        "}";

    contadorRepeticiones = 0;

    var options = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "dataType": "xml",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/sparql-results+xml;charset=UTF-8",
            "Cache-Control": "true",
        },
        "data": "query=" + sentencia
    }

    $.ajax(options).done(function(respuesta) {
        console.log(respuesta);


        tabla = "";
        tabla += "<tr>";

        $(respuesta).find("head").find("variable").each(function(index, element) {
            tabla += "<th>" + $(element).attr("name") + '</th>';
            contadorRepeticiones++;
        });

        tabla += "</tr>";
        var l;

        $(respuesta).find("results").find("result").each(function(index, element) {

            tabla += "<tr>";
            for (l = 0; l < datosTeclado.length; l++) {
                uniquesFor = datosTeclado[l].replace("?", "");
                try {
                    if ($(element).find("binding[name=" + uniquesFor + "]").find("uri").text() !== '') {
                        tabla += '<td class=' + uniquesFor + '>' + '<a href=' + $(element).find("binding[name=" + uniquesFor + "]").find("uri").text() + ' target="_blank">' +
                            $(element).find("binding[name=" + uniquesFor + "]").find("uri").text() + '</a></td>';
                        uniquesFor = "?" + uniquesFor;

                    } else { tabla += '<td class=' + uniquesFor + '>' + $(element).find("binding[name=" + uniquesFor + "]").find("literal").text() + '</td>'; }

                } catch (err) {
                    console.log("No existe este formato");
                }
            }

            tabla += "</tr>";
        });

        var posicionTabla = document.getElementById('contenedorTabla');
        posicionTabla.innerHTML = '<table border=1>' + tabla + '</table>';
        contador++;

        datosRepetidos = datosTeclado;

    });

}
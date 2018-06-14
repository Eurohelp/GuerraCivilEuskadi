var FechasHashMap = new Map();
var data = [];
var datos = [];
var a = new Map();

function generarTimeline() {

    repeticionesFecha = 1;

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

        "data": "query=PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "SELECT  DISTINCT *" +
            "WHERE {" +
            "      ?resource dbo:date ?date ." +
            "      ?resource rdf:type ?type ." +
            "}" +
            "LIMIT 4000"

    }

    $.ajax(options).done(function(respuesta) {
        console.log(respuesta);
        var container = document.getElementById('visualization');
        var fechasDOF = [];
        var temporalRepeticiones = 0;

        $(respuesta).find("results").find("result").each(function(index, element) {

            //NombreBombardeo = $(element).find("binding[name='comment']").find("literal").text();
            UriBombardeoURL = '<a href=' + $(element).find("binding[name='resource']").find("uri").text() + ' target="_blank">' + $(element).find("binding[name='resource']").find("uri").text() + '</a>';

            if (UriBombardeoURL.includes("missing-person")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://id.euskadi.eus/def/euskadipedia/missing-person";
            } else if (UriBombardeoURL.includes("dof")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://data.europa.eu/eli/ontology#LegalResource";
            } else if (UriBombardeoURL.includes("bombardment")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://dbpedia.org/resource/Aerial_bombing_of_cities";
            }

            if (!fechasDOF.includes(FechaBombardeo)) {
                fechasDOF.push(FechaBombardeo);
                FechasHashMap.set(FechaBombardeo, repeticionesFecha);
            } else {
                temporalRepeticiones = FechasHashMap.get(FechaBombardeo);
                temporalRepeticiones++;
                FechasHashMap.set(FechaBombardeo, temporalRepeticiones);
            }

        });

        console.log(FechasHashMap);

        for (var value of FechasHashMap) {
            datos.push(value);
            var temp = [];
            temp = value[0].split("||");
            var motive = "";
            var selectedDate = "";
            if (temp[1] == "http://id.euskadi.eus/def/euskadipedia/missing-person") {
                motive = temp[1];
                selectedDate = temp[0];
                var icono = '<a href="tabla.html?motive=' + motive + "&selectedDate=" + selectedDate + '"> <img src="assets/map-markers/persona-corriendo.png"  alt="Persona desaparecida" height="24" width="24"></a>'
            }
            if (temp[1] == "http://data.europa.eu/eli/ontology#LegalResource") {
                var icono = '<a href="tabla.html"> <img src="assets/map-markers/equilibrar.png"  alt="Ley" height="24" width="24"></a>'
            }
            if (temp[1] == "http://dbpedia.org/resource/Aerial_bombing_of_cities") { var icono = '<a href="tabla.html"> <img src="assets/map-markers/bomba.png"  alt="Bombardeo" height="24" width="24"></a>' }

            data.push({ id: value[0], content: String(value[1]) + " " + icono, start: String(temp[0]) });
        }

        var options = {};

        var timeline = new vis.Timeline(container, data, options);

    });

}
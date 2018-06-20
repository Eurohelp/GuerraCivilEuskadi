var FechasHashMap = new Map();
var data = [];
var datos = [];
var a = new Map();
var diccionarioCriba = ["Zuazo-Urquiaga-Aniceto", "Ramirez-De-La-Piscina-Ruiz-De-Zuazo-Ignacio", "Sancho-Velasco-Angel",
    "Gorostegui-Mugica-Agustina-Alegia", "Lluvia-Rodriguez-Eladio"
];

function generarTimeline() {

    repeticionesFecha = 1;

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "SELECT DISTINCT *" +
            "WHERE {" +
            " ?resource dbo:date ?date ." +
            " ?resource rdf:type ?type ." +
            ' FILTER (?date > "' + "1936-07-18" + '"^^xsd:date)' +
            ' FILTER (?date < "' + "1937-07-31" + '"^^xsd:date)' +
            "}" +
            "LIMIT 4000",
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
        var container = document.getElementById('visualization');
        var fechasDOF = [];
        var temporalRepeticiones = 0;

        $(respuesta).find("results").find("result").each(function(index, element) {

            UriBombardeoURL = '<a href=' + $(element).find("binding[name='resource']").find("uri").text() + ' target="_blank">' + $(element).find("binding[name='resource']").find("uri").text() + '</a>';
            var FechaBombardeo = "";
            var itemp = !diccionarioCriba.includes(UriBombardeoURL)
            if (UriBombardeoURL.includes("missing-person") && !diccionarioCriba.includes(UriBombardeoURL)) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://id.euskadi.eus/def/euskadipedia/missing-person";
            } else if (UriBombardeoURL.includes("dof")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://data.europa.eu/eli/ontology#LegalResource";
            } else if (UriBombardeoURL.includes("bombardment")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://dbpedia.org/resource/Aerial_bombing_of_cities";
            }

            if (FechaBombardeo != "") {
                var temp = FechaBombardeo.split("||");
                var tempCriba = temp[0];
                var fechaTempCriba = tempCriba.split("-");
                var dateTemp = new Date(Number(fechaTempCriba[0]), Number(fechaTempCriba[1] - 1), Number(fechaTempCriba[2]));
                var fechaMinima = new Date(1936, 6, 18);
                var fechaMaxima = new Date(1937, 2, 1);
                if (!fechasDOF.includes(FechaBombardeo) && dateTemp > fechaMinima && dateTemp < fechaMaxima) {
                    fechasDOF.push(FechaBombardeo);
                    FechasHashMap.set(FechaBombardeo, repeticionesFecha);
                } else if (fechasDOF.includes(FechaBombardeo) && dateTemp > fechaMinima && dateTemp < fechaMaxima) {
                    temporalRepeticiones = FechasHashMap.get(FechaBombardeo);
                    temporalRepeticiones++;
                    FechasHashMap.set(FechaBombardeo, temporalRepeticiones);
                }
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
                var motive = temp[1];
                var selectedDate = temp[0];
                var icono = '<a href="tabla.html?motive=' + motive + "&selectedDate=" + selectedDate + '"> <img src="assets/map-markers/persona-corriendo.png"  alt="Persona desaparecida" height="24" width="24"></a>'
            }
            if (temp[1] == "http://data.europa.eu/eli/ontology#LegalResource") {
                var sinHashTag = temp[1].split("#");
                var motive = sinHashTag[1];
                var selectedDate = temp[0];
                var icono = '<a href="tabla.html?motive=' + motive + "&selectedDate=" + selectedDate + '"> <img src="assets/map-markers/equilibrar.png"  alt="Ley" height="24" width="24"></a>'
            }
            if (temp[1] == "http://dbpedia.org/resource/Aerial_bombing_of_cities") {
                var motive = temp[1];
                var selectedDate = temp[0];
                var icono = '<a href="tabla.html?motive=' + motive + "&selectedDate=" + selectedDate + '"> <img src="assets/map-markers/bomba.png"  alt="Bombardeo" height="24" width="24"></a>'
            }

            data.push({ id: value[0], content: String(value[1]) + " " + icono, start: String(temp[0]) });
        }

        var options = {

            height: '670px',
            min: new Date(1936, 6, 1), // lower limit of visible range
            max: new Date(1937, 3, 1), // upper limit of visible range
            start: new Date(1936, 8, 1),
            zoomMin: 1000 * 60 * 60 * 24 * 7, // one week in milliseconds
            zoomMax: 1000 * 60 * 60 * 24 * 31 * 3 // about three months in milliseconds

        };

        var timeline = new vis.Timeline(container, data, options);

    });

}
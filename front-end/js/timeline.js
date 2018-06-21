var FechasHashMap = new Map();
var data = [];
var datos = [];
var a = new Map();

function regexCriba(busqueda, texto) {
    const regex = /(busqueda)/gm;
    const str = String(texto);
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
        return true;
    }
}

var diccionarioCriba = [
    "http://id.euskadi.eus/public-sector/history/missing-person/Arce-Saez-Acisdo-Abanto-Zierbena-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Arizmendi-Aizpurua-Jesus-Azkoitia-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Blanco-Perez-Abelardo-Sestao-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Camiruaga-Lotina-Agustin-Erandio-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Domingo-Beriain-Augusto-Hernani-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Elgarresta-Zufiaurre-Jose-Antonio-Urretxu-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Fernandez-Arroyabe-Eduardo-Zumaia-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Flores-Echevarria-Ricardo-Sestao-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Flores-Palenque-Pedro-Ci%C3%A9rvana-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Gallo-Ruiz-Ezequiel-Sestao-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Garate-Unanue-Manuel-Azkoitia-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Gomez-German-Pedro-Basauri-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Iturbe-Uribe-Martin-Arrasate-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Leguina-Gorostiza-Jose-Basauri-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Mendizabal-Sarasola-Antonio-Donostia-San-Sebasti%C3%A1n-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Michelena-Arizmendiarreta-Juan-Eibar-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Olabarrieta-Mendibil-Serafin-Barakaldo-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Orive-Gomez-Arsenio-Bilbo-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Pintor-Carrera-Martin-Donostia-San-Sebasti%C3%A1n-Asturias", "http://id.euskadi.eus/public-sector/history/missing-person/Rodriguez-Churruca-Felix-Bilbo-Asturias",
    "http://id.euskadi.eus/public-sector/history/missing-person/Santiago-Gomez-Benito-Getxo-Otxandio", "http://id.euskadi.eus/public-sector/history/missing-person/Santiago-Gorriz-Benito-Getxo-Zornotza",
    "http://id.euskadi.eus/public-sector/history/missing-person/Pedrosa-Valiente-Nicasio-Hernani-Irun", "http://id.euskadi.eus/public-sector/history/missing-person/Salaverria-Izaguirre-Eugenia-Donostia-San-Sebasti%C3%A1n-Donostia-San-Sebasti%C3%A1n",
    "http://id.euskadi.eus/public-sector/history/missing-person/Tasende-Del-Coro-Silverio-Bilbo-Ubidea", "http://id.euskadi.eus/public-sector/history/missing-person/Zuazo-Urquiaga-Aniceto-Bilbo-Bilbo",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701266/es_def/index.shtml", "http://id.euskadi.eus/public-sector/history/missing-person/Royos-Aguirre-Alfredo-Basauri-Zornotza",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701265/es_def/index.shtml",
    "http://id.euskadi.eus/public-sector/history/bombardment/m%C3%BAgica-30-04-1937-02-05-1937",
    "http://id.euskadi.eus/public-sector/history/bombardment/artzentales--22-06-1937-02-07-1937",
    "http://id.euskadi.eus/public-sector/history/bombardment/karrantza--17-06-1937-02-07-1937",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193700978/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701113/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701112/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701103/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/decreto/bopv193701102/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701106/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701107/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701108/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701109/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701110/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701111/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701114/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701115/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701104/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701105/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701116/es_def/index.shtml",
    "http://www.legegunea.euskadi.eus/x59-contfich/eu/contenidos/orden/bopv193701117/es_def/index.shtml",
    "http://id.euskadi.eus/public-sector/history/bombardment/m%C3%BAgica-30-04-1937-02-05-1937"
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
            "LIMIT 2000",
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
            var itemp = diccionarioCriba.includes(UriBombardeoURL)
            var uriTemp = $(element).find("binding[name='resource']").find("uri").text();
            var indTemp = regexCriba(uriTemp, diccionarioCriba);
            if (UriBombardeoURL.includes("missing-person")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://id.euskadi.eus/def/euskadipedia/missing-person";
            } else if (UriBombardeoURL.includes("dof")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://data.europa.eu/eli/ontology#LegalResource";
            } else if (UriBombardeoURL.includes("bombardment")) {
                FechaBombardeo = $(element).find("binding[name='date']").find("literal").text() + "||http://dbpedia.org/resource/Aerial_bombing_of_cities";
            }
            var dicTemp = diccionarioCriba.includes(UriBombardeoURL);
            if (diccionarioCriba.includes(UriBombardeoURL) == false) {
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
            } else if (diccionarioCriba.includes(UriBombardeoURL) == true) {
                console.log("EO");
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

            height: '750px',
            min: new Date(1936, 6, 1), // lower limit of visible range
            max: new Date(1937, 9, 18), // upper limit of visible range
            start: new Date(1936, 8, 1),
            zoomMin: 1000 * 60 * 60 * 24 * 7, // one week in milliseconds
            zoomMax: 1000 * 60 * 60 * 24 * 31 * 3 // about three months in milliseconds

        };

        var timeline = new vis.Timeline(container, data, options);

    });

}
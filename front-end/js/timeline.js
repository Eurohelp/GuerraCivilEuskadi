var FechasHashMap = new Map();

function generarTimeline() {

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
            "LIMIT 100"

        //"query=PREFIX dbp: <http://dbpedia.org/property/>" +
        //    "PREFIX dbr: <http://dbpedia.org/resource/>" +
        //    "PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>" +
        //    "PREFIX dbo: <http://dbpedia.org/ontology/>" +
        //    "PREFIX schema: <http://schema.org/>" +
        //    "SELECT * " +
        //    "WHERE { " +
        //    "" +
        //    "?bombardment dbo:date ?date ." +
        //    "?bombardment rdfs:comment ?comment ." +
        //    "" +
        //    "}" +
        //    "LIMIT 100"

    }

    $.ajax(options).done(function(respuesta) {
        console.log(respuesta);
        var container = document.getElementById('visualization');
        var i = 0;
        var z = 0;
        var data = [];


        $(respuesta).find("results").find("result").each(function(index, element) {

            i++;
            //NombreBombardeo = $(element).find("binding[name='comment']").find("literal").text();
            UriBombardeoURL = '<a href=' + $(element).find("binding[name='resource']").find("uri").text() + ' target="_blank">' + $(element).find("binding[name='resource']").find("uri").text() + '</a>';
            FechaBombardeo = $(element).find("binding[name='date']").find("literal").text();
            //console.log(NombreBombardeo);
            console.log(FechaBombardeo);

            if (!FechasHashMap.has(FechaBombardeo)) {
                FechasHashMap.set(FechaBombardeo, i);
            } else {
                var temp = FechasHashMap.get(FechaBombardeo) + 1;
                FechasHashMap.set(FechaBombardeo, temp);
            }

            data.push({ id: i, content: String(UriBombardeoURL), start: String(FechaBombardeo) });

        });

        //$(respuesta).find("results").find("result").each(function(index, element) {
        //    i++;
        //    NombreBombardeo = $(element).find("binding[name='comment']").find("literal").text();
        //    UriBombardeoURL = '<a href=' + $(element).find("binding[name='bombardment']").find("uri").text() + ' target="_blank">' + $(element).find("binding[name='bombardment']").find("uri").text() + '</a>';
        //    FechaBombardeo = $(element).find("binding[name='date']").find("literal").text();
        //    //console.log(NombreBombardeo);
        //    console.log(FechaBombardeo);
        //
        //    data.push({ id: i, content: String(NombreBombardeo), start: String(FechaBombardeo) });
        //
        //});
        //
        //console.log(data);

        var options = {};

        var timeline = new vis.Timeline(container, data, options);

    });

}
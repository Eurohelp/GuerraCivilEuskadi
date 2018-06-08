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

        "data": "query=PREFIX dbp: <http://dbpedia.org/property/>" +
            "PREFIX dbr: <http://dbpedia.org/resource/>" +
            "PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>" +
            "PREFIX dbo: <http://dbpedia.org/ontology/>" +
            "PREFIX schema: <http://schema.org/>" +
            "SELECT * " +
            "WHERE { " +
            "" +
            "   ?bombardment dbo:date ?date ." +
            "" +
            "}"

    }

    $.ajax(options).done(function(respuesta) {
        console.log(respuesta);
        var container = document.getElementById('visualization');
        var i = 0;
        var data = [];

        $(respuesta).find("results").find("result").each(function(index, element) {
            i++;
            UriBombardeo = '<a href=' + $(element).find("binding[name='bombardment']").find("uri").text() + ' target="_blank">' + $(element).find("binding[name='bombardment']").find("uri").text() + '</a>';
            FechaBombardeo = $(element).find("binding[name='date']").find("literal").text();
            console.log(UriBombardeo);
            console.log(FechaBombardeo);

            //data.push({ id: i, content: dataNombre + " " + dataFoto, start: dataDividido[0] });

        });
    });
    var container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
        { id: 1, content: 'item 1', start: '2014-04-20' },
        { id: 2, content: 'item 2', start: '2014-04-14' },
        { id: 3, content: 'item 3', start: '2014-04-18' },
        { id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19' },
        { id: 5, content: 'item 5', start: '2014-04-25' },
        { id: 6, content: 'item 6', start: '2014-04-27', type: 'point' }
    ]);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
}
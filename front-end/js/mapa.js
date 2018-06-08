//Scripts generales
var variablesUsuario = [];
window.arraySentencia = [];
var identificador = "?";
var lugaresFallecimiento = [];
var mapaLugaresFallecimiento = new Map();
var datosEntrada;
var datosMapa = new Map();
var latitud;
var longitud;
var arrayLatitud = [];
var arrayLongitud = [];
var resultadosPosicion = [];
var url = "http://guerracivileuskadi.eurohelp.es:18888/blazegraph/namespace/kb/sparql";
var sentencia = "";
/***************************************************************************** */

/*Scripts mapa*/

function generarMapa() {

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
    });

    var mymap = L.map('mapid').setView([43.2603479, -2.9334110], 13);

    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 22,
        id: 'mapbox.streets'
    }).addTo(mymap);


    L.marker([43.2603479, -2.9334110]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);

    /******************************************** */
    //Llamada a la Triple Store

    //var options = {
    //    "async": true,
    //    "crossDomain": true,
    //    "url": url,
    //    "method": "POST",
    //    "dataType": "json",
    //    "headers": {
    //        "Content-Type": "application/x-www-form-urlencoded",
    //        "Accept": "application/sparql-results+xml;charset=UTF-8",
    //        "Cache-Control": "true",
    //    },
    //
    //    "data": "query=PREFIX dbp: <http://dbpedia.org/property/>" +
    //        "PREFIX dbr: < http: //dbpedia.org/resource/>" +
    //        "PREFIX geo - pos: < http: //www.w3.org/2003/01/geo/wgs84_pos#>" +
    //        "PREFIX dbo: < http: //dbpedia.org/ontology/>" +
    //        "PREFIX schema: < http: //schema.org/>" +
    //        "SELECT *" +
    //        "WHERE { ?" +
    //        "bombardment dbp: plannedBy dbr: Francoist_Spain. ?" +
    //        "bombardment geo - pos : lat ? latitude. ?" +
    //        "bombardment geo - pos : long ? longitude. ?" +
    //        "bombardment dbo : date ? date. ?" +
    //        "bombardment schema : location ? location." +
    //        "}"
    //
    //}
    //
    //$.ajax(options).done(function(respuesta) {
    //    console.log(respuesta);
    //
    //});

    /******************************************** */
}
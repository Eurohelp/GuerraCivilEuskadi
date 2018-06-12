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

    var mymap = L.map('mapid').setView([43.2603479, -2.9334110], 13);

    L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: '97fe5e926bfa4a0d8e4d894799973f6a',
        maxZoom: 22
    }).addTo(mymap);

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'dist/images/markers-shadow.png',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }
    });

    var bombingIcon = new LeafIcon({ iconUrl: 'dist/images/2079_-_Explosion_I-512.png' });

    var infrastructureIcon = new LeafIcon({ iconUrl: 'dist/images/09_home-3-512.png' });

    mymap.on('click', onMapClick);

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
            "   ?resource rdf:type ?type .	" +
            "   ?resource geo-pos:lat ?latitude ." +
            "   ?resource geo-pos:long ?longitude ." +
            "}"

    }

    $.ajax(options).done(function(respuesta) {

        console.log(respuesta);

        $(respuesta).find("results").find("result").each(function(index, element) {

            name = $(element).find("binding[name='type']").find("uri").text();

            latitud = $(element).find("binding[name='latitude']").find("literal").text();

            longitud = $(element).find("binding[name='longitude']").find("literal").text();

            if (name.includes("bombing")) {
                var marker = L.marker([latitud, longitud], { icon: bombingIcon }).addTo(mymap).bindPopup(String(name));
            } else if (name.includes("Mass_grave")) {
                var marker = L.marker([latitud, longitud]).addTo(mymap).bindPopup(String(name));
            } else {
                var marker = L.marker([latitud, longitud], { icon: infrastructureIcon }).addTo(mymap).bindPopup(String(name));
            }

        });
    });



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
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
var url = "http://guerracivileuskadi.eurohelp.es/blazegraph/namespace/kb/sparql";
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
        //    popup
        //        .setLatLng(e.latlng)
        //        .setContent("You clicked the map at " + e.latlng.toString())
        //        .openOn(mymap);
    }

    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'assets/map-markers/markers-shadow.png',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }
    });

    var GraveIcon = new LeafIcon({ iconUrl: 'assets/map-markers/23-512.png' });

    var bombingIcon = new LeafIcon({ iconUrl: 'assets/map-markers/2079_-_Explosion_I-512.png' });

    var infrastructureIcon = new LeafIcon({ iconUrl: 'assets/map-markers/09_home-3-512.png' });

    mymap.on('click', onMapClick);

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> \
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
    PREFIX owl: <http://www.w3.org/2002/07/owl#>\
    PREFIX schema: <http://schema.org/>\
    SELECT DISTINCT *  \
    WHERE {\
       {?place geo-pos:lat ?latitude .\
       ?place geo-pos:long ?longitude .\
           ?place rdf:type ?type .}\
       OPTIONAL {?place rdfs:comment ?comment .}\
       OPTIONAL {?place schema:location ?location .}\
    } ",
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

        $(respuesta).find("results").find("result").each(function(index, element) {

            name = $(element).find("binding[name='type']").find("uri").text();

            latitud = $(element).find("binding[name='latitude']").find("literal").text();

            longitud = $(element).find("binding[name='longitude']").find("literal").text();

            localizacion = '<a href=' + $(element).find("binding[name='location']").find("uri").text() + '>' + "Dataset de localizaciones</a></p>";

            place = '<a href=' + $(element).find("binding[name='place']").find("uri").text() + '>' + "Dataset de lugares</a></p>";

            comment = $(element).find("binding[name='comment']").find("literal").text();

            if (comment == "") { comment = "SIN DESCRIPCIÓN"; }

            if (name.includes("bombing")) {
                var marker = L.marker([latitud, longitud], { icon: bombingIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
            } else if (name.includes("Mass_grave")) {
                var marker = L.marker([latitud, longitud], { icon: GraveIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
            } else {
                var marker = L.marker([latitud, longitud], { icon: infrastructureIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
            }

        });
    });

    //$.ajax(options).done(function(respuesta) {
    //
    //    console.log(respuesta);
    //
    //    $(respuesta).find("results").find("result").each(function(index, element) {
    //
    //        name = $(element).find("binding[name='type']").find("uri").text();
    //
    //        latitud = $(element).find("binding[name='latitude']").find("literal").text();
    //
    //        longitud = $(element).find("binding[name='longitude']").find("literal").text();
    //
    //        localizacion = '<a href=' + $(element).find("binding[name='location']").find("uri").text() + '>' + "Dataset de localizaciones</a></p>";
    //
    //        place = '<a href=' + $(element).find("binding[name='place']").find("uri").text() + '>' + "Dataset de lugares</a></p>";
    //
    //        comment = $(element).find("binding[name='comment']").find("literal").text();
    //
    //        if (comment == "") { comment = "SIN DESCRIPCIÓN"; }
    //
    //        if (name.includes("bombing")) {
    //            var marker = L.marker([latitud, longitud], { icon: bombingIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
    //        } else if (name.includes("Mass_grave")) {
    //            var marker = L.marker([latitud, longitud], { icon: GraveIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
    //        } else {
    //            var marker = L.marker([latitud, longitud], { icon: infrastructureIcon }).addTo(mymap).bindPopup(String("<br> Descripción: " + comment + "<br>" + place + "<br>" + localizacion));
    //        }
    //
    //    });
    //});

}
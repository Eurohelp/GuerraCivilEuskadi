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
var arrayPosiciones = [];
/***************************************************************************** */

/*Scripts mapa*/

function cerrarBoton() {
    $("#informacion").hide();
    $(".tooltipInformacion").hide();
    $("#burl").hide();
    $("#burl2").hide();
};

function generarMapa() {

    $("#informacion").hide();
    $(".tooltipInformacion").hide();
    $("#burl").hide();
    $("#burl2").hide();
    var contadorBombardeosMapa = 0;
    var contadorFosasMapa = 0;
    var contadorBatallasMapa = 0;

    var mymap = L.map('mapid', {
        scrollWheelZoom: false,
    }).setView([43.2603479, -2.9434230], 10);

    L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
        apikey: '4d6a167bf2c048ae88dc9806a128afce',
        maxZoom: 22
    }).addTo(mymap);

    var markers = L.markerClusterGroup({
        chunkedLoading: true
    });

    function onMapClick(e) {

    }

    var myFeatureGroup = L.featureGroup().addTo(mymap).on("click", groupClick);
    var marker, test;

    function groupClick(event) {
        var temp = event.layer.test;
        var tempURL = event.layer.testURL;
        document.getElementById("informacion").textContent = event.layer.test;
        document.getElementById("burl").href = event.layer.testURL;
        document.getElementById("burl2").href = event.layer.testLocalizacion;
        if (document.getElementById("burl2").href.includes("file:///C:") || document.getElementById("burl2").href.includes("http://guerracivileuskadi.eurohelp.es/")) {
            $("#informacion").show();
            $(".tooltipInformacion").show();
            $("#burl").show();
            $("#burl2").hide();
        } else {
            $(".tooltipInformacion").show();
            $("#informacion").show();
            $("#burl").show();
            $("#burl2").show();
        }
    }

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [55, 55],
            shadowSize: [0, 0],
            iconAnchor: [22, 22],
            shadowAnchor: [4, 62],
            popupAnchor: [6, -25]
        }
    });

    var info = L.control();

    info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function(props) {
        //this._div.innerHTML = '<h4>Zoom in: Doble click </h4>' + '<br><h4>Zoom out: Shift+Doble click </h4>';
    };

    info.addTo(mymap);

    var GraveIcon = new LeafIcon({ iconUrl: 'assets/map-markers/fosa.png' });

    var bombingIcon = new LeafIcon({ iconUrl: 'assets/map-markers/bombardeo.png' });

    var infrastructureIcon = new LeafIcon({ iconUrl: 'assets/map-markers/batalla.png' });

    mymap.on('click', onMapClick);

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>" +
            "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
            "PREFIX schema: <http://schema.org/>" +
            "SELECT DISTINCT *" +
            "WHERE {" +
            "   {?place geo-pos:lat ?latitude ." +
            "   ?place geo-pos:long ?longitude ." +
            "       ?place rdf:type ?type .}" +
            "   OPTIONAL {?place rdfs:comment ?comment . FILTER (lang(?comment) != 'en') FILTER (lang(?comment) != 'fr')  FILTER(lang(?comment) != 'pt') FILTER(lang(?comment) != 'ru') FILTER (lang(?comment) != 'it')}" +
            "   OPTIONAL {?place schema:location ?location .}" +
            "} ", //FILTER (lang(?comment) = 'es')
        dataType: 'xml',
        success: function(responseData, textStatus, jqXHR) {
            var value = responseData.someKey;
        },
        error: function(responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    }

    $.ajax(options).done(function(respuesta) {

        $(respuesta).find("results").find("result").each(function(index, element) {

            name = $(element).find("binding[name='type']").find("uri").text();

            latitud = $(element).find("binding[name='latitude']").find("literal").text();

            longitud = $(element).find("binding[name='longitude']").find("literal").text();

            localizacion = $(element).find("binding[name='location']").find("uri").text();

            place = $(element).find("binding[name='place']").find("uri").text();

            comment = $(element).find("binding[name='comment']").find("literal").text();

            if (comment == "") { comment = "SIN INFORMACIÓN"; }
            var text = "Descripción: " + comment; // + "<div class='textpop'>" + place + "</div>" + localizacion;
            var placeURL = place;
            var localizacionURL = localizacion;
            var popup = L.popup({
                maxHeight: 200
            }).setContent(text);

            var posicion = latitud + longitud;
            if (name.includes("bombing") && !arrayPosiciones.includes(posicion)) {
                var marker = L.marker([latitud, longitud], { icon: bombingIcon });
                marker.test = text;
                marker.testURL = placeURL;
                marker.testLocalizacion = localizacionURL;
                contadorBombardeosMapa++;
            } else if (name.includes("Mass_grave") && !arrayPosiciones.includes(posicion)) {
                var marker = L.marker([latitud, longitud], { icon: GraveIcon });
                marker.test = text;
                marker.testURL = placeURL;
                marker.testLocalizacion = localizacionURL;
                contadorFosasMapa++;
            } else if (!arrayPosiciones.includes(posicion)) {
                var marker = L.marker([latitud, longitud], { icon: infrastructureIcon });
                marker.test = text;
                marker.testURL = placeURL;
                marker.testLocalizacion = localizacionURL;
                contadorBatallasMapa++;
            }
            try {
                arrayPosiciones.push(posicion);
                markers.addLayer(marker);
            } catch (err) {}

        });

    });
    myFeatureGroup.addLayer(markers);
}
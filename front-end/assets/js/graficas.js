function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//Grafico fosas
function generarTartaFosas() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT distinct ?provincia (?cantidadFosas*100/52 as ?numFosas) WHERE {\
            SELECT distinct ?provincia (COUNT(?provincia) as ?cantidadFosas) WHERE{\
      ?fosa rdf:type <http://rdf.muninn-project.org/ontologies/graves#Mass_grave>;\
 <http://schema.org/State> ?provincia }GROUP BY ?provincia ORDER BY ?cantidadFosas}",
        dataType: 'xml',
        success: function(responseData, textStatus, jqXHR) {
            var value = responseData.someKey;
        },
        error: function(responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    }

    $.ajax(options).done(function(respuesta) {

        var arrayProvincias = [];
        var arrayNumFosas = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var provincia = $(element).find("binding[name='provincia']").find("uri").text();
            var numFosas = $(element).find("binding[name='numFosas']").find("literal").text();
            numFosas = Math.round(numFosas * 100) / 100;
            tempProvincia = provincia.split("/");
            provincia = tempProvincia[7];
            arrayProvincias.push(provincia);
            arrayNumFosas.push(numFosas);

        });

        new Chart(document.getElementById("pie-chartFosas"), {
            type: 'pie',
            data: {
                labels: arrayProvincias,
                datasets: [{
                    backgroundColor: ["#bd8d4c", "#564734", "#b4875e", "#87562a", "#292621"],
                    data: arrayNumFosas
                }]
            },
            options: {
                title: {
                    display: false //,
                        //text: 'Porcentaje de Fosas comunes por provincia'
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        },
                        afterLabel: function(tooltipItem, data) {
                            return;
                        }
                    }

                }
            }
        });


    });

}

//Gráfico tipo muertes

function generarTartaMuerte() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT ?modoMuerte (?bombardeosTotales*100/4881 as ?numBombardeos) WHERE{SELECT distinct ?modoMuerte \
            (COUNT(?modoMuerte) as ?bombardeosTotales) (SUM(?numMuertos) as ?numero) WHERE{\
 ?bombardeo rdf:type <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/missing-person>;\
 <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/death-mode> ?modoMuerte }\
 GROUP BY ?modoMuerte ORDER BY ?numMuertos} ORDER BY DESC(?bombardeosTotales)",
        dataType: 'xml',
        success: function(responseData, textStatus, jqXHR) {
            var value = responseData.someKey;
        },
        error: function(responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    }

    $.ajax(options).done(function(respuesta) {

        var arrayTempModoMuerte = [];
        var arrayModoMuerte = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var modoMuerte = $(element).find("binding[name='modoMuerte']").find("uri").text();
            var numBombardeos = $(element).find("binding[name='numBombardeos']").find("literal").text();
            numBombardeos = Math.round(numBombardeos * 100) / 100;
            tempmodoMuerte = modoMuerte.split("/");
            modoMuerte = capitalize(tempmodoMuerte[7]);
            modoMuerte = modoMuerte.replace('-', ' ');
            arrayTempModoMuerte.push(modoMuerte);
            arrayModoMuerte.push(numBombardeos);

        });

        new Chart(document.getElementById("pie-chartTipoMuertes"), {
            type: 'pie',
            data: {
                labels: arrayTempModoMuerte,
                datasets: [{
                    backgroundColor: ["#bd8d4c", "#564734", "#b4875e", "#87562a", "#292621"],
                    data: arrayModoMuerte
                }]
            },
            options: {
                title: {
                    display: false //,
                        //text: 'Porcentaje de muertos y desaparecidos por tipo'
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        },
                        afterLabel: function(tooltipItem, data) {
                            return;
                        }
                    }

                }
            }
        });


    });

}

//Grafico desaparecidos

function generarBarrasDesaparecidos() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT ?localidad (?desaparecidos*100/4881 as ?numDesaparecidos) WHERE{SELECT distinct ?localidad (COUNT(?localidad) as ?desaparecidos) \
            (SUM(?numMuertos) as ?numero) WHERE{\
      ?persona rdf:type <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/missing-person>;\
 <http://dbpedia.org/ontology/birthPlace> ?localidad }GROUP BY ?localidad ORDER BY ?numMuertos} ORDER BY DESC(?desaparecidos) LIMIT 5",
        dataType: 'xml',
        success: function(responseData, textStatus, jqXHR) {
            var value = responseData.someKey;
        },
        error: function(responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    }

    $.ajax(options).done(function(respuesta) {

        var arrayTempLocalidad = [];
        var arrayNumDesaparecidos = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var localidad = $(element).find("binding[name='localidad']").find("uri").text();
            var numDesaparecidos = $(element).find("binding[name='numDesaparecidos']").find("literal").text();
            numDesaparecidos = Math.round(numDesaparecidos * 100) / 100;
            tempLocalidad = localidad.split("/");
            localidad = tempLocalidad[4];
            localidad = localidad.replace('_', ' ');
            arrayTempLocalidad.push(localidad);
            arrayNumDesaparecidos.push(numDesaparecidos);

        });

        new Chart(document.getElementById("bar-chartDesaparecidos"), {
            type: 'bar',
            data: {
                labels: arrayTempLocalidad,
                datasets: [{
                    backgroundColor: ["#bd8d4c", "#564734", "#b4875e", "#87562a", "#292621"],
                    data: arrayNumDesaparecidos
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: false //,
                        //text: 'Porcentaje de desaparecidos por localidad'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            scaleStepWidth: 6,
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        },
                        afterLabel: function(tooltipItem, data) {
                            return;
                        }
                    }

                }
            }

        })

    });
}

//Grafico localidades mas bombardeadas

function generarBarrasBombardeos() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT ?provincia (?totalProvincia*100/749 as ?numBombardeos) WHERE{SELECT ?provincia (SUM (?numTotales) as ?totalProvincia){\
            SELECT ?provincia ?bombardeo (SUM(?numeroBombardeosPorProvincia) as ?numTotales) WHERE{\
  ?bombardeo rdf:type <http://dbpedia.org/resource/Aerial_bombing_of_cities>;\
 <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/numerobombardeos> \
 ?numeroBombardeosPorProvincia . ?bombardeo <http://schema.org/location> ?provincia } \
 GROUP BY ?bombardeo ?provincia} GROUP BY ?provincia ORDER BY DESC(?totalProvincia) LIMIT 7}",
        dataType: 'xml',
        success: function(responseData, textStatus, jqXHR) {
            var value = responseData.someKey;
        },
        error: function(responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    }

    $.ajax(options).done(function(respuesta) {

        var arrayTempProvincia = [];
        var arrayNumBombardeos = [];
        var contador = 0;
        $(respuesta).find("results").find("result").each(function(index, element) {

            var provincia = $(element).find("binding[name='provincia']").find("uri").text();
            var numBombardeos = $(element).find("binding[name='numBombardeos']").find("literal").text();
            numBombardeos = Math.round(numBombardeos * 100) / 100;
            tempProvincia = provincia.split("/");
            provincia = tempProvincia[4];
            if (provincia != "Pais_Vasco" && provincia != "Álava") {
                if (provincia.includes("Marquina,_Álava")) { // Borrar esto
                    provincia = "Marquina";
                }
                arrayTempProvincia.push(provincia);
                arrayNumBombardeos.push(numBombardeos);
            }
            contador++;

        });

        new Chart(document.getElementById("bar-chartBombardeos"), {
            type: 'bar',
            data: {
                labels: arrayTempProvincia,
                datasets: [{
                    backgroundColor: ["#bd8d4c", "#564734", "#b4875e", "#87562a", "#292621"],
                    data: arrayNumBombardeos
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true //,
                        //text: 'Porcentaje de bombardeos por localidad'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 6
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        },
                        afterLabel: function(tooltipItem, data) {
                            return;
                        }
                    }

                }
            }
        });

    });

}
//Grafico fosas
function generarTartaFosas() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT distinct ?provincia (COUNT(?provincia) as ?numFosas) WHERE{\
            ?fosa rdf:type <http://rdf.muninn-project.org/ontologies/graves#Mass_grave>;\
           <http://schema.org/State> ?provincia }GROUP BY ?provincia ORDER BY ?numFosas",
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
        var arrayProvincias = [];
        var arrayNumFosas = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var provincia = $(element).find("binding[name='provincia']").find("uri").text();
            var numFosas = $(element).find("binding[name='numFosas']").find("literal").text();
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
                    label: "Fosas",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: arrayNumFosas
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Fosas comunes por provincia'
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
        data: "query=SELECT ?modoMuerte ?numBombardeos WHERE{SELECT distinct ?modoMuerte (COUNT(?modoMuerte) as ?numBombardeos) (SUM(?numMuertos) as ?numero) WHERE{\
            ?bombardeo rdf:type <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/missing-person>;\
           <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/death-mode> ?modoMuerte }GROUP BY ?modoMuerte ORDER BY ?numMuertos} ORDER BY DESC(?numBombardeos)",
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
        var arrayTempModoMuerte = [];
        var arrayModoMuerte = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var modoMuerte = $(element).find("binding[name='modoMuerte']").find("uri").text();
            var numBombardeos = $(element).find("binding[name='numBombardeos']").find("literal").text();
            tempmodoMuerte = modoMuerte.split("/");
            modoMuerte = tempmodoMuerte[7];
            arrayTempModoMuerte.push(modoMuerte);
            arrayModoMuerte.push(numBombardeos);

        });

        new Chart(document.getElementById("pie-chartTipoMuertes"), {
            type: 'pie',
            data: {
                labels: arrayTempModoMuerte,
                datasets: [{
                    label: "Modos de muerte",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: arrayModoMuerte
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Número de muertos por modo de defunción'
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
        data: "query=SELECT ?localidad ?numDesaparecidos WHERE{SELECT distinct ?localidad (COUNT(?localidad) as ?numDesaparecidos) (SUM(?numMuertos) as ?numero) WHERE{\
            ?persona rdf:type <http://guerracivileuskadi.eurohelp.es/linkeddata/def/euskadipedia/missing-person>;\
          <http://dbpedia.org/ontology/birthPlace> ?localidad }GROUP BY ?localidad ORDER BY ?numMuertos} ORDER BY DESC(?numDesaparecidos) LIMIT 10",
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
        var arrayTempLocalidad = [];
        var arrayNumDesaparecidos = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var localidad = $(element).find("binding[name='localidad']").find("uri").text();
            var numDesaparecidos = $(element).find("binding[name='numDesaparecidos']").find("literal").text();
            tempLocalidad = localidad.split("/");
            localidad = tempLocalidad[4];
            arrayTempLocalidad.push(localidad);
            arrayNumDesaparecidos.push(numDesaparecidos);

        });

        new Chart(document.getElementById("bar-chartDesaparecidos"), {
            type: 'bar',
            data: {
                labels: arrayTempLocalidad,
                datasets: [{
                    label: "Número de desaparecidos",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: arrayNumDesaparecidos
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Número de desaparecidos por provincia'
                }
            }
        });

    });

}

//Grafico localidades mas bombardeadas

function generarBarrasBombardeos() {

    var options = {
        type: 'POST',
        url: url,
        crossDomain: true,
        data: "query=SELECT ?provincia ?numBombardeos WHERE{SELECT distinct ?provincia (COUNT(?provincia) as ?numBombardeos) (SUM(?numFosas) as ?numero) WHERE{\
            ?bombardeo rdf:type <http://dbpedia.org/resource/Aerial_bombing_of_cities>;\
           <http://schema.org/location> ?provincia }GROUP BY ?provincia ORDER BY ?numFosas} ORDER BY DESC(?numBombardeos) LIMIT 10",
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
        var arrayTempProvincia = [];
        var arrayNumBombardeos = [];

        $(respuesta).find("results").find("result").each(function(index, element) {

            var provincia = $(element).find("binding[name='provincia']").find("uri").text();
            var numBombardeos = $(element).find("binding[name='numBombardeos']").find("literal").text();
            tempProvincia = provincia.split("/");
            provincia = tempProvincia[4];
            arrayTempProvincia.push(provincia);
            arrayNumBombardeos.push(numBombardeos);

        });

        new Chart(document.getElementById("bar-chartBombardeos"), {
            type: 'bar',
            data: {
                labels: arrayTempProvincia,
                datasets: [{
                    label: "Número de bombardeos por provincia",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: arrayNumBombardeos
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Número de bombardeos por provincia'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    });

}
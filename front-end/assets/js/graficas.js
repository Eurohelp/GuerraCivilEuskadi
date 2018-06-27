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
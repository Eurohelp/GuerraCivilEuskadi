# Consultas SPARQL

## SPARQL endpoint
Las consultas SPARQL se pueden hacer directamente en el SPARQL endpoint de  sólo lectura: [http://172.16.0.81:58080/blazegraph/#query](http://172.16.0.81:58080/blazegraph/#query).

## Ejemplos
A continuación se muestran algunas consultas SPARQL de ejemplo, junto a un enlace en el que se pueden ejecutar:

**Leyes emitidas por el gobierno provisional de Euzkadi sobre alistamiento**

```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <http://schema.org/> 
PREFIX eli: <http://data.europa.eu/eli/ontology#> 
PREFIX graph:<http://data.euskadi.eus/graph/>

SELECT  DISTINCT ?datePub ?legeguneaurl ?title
WHERE {
	?legalresource eli:date_publication ?datePub .
	?legalresource eli:is_realized_by ?legalexpresion .
   ?legalexpresion eli:language  <http://publications.europa.eu/resource/authority/language/SPA> .
   ?legalexpresion eli:title ?title .
	?eliformat eli:embodies ?legalexpresion .
	?eliformat schema:mainEntityOfPage ?legeguneaurl .
	FILTER (?datePub > "1936-07-18"^^xsd:date  && ?datePub < "1937-07-31"^^xsd:date)
	FILTER regex (str(?title), "alistamiento", "i")
}

```
([Ejecutar](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=PREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+%0D%0APREFIX+eli%3A+%3Chttp%3A%2F%2Fdata.europa.eu%2Feli%2Fontology%23%3E+%0D%0APREFIX+graph%3A%3Chttp%3A%2F%2Fdata.euskadi.eus%2Fgraph%2F%3E%0D%0A%0D%0ASELECT++DISTINCT+%3FdatePub+%3Flegeguneaurl+%3Ftitle%0D%0AWHERE+%7B%0D%0A%0D%0A%09%09%3Flegalresource+eli%3Adate_publication+%3FdatePub+.%0D%0A%09%09%3Flegalresource+eli%3Ais_realized_by+%3Flegalexpresion+.%0D%0A++++++++%3Flegalexpresion+eli%3Alanguage++%3Chttp%3A%2F%2Fpublications.europa.eu%2Fresource%2Fauthority%2Flanguage%2FSPA%3E+.%0D%0A++++%09%3Flegalexpresion+eli%3Atitle+%3Ftitle+.%0D%0A%09%09%3Feliformat+eli%3Aembodies+%3Flegalexpresion+.%0D%0A%09%09%3Feliformat+schema%3AmainEntityOfPage+%3Flegeguneaurl+.%0D%0A+++++FILTER+%28%3FdatePub+%3E+%221936-07-18%22%5E%5Exsd%3Adate++%26%26+%3FdatePub+%3C+%221937-07-31%22%5E%5Exsd%3Adate%29%0D%0A++%09+FILTER+regex+%28str%28%3Ftitle%29%2C+%22alistamiento%22%2C+%22i%22%29%0D%0A%7D))


**¿Cuál es el partido politico actual en poder en pueblos que han tenido fosas comunes?**

```
PREFIX dbo:<http://dbpedia.org/ontology/>
PREFIX schema:<http://schema.org/>
PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT *
WHERE {
   ?fosa rdf:type <http://rdf.muninn-project.org/ontologies/graves#Mass_grave> .
	?fosa schema:location ?pueblofosa .
	SERVICE <https://dbpedia.org/sparql> {
		?pueblofosa dbo:leaderParty ?party .
	}
}

```

([Ejecutar](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=PREFIX+dbo%3A%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0APREFIX+schema%3A%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0APREFIX+rdf%3A%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%2A%0D%0AWHERE+%7B%0D%0A++++%3Ffosa+rdf%3Atype+%3Chttp%3A%2F%2Frdf.muninn-project.org%2Fontologies%2Fgraves%23Mass_grave%3E+.%0D%0A%09%3Ffosa+schema%3Alocation+%3Fpueblofosa+.%0D%0A%09SERVICE+%3Chttps%3A%2F%2Fdbpedia.org%2Fsparql%3E+%7B%0D%0A%09%09%3Fpueblofosa+dbo%3AleaderParty+%3Fparty+.%0D%0A%09%7D%0D%0A%7D))

**De las causas de muerte recogidas en los datos de desaparaciones, ¿Cuál es la que más muertos causó?**

```
SELECT ?mode (COUNT(?person) as ?numeroMode)
WHERE {
	?person <http://id.euskadi.eus/def/euskadipedia/death-mode> ?mode
}
GROUP BY ?mode
ORDER BY (?numeroMode)
```

([Ejecutar](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=SELECT+%3Fmode+%28COUNT%28%3Fperson%29+as+%3FnumeroMode%29%0D%0AWHERE+%7B%0D%0A%09%3Fperson+%3Chttp%3A%2F%2Fid.euskadi.eus%2Fdef%2Feuskadipedia%2Fdeath-mode%3E+%3Fmode%0D%0A%7D%0D%0AGROUP+BY+%3Fmode%0D%0AORDER+BY+%28%3FnumeroMode%29))

TODO: otros indicadores
TODO: otras consultas

Consulta DBpedia para extraer datos sobre la guerra civil en Euskadi, a ejecutar en http:es.dbpedia.org/sparql:

```
PREFIX dcterms:<http://purl.org/dc/terms/>

SELECT ?x WHERE{
   ?x dcterms:subject <http://es.dbpedia.org/resource/Categoría:Guerra_Civil_Española_en_el_País_Vasco> 
}
```

# Descarga de datos

Todos los datos en RDF Turtle: [dump.zip](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi/tree/master/datos/dump.zip).

# Herramientas usadas

Triple Store: [Blazegraph](https://www.blazegraph.com/).

Transformación de datos a RDF:
* Programas ad-hoc.
* [OntoRefine](http://graphdb.ontotext.com/free/loading-data-using-ontorefine.html) de GraphDB.
	
Reconciliación de entidades con DBPedia: [Open Refine](http://openrefine.org/) con plugin RDF.

Repositorio GitHub: [GuerraCivilEuskadi](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi).

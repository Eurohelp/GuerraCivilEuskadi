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
([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+%0D%0APREFIX+eli%3A+%3Chttp%3A%2F%2Fdata.europa.eu%2Feli%2Fontology%23%3E+%0D%0APREFIX+graph%3A%3Chttp%3A%2F%2Fdata.euskadi.eus%2Fgraph%2F%3E%0D%0A%0D%0ASELECT++DISTINCT+%3FdatePub+%3Flegeguneaurl+%3Ftitle%0D%0AWHERE+%7B%0D%0A%0D%0A%09%09%3Flegalresource+eli%3Adate_publication+%3FdatePub+.%0D%0A%09%09%3Flegalresource+eli%3Ais_realized_by+%3Flegalexpresion+.%0D%0A++++++++%3Flegalexpresion+eli%3Alanguage++%3Chttp%3A%2F%2Fpublications.europa.eu%2Fresource%2Fauthority%2Flanguage%2FSPA%3E+.%0D%0A++++%09%3Flegalexpresion+eli%3Atitle+%3Ftitle+.%0D%0A%09%09%3Feliformat+eli%3Aembodies+%3Flegalexpresion+.%0D%0A%09%09%3Feliformat+schema%3AmainEntityOfPage+%3Flegeguneaurl+.%0D%0A+++++FILTER+%28%3FdatePub+%3E+%221936-07-18%22%5E%5Exsd%3Adate++%26%26+%3FdatePub+%3C+%221937-07-31%22%5E%5Exsd%3Adate%29%0D%0A++%09+FILTER+regex+%28str%28%3Ftitle%29%2C+%22alistamiento%22%2C+%22i%22%29%0D%0A%7D))


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

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+dbo%3A%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0APREFIX+schema%3A%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0APREFIX+rdf%3A%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%2A%0D%0AWHERE+%7B%0D%0A++++%3Ffosa+rdf%3Atype+%3Chttp%3A%2F%2Frdf.muninn-project.org%2Fontologies%2Fgraves%23Mass_grave%3E+.%0D%0A%09%3Ffosa+schema%3Alocation+%3Fpueblofosa+.%0D%0A%09SERVICE+%3Chttps%3A%2F%2Fdbpedia.org%2Fsparql%3E+%7B%0D%0A%09%09%3Fpueblofosa+dbo%3AleaderParty+%3Fparty+.%0D%0A%09%7D%0D%0A%7D))

**De las causas de muerte recogidas en los datos de desaparaciones, ¿Cuál es la que más muertos causó?**

```
SELECT ?mode (COUNT(?person) as ?numeroMode)
WHERE {
	?person <http://id.euskadi.eus/def/euskadipedia/death-mode> ?mode
}
GROUP BY ?mode
ORDER BY (?numeroMode)
```

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=SELECT+%3Fmode+%28COUNT%28%3Fperson%29+as+%3FnumeroMode%29%0D%0AWHERE+%7B%0D%0A%09%3Fperson+%3Chttp%3A%2F%2Fid.euskadi.eus%2Fdef%2Feuskadipedia%2Fdeath-mode%3E+%3Fmode%0D%0A%7D%0D%0AGROUP+BY+%3Fmode%0D%0AORDER+BY+%28%3FnumeroMode%29))

** Bombardeos del bando franquista **

```
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX schema: <http://schema.org/>
SELECT * 
WHERE { 
	?bombardment dbp:plannedBy dbr:Francoist_Spain .
   ?bombardment geo-pos:lat ?latitude .
   ?bombardment geo-pos:long ?longitude .
   ?bombardment dbo:date ?date .
   ?bombardment schema:location ?location .
}
```

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+dbp%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0D%0APREFIX+dbr%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0D%0APREFIX+geo-pos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0D%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0ASELECT+%2A+%0D%0AWHERE+%7B+%0D%0A%09%3Fbombardment+dbp%3AplannedBy+dbr%3AFrancoist_Spain+.%0D%0A+++%3Fbombardment+geo-pos%3Alat+%3Flatitude+.%0D%0A+++%3Fbombardment+geo-pos%3Along+%3Flongitude+.%0D%0A+++%3Fbombardment+dbo%3Adate+%3Fdate+.%0D%0A+++%3Fbombardment+schema%3Alocation+%3Flocation+.%0D%0A%7D))


** Bombardeos de la Legión Cóndor **

```
SELECT  DISTINCT ?location ?date ?source ?comment
WHERE {
	?bombing rdf:type <http://dbpedia.org/resource/Aerial_bombing_of_cities> .
    ?bombing <http://schema.org/location> ?location .
    ?bombing <http://dbpedia.org/ontology/date> ?date .         
  	?bombing rdfs:comment ?comment .
    ?bombing <http://purl.org/dc/terms/source> ?source
    FILTER regex (str(?source), "Cóndor", "i")
}
ORDER BY ?date
```

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=SELECT++DISTINCT+%3Flocation+%3Fdate+%3Fsource+%3Fcomment%0D%0AWHERE+%7B%0D%0A%09%3Fbombing+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FAerial_bombing_of_cities%3E+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fschema.org%2Flocation%3E+%3Flocation+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2Fdate%3E+%3Fdate+.+++++++++%0D%0A++%09%3Fbombing+rdfs%3Acomment+%3Fcomment+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fsource%3E+%3Fsource%0D%0A++++FILTER+regex+%28str%28%3Fsource%29%2C+%22C%C3%B3ndor%22%2C+%22i%22%29%0D%0A%7D%0D%0AORDER+BY+%3Fdate))

** Eventos de un rango de fechas**

```
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?evento 
WHERE { 
	?evento dbo:date ?date .
    FILTER (?date > "1937-05-06"^^xsd:date  && ?date < "1937-07-31"^^xsd:date)        
}
```
([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0ASELECT+%3Fevento+%0D%0AWHERE+%7B+%0D%0A%09%3Fevento+dbo%3Adate+%3Fdate+.%0D%0A++++FILTER+%28%3Fdate+%3E+%221937-05-06%22%5E%5Exsd%3Adate++%26%26+%3Fdate+%3C+%221937-07-31%22%5E%5Exsd%3Adate%29++++++++%0D%0A%7D))

** Fosas comunes en una área, su población, y la página wikipedia de esa población**

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <http://schema.org/>


SELECT ?place ?location ?web WHERE { 
	?place geo-pos:lat ?latitude .
    ?place geo-pos:long ?longitude .
    ?place schema:location ?location .
    SERVICE <http://dbpedia.org/sparql> {
  		?location foaf:isPrimaryTopicOf ?web .
      }
    FILTER (?latitude > "42.1"^^xsd:double  && ?latitude < "42.99"^^xsd:double)
    FILTER (?longitude < "-2.5"^^xsd:double  && ?longitude > "-2.9"^^xsd:double)
}
```

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0APREFIX+geo-pos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0D%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0A%0D%0A%0D%0ASELECT+%3Fplace+%3Flocation+%3Fweb+WHERE+%7B+%0D%0A%09%3Fplace+geo-pos%3Alat+%3Flatitude+.%0D%0A++++%3Fplace+geo-pos%3Along+%3Flongitude+.%0D%0A++++%3Fplace+schema%3Alocation+%3Flocation+.%0D%0A++++SERVICE+%3Chttp%3A%2F%2Fdbpedia.org%2Fsparql%3E+%7B%0D%0A++%09%09%3Flocation+foaf%3AisPrimaryTopicOf+%3Fweb+.%0D%0A++++++%7D%0D%0A++++FILTER+%28%3Flatitude+%3E+%2242.1%22%5E%5Exsd%3Adouble++%26%26+%3Flatitude+%3C+%2242.99%22%5E%5Exsd%3Adouble%29%0D%0A++++FILTER+%28%3Flongitude+%3C+%22-2.5%22%5E%5Exsd%3Adouble++%26%26+%3Flongitude+%3E+%22-2.9%22%5E%5Exsd%3Adouble%29%0D%0A%7D))


** DBpedia **

Datos de la DBpedia almacenados, y su página web:

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT * 
WHERE { 
    ?dbpediaresource foaf:isPrimaryTopicOf ?dbpediaurl
} 
```

([Ejecutar](http://guerracivileuskadi.eurohelp.es:18888/blazegraph/sparql?query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0ASELECT+%2A+%0D%0AWHERE+%7B+%0D%0A++++%3Fdbpediaresource+foaf%3AisPrimaryTopicOf+%3Fdbpediaurl%0D%0A%7D+))

Consulta DBpedia para extraer datos sobre la guerra civil en Euskadi, a ejecutar en :

```
PREFIX dcterms:<http://purl.org/dc/terms/>

SELECT ?x WHERE{
   ?x dcterms:subject <http://es.dbpedia.org/resource/Categoría:Guerra_Civil_Española_en_el_País_Vasco> 
}
```

([Ejecutar](http:es.dbpedia.org/sparql?query=PREFIX+dcterms%3A%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0D%0A%0D%0ASELECT+%3Fx+WHERE%7B%0D%0A+++%3Fx+dcterms%3Asubject+%3Chttp%3A%2F%2Fes.dbpedia.org%2Fresource%2FCategor%C3%ADa%3AGuerra_Civil_Espa%C3%B1ola_en_el_Pa%C3%ADs_Vasco%3E+%0D%0A%7D))

([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())
([Ejecutar]())

# Descarga de datos

Todos los datos en RDF Turtle: [dump.zip](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi/tree/master/datos/dump.zip).

# Herramientas usadas

Triple Store: [Blazegraph](https://www.blazegraph.com/). La Triple Store se despliega como un war de solo lectura en un ^[container Docker que incluye Tomcat](https://github.com/mikel-egana-aranguren/BlazegraphDocker/tree/READONLY-WAR-BLAZEGRAPH_RELEASE_2_1_4-ConcursoOpenDataEuskadi-2018).

Transformación de datos a RDF:
* Programas ad-hoc.
* [OntoRefine](http://graphdb.ontotext.com/free/loading-data-using-ontorefine.html) de GraphDB.
	
Reconciliación de entidades con DBPedia: [Open Refine](http://openrefine.org/) con plugin RDF.

Repositorio GitHub: [GuerraCivilEuskadi](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi).

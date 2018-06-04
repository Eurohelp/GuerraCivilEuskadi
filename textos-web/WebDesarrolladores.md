# Consultas SPARQL

SPARQL endpoint de lectura: http://172.16.0.81:58080/blazegraph/#query

Lista de consultas de ejemplo (texto y enlace)

# Descargas de datos

[Dump en Turtle de todos los datos](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi/tree/master/datos/dump.zip).

Consulta DBpedia para extraer datos sobre la guerra civil en Euskadi:

```
PREFIX dcterms:<http://purl.org/dc/terms/>

SELECT ?x WHERE{
   ?x dcterms:subject <http://es.dbpedia.org/resource/Categor�a:Guerra_Civil_Espa�ola_en_el_Pa�s_Vasco> 
}
```

# Herramientas usadas

Triple Store: [Blazegraph](https://www.blazegraph.com/).

Transformaci�n de datos a RDF:
* Programas ad-hoc.
* [OntoRefine](http://graphdb.ontotext.com/free/loading-data-using-ontorefine.html) de GraphDB.

Reconciliaci�n de entidades con DBPedia: [Open Refine](http://openrefine.org/) con plugin RDF.

Repositorio GitHub: [GuerraCivilEuskadi](https://github.com/mikel-egana-aranguren/GuerraCivilEuskadi).

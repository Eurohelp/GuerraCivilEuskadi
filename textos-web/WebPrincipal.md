# Introducción

Esta web ofrece una visión integral de los datos abiertos sobre la Guerra Civil en Euskadi. Con ella pretendemos ofrecer una herramienta para el análisis de ese evento histórico, pero también material docente para la impartición de la tan necesaria memoria histórica. En ella podrás encontrar datos sobre bombardeos, fosas comunes, personas desaparecidas, batallas, y leyes aprobadas por el Gobierno Provisional de Euzkadi. Los datos se pueden explorar mediante las visualizaciones de mapa (para datos geolocalizados) o timeline (para eventos). También existen indicadores que sirven como ejemplo del tipo de conclusiones que se pueden sacar, explotando la potencia de los Datos Enlazados (Linked Data). Por último, se ofrece una página web adicional para desarrolladores y/o expertos en datos, donde pueden hacer consultas SPARQL directamente sobre los datos, bajar los datos como dumps, etc.   

# Datos Enlazados

La tecnología principal que hemos usado es la de Datos Enlazados ([Linked Data](https://www.w3.org/standards/semanticweb/data)), ya que permite publicar datos con mayor interoperabilidad. Los Datos Enlazados se basan en seguir estos principios:

1. Asignar URIs a las entidades de los datos.
2. Hacer esas URIs accesibles mediante HTTP.
3. Cuando un usuario acceda a una URI, proveer datos sobre la entidad con estándares abiertos como RDF y SPARQL.
4. Añadir enlaces a otras URIs, de modo que el usuario o agente que esté consumiendo los datos pueda descubrir datos nuevos, "navegando" sobre los datos de manera análoga a la navegación web.  

La fuente principal de datos es el portal de datos Open Data Euskadi:
* [Legislación de la Comunidad Autónoma de Euskadi (BOPV) - European Legislation Identifier (ELI) (1936 - 1999)](http://opendata.euskadi.eus/catalogo/-/legislacion-de-la-comunidad-autonoma-de-euskadi-bopv-european-legislation-identifier-eli/).
* [Bombardeos de la Guerra Civil en Euskadi](http://opendata.euskadi.eus/catalogo/-/bombardeos-de-la-guerra-civil-en-euskadi/).
* [Listado de personas desaparecidas durante la Guerra Civil y el Franquismo](http://opendata.euskadi.eus/catalogo/-/listado-de-personas-desaparecidas-durante-la-guerra-civil-y-el-franquismo/).
* [Localización de la fosas comunes de la Guerra Civil y del Franquismo en Euskadi](http://opendata.euskadi.eus/catalogo/-/localizacion-de-la-fosas-comunes-de-la-guerra-civil-y-del-franquismo-en-euskadi/). 

Estos datos han sido enlazados, en la medida de lo posible, localidades descritas en la [DBpedia](https://dbpedia.org). También se han extraído datos de la DBPedia sobre batallas y otros sucesos. 

# Indicadores 

## Leyes

[Leyes emitidas por el gobierno provisional de Euzkadi sobre alistamiento](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=PREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+%0D%0APREFIX+eli%3A+%3Chttp%3A%2F%2Fdata.europa.eu%2Feli%2Fontology%23%3E+%0D%0APREFIX+graph%3A%3Chttp%3A%2F%2Fdata.euskadi.eus%2Fgraph%2F%3E%0D%0A%0D%0ASELECT++DISTINCT+%3FdatePub+%3Flegeguneaurl+%3Ftitle%0D%0AWHERE+%7B%0D%0A%0D%0A%09%09%3Flegalresource+eli%3Adate_publication+%3FdatePub+.%0D%0A%09%09%3Flegalresource+eli%3Ais_realized_by+%3Flegalexpresion+.%0D%0A++++++++%3Flegalexpresion+eli%3Alanguage++%3Chttp%3A%2F%2Fpublications.europa.eu%2Fresource%2Fauthority%2Flanguage%2FSPA%3E+.%0D%0A++++%09%3Flegalexpresion+eli%3Atitle+%3Ftitle+.%0D%0A%09%09%3Feliformat+eli%3Aembodies+%3Flegalexpresion+.%0D%0A%09%09%3Feliformat+schema%3AmainEntityOfPage+%3Flegeguneaurl+.%0D%0A+++++FILTER+%28%3FdatePub+%3E+%221936-07-18%22%5E%5Exsd%3Adate++%26%26+%3FdatePub+%3C+%221937-07-31%22%5E%5Exsd%3Adate%29%0D%0A++%09+FILTER+regex+%28str%28%3Ftitle%29%2C+%22alistamiento%22%2C+%22i%22%29%0D%0A%7D)

## Partidos políticos y fosas comunes

[¿Cuál es el partido politico actual en poder en pueblos que han tenido fosas comunes?](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=PREFIX+dbo%3A%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0D%0APREFIX+schema%3A%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0APREFIX+rdf%3A%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%2A%0D%0AWHERE+%7B%0D%0A++++%3Ffosa+rdf%3Atype+%3Chttp%3A%2F%2Frdf.muninn-project.org%2Fontologies%2Fgraves%23Mass_grave%3E+.%0D%0A%09%3Ffosa+schema%3Alocation+%3Fpueblofosa+.%0D%0A%09SERVICE+%3Chttps%3A%2F%2Fdbpedia.org%2Fsparql%3E+%7B%0D%0A%09%09%3Fpueblofosa+dbo%3AleaderParty+%3Fparty+.%0D%0A%09%7D%0D%0A%7D)

## Desaparecidos y causas de muerte

[De las causas de muerte recogidas en los datos de desaparaciones, ¿Cuál es la que más muertos causó?](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=SELECT+%3Fmode+%28COUNT%28%3Fperson%29+as+%3FnumeroMode%29%0D%0AWHERE+%7B%0D%0A%09%3Fperson+%3Chttp%3A%2F%2Fid.euskadi.eus%2Fdef%2Feuskadipedia%2Fdeath-mode%3E+%3Fmode%0D%0A%7D%0D%0AGROUP+BY+%3Fmode%0D%0AORDER+BY+%28%3FnumeroMode%29)

## Bombardeos de la legión Cóndor

[Bombardeos efectuados por la Legión Cóndor](http://172.16.0.81:58080/blazegraph/namespace/ConcursoOpenDataEuskadi/sparql?query=SELECT++DISTINCT+%3Flocation+%3Fdate+%3Fsource+%3Fcomment%0D%0AWHERE+%7B%0D%0A%09%3Fbombing+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FAerial_bombing_of_cities%3E+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fschema.org%2Flocation%3E+%3Flocation+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2Fdate%3E+%3Fdate+.+++++++++%0D%0A++%09%3Fbombing+rdfs%3Acomment+%3Fcomment+.%0D%0A++++%3Fbombing+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fsource%3E+%3Fsource%0D%0A++++FILTER+regex+%28str%28%3Fsource%29%2C+%22C%C3%B3ndor%22%2C+%22i%22%29%0D%0A%7D%0D%0AORDER+BY+%3Fdate)

## Algo con datos DBPedia???
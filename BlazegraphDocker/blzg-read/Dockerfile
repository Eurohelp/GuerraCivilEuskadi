# https://github.com/mikel-egana-aranguren/BlazegraphDocker/blob/READONLY-WAR-BLAZEGRAPH_RELEASE_2_1_4/Dockerfile

FROM mlaccetti/docker-oracle-java8-ubuntu-16.04
MAINTAINER Mikel Egaña Aranguren <mikel.egana.aranguren@gmail.com>

COPY lod/data/blazegraph.jnl /opt/blazegraph.jnl

WORKDIR /opt
RUN wget http://ftp.cixug.es/apache/tomcat/tomcat-8/v8.0.52/bin/apache-tomcat-8.0.52.tar.gz
RUN tar -xvzf apache-tomcat-8.0.52.tar.gz
COPY blazegraph-war/target/blazegraph-war-2.1.4.war /opt/apache-tomcat-8.0.52/webapps/blazegraph.war
COPY blazegraph-war/target/linkeddata.war /opt/apache-tomcat-8.0.52/webapps/linkeddata.war

COPY TomcatCron.sh /root/
RUN chmod +x /root/TomcatCron.sh
CMD /root/TomcatCron.sh

EXPOSE 8080

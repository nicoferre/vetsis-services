FROM openjdk:11.0-jre-slim

RUN mkdir /code
COPY build/libs/*-shadow.jar /code


ENTRYPOINT [ "sh", "-c", "java -jar -Duser.timezone=$TIMEZONE -Dnetworkaddress.cache.ttl=60 /code/*.jar" ]

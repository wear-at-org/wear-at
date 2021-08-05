# java server build
FROM openjdk:15-jdk-alpine AS appBuilder

WORKDIR /wearat

COPY ./server .

RUN chmod +x gradlew
RUN ./gradlew bootJar


# web build
FROM node:14.17.4-alpine as webBuilder

ARG BUILD_ENV

WORKDIR /wearat/web

# 패키지 설치는 변경사항이 있을때만 하도록 분리
COPY ./web/package*.json ./
RUN yarn install

COPY ./web .

RUN yarn build:${BUILD_ENV}


# dist
FROM openjdk:15-jdk-alpine

COPY --from=appBuilder /wearat/build/libs/*.jar /wearat/app.jar
COPY --from=webBuilder /wearat/web/build /wearat/static/

WORKDIR /wearat

ARG BUILD_ENV

ENV SPRING_PROFILES_ACTIVE=${BUILD_ENV}

EXPOSE 8089

CMD java -jar app.jar

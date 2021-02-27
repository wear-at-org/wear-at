# scot
SCOT web service

- SCOT community: https://scotscot.atlassian.net/wiki/spaces/SCOT/overview?homepageId=294914

## spec
- backend: spring boot
- frontend: react, redux
- db: mysql

## 서버 실행
```
# 디비 생성
cd server
docker-compose up

# 서버 실행
cd server
gradle bootrun -Dspring.profiles.active=local

# 서버 빌드
gradle build

# docker 통합(back+front)빌드
--추후 추가
```


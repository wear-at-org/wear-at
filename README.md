# Wear'At
Wear'At web service

- Wear'At community: https://www.notion.so/e761b4d3d09d4dc7a509338a80c70e87?v=5e7494b1a7dd4ac1925fe31ec591b06f

## spec
- backend: spring boot
  - openjdk version "15.0.2" 2021-01-19
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


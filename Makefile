BUILD_ENV=dev
BUILD_TAG=0.0.1
DOCKER_DIST_TAG=wearat/wearat

## docker 설치 참고: https://jjeongil.tistory.com/1317

.PHONY: all
all: build push deploy

.PHONY: build
build:
	docker build --build-arg BUILD_ENV=${BUILD_ENV} -t ${DOCKER_DIST_TAG}:${BUILD_TAG} .

.PHONY: push
push: 
	docker push ${DOCKER_DIST_TAG}:${BUILD_TAG}

.PHONY: conn
conn:
  # domain 변경 시 .ssh/config 수정
	ssh key.h@34.64.199.3

.PHONY: deploy-local
deploy-local:
	docker run -it -p 8089:80 ${DOCKER_DIST_TAG}:${BUILD_TAG}

.PHONY: deploy
deploy:
  # TODO ansible
  # docker \
	# -H ssh://ubuntu@ec2-3-36-126-52.ap-northeast-2.compute.amazonaws.com \
	# run -d -it \
	# -p 8089:80 \
	# ${DOCKER_DIST_TAG}:${BUILD_TAG}
	ssh key.h@34.64.199.3 sh wearat.sh

.PHONY: db
db: 
  # TODO ansible
  # docker run  -it \
	# -p 3306:3306 \
	# -v /home/ubuntu/mysql/scripts/db_initialize.sql:/data/application/init.sql \
	# -v /home/ubuntu/mysql/data:/var/lib/mysql \
	# -e MYSQL_ROOT_USER='root' \
	# -e MYSQL_ROOT_PASSWORD='wearat123!@#' \
	# -e MYSQL_DATABASE='wearat' \
	# -e MYSQL_USER='wearat' \
	# -e MYSQL_PASSWORD='wearat123!@#' \
	# mysql
	ssh key.h@34.64.199.3 sh db.sh

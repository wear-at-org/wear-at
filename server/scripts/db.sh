   sudo docker run  -t \
	-p 3306:3306 \
	-v /home/ubuntu/mysql/scripts/db_initialize.sql:/data/application/init.sql \
	-v /home/ubuntu/mysql/data:/var/lib/mysql \
	-e MYSQL_ROOT_USER='root' \
	-e MYSQL_ROOT_PASSWORD='wearat123!@#' \
	-e MYSQL_DATABASE='wearat' \
	-e MYSQL_USER='wearat' \
	-e MYSQL_PASSWORD='wearat123!@#' \
	mysql
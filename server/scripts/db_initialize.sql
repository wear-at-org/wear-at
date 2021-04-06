CREATE DATABASE IF NOT EXISTS wearat;
USE wearat;

CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  WITH GRANT OPTION;

CREATE USER 'wearat'@'%' IDENTIFIED BY 'wearat123!@#';
GRANT ALL PRIVILEGES ON *.* TO 'wearat'@'%' WITH GRANT OPTION;
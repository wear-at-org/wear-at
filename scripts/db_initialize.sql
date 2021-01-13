CREATE DATABASE IF NOT EXISTS scot;
USE scot;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

CREATE USER 'scot'@'%' IDENTIFIED BY 'scot123!@#';
GRANT ALL PRIVILEGES ON *.* TO 'scot'@'%' WITH GRANT OPTION;
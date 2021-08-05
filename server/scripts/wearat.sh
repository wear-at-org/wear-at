sudo docker stop $(sudo docker ps -q --filter ancestor=wearat/wearat:0.0.1 )

sudo docker pull wearat/wearat:0.0.1

sudo docker run -d -it -p 80:8089 wearat/wearat:0.0.1
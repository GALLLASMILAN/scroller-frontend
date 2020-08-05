aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 426811861165.dkr.ecr.eu-central-1.amazonaws.com/node-scroller-frontend
docker build -t react-scroller .
docker tag react-scroller:latest 426811861165.dkr.ecr.eu-central-1.amazonaws.com/node-scroller-frontend:latest
docker push 426811861165.dkr.ecr.eu-central-1.amazonaws.com/node-scroller-frontend:latest
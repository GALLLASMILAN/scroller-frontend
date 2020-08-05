## (stage 1) image contains Node.js and NPM
## - copy package.json and install dependencies
## - copy only the application code (no test and other files to development)
FROM mhart/alpine-node:12 AS build   
WORKDIR /srv                        
ADD package.json .                  
RUN npm install --production --silent
ADD build .                           

## (stage 2) very small node.js image = https://github.com/mhart/alpine-node/blob/76072fcd2a44c94b9e111d632720c891d8bdd3c3/slim.dockerfile
## - copy the app from previous stage
## - define default port and command to run
FROM mhart/alpine-node:12
COPY --from=build /srv . 
RUN npm install serve -g
EXPOSE 5000                         
CMD ["serve", "."]
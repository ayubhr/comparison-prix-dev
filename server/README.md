# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Install Docker ([instructions](https://www.docker.com/get-started/)) and run it by executing `docker`
- `docker pull mongo` To download MongoDB image
- `docker run -d  --name mongo-price-comparison  -p 27017:27017 mongo` To run container
- `npm start` to start the local server
- cd scrape-jobs/mega.tn
- `npm install` to install all required dependencies
- `npm run test` To use TEST version
- `npm start` To use PROD version
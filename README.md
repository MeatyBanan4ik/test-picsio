# Test For Pics.IO

### Table of Contents
**[Getting Started](#getting-started)**

- **[Deployment](#deployment)**
- **[Configure and Install dependencies](#configure-and-install-dependencies)**
- **[Run worker](#run-worker)**
- **[Run development](#run-development)**
- **[Endpoints](#endpoints)**

**[Technologies](#technologies)**

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. You can also view the Postman collection by opening the file `postman_collection.json`

#### Deployment

1. Clone this repository on your machine
2. Install dependencies and create your environment configuration file from example:
   ```shell script
   make build 
   ```
3. Set config data to `config.js` file
4. Run the app
   ```shell script
   yarn start
   ```

#### Configure and Install dependencies

```shell script
make build
```

#### Run worker

```shell script
yarn start
```

#### Run development

```shell script
yarn dev
```

#### Endpoints

1. **Login**:
 - URI: ``/auth/login`` 
 - Method: ``POST``
 - Body:
```json
{ 
   "email": "ad@min.test", 
   "password": "admin"
}
```
2. **Register**: 
 - URI: ``/auth/register`` 
 - Method: ``POST``
 - Body: 
```json
{ 
   "email": "ad@min.test", 
   "name": "admin", 
   "password": "admin"
}
```
3. **Refresh**: 
 - URI: ``/auth/refresh`` 
 - Method: ``POST``
 - Body: 
```json
{ 
   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlLnN0IiwiaWF0IjoxNzA4MTk0NjU3LCJleHAiOjE3MDg3OTk0NTd9.GkfaLiCsHFYjQmy9Gx0Ez0WU4iSmF86TywaOUbz5YQw"
}
``` 
4. **Send event**: 
 - URI: ``/events/send`` 
 - Method: ``POST``
 - Body:
```json
{ 
   "payload": { 
      "a": 3 
   }, 
   "possibleDestinations": [
      { 
         "destination1": true, 
         "destination2": true, 
         "destination3": true  
      },  
      { 
         "destination1": false, 
         "destination3": false  
      },  
      { 
         "destination1": true, 
         "destination2": false, 
         "destination4": false  
      },  
      { "destination5": true  } 
   ], 
   "strategy": "() => { return true; }"
}
```

### Technologies
1. [Node.js](https://nodejs.org/)
2. [Mongo](https://www.mongodb.com/)
3. [Express.JS](https://expressjs.com/)
4. [Mongoose](https://mongoosejs.com/)
5. [Got](https://github.com/sindresorhus/got)
6. [Log4JS](https://log4js-node.github.io/log4js-node/)

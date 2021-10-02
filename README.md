## Pre-conditions
In order to run this project you must have installed:
- php
- laravel
- mySQL
- node.js
- Angular

## Installation

###### Server

Once you've cloned the project, open command prompt/terminal and go to the server folder:
```
cd server
```
now install composer:
```
composer install
```
Copy .env.example file to .env on the server folder. You can type copy .env.example .env if using command prompt Windows or cp .env.example .env if using terminal

Open your .env file and change the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration.

Once you've finised, run this commands:
```
php artisan key:generate
php artisan migrate
```

Congratulations! now the server is ready to run. to activate it, use the following command:
```
php artisan serve
```

At this point the server side should be running in localhost:8000 and can accept http requests.
For the purpose of this project, the only relvant requests would be for the games collections using the api at the address http://localhost:8000/api/games

###### Client

Now to set up the client side, open another terminal and nevigate to the client folder. from the root:
```
cd client
```

To install all dependencies run:
```
npm install
```

Now the client application is ready to run.
**Pay attention**: if you configured the server to run using a different address than localhost:8000 (or http:127.0.0.1:8000), you should update the *apiUrl* field inside *client/src/environments/environment.ts*

To run the client, use the following command inside the client folder:
```
ng serve
```
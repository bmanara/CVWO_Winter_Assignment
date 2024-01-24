# CVWO Winter Assignment 2024
---

## Getting Started 
1. You require the following prerequisites
    - Ruby 3.2.2
    - npm 10.2.3
    - PostgreSQL 14.10
    - Bundler 2.4.22 

2. Clone the repo
```
$ git clone git@github.com:bmanara/CVWO_Winter_Assignment.git
```

3. Installing dependencies
```
$ bundle install
```

4. Setup the database
```
$ rails db:create
$ rails db:migrate
$ rails db:seed
```
Note: You may need to grant yourself permissions to create databases.
This link may be able to help with the setup. 
https://stackoverflow.com/questions/28116927/rails-postgres-permission-denied-to-create-database-on-rake-dbcreateall

5. Start the server
```
$ rails s
```

6. Start the frontend
```
$ cd frontend
$ npm install
$ npm run dev
```

7. Open the web application from link 'localhost:5173'



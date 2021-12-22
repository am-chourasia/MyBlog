# GraphQL Blog Server with Node Backend

This Repository contains code for backend of a basic blog application.

## 📜 Tech-Stack Used:

<p align="left"> 
  <a href="https://nodejs.org" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/> 
  </a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/> 
  </a> 
  <a href="https://expressjs.com" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/> 
  </a> 
  <a href="https://jwt.io/" target="_blank"> 
  <img src="https://jwt.io/img/pic_logo.svg" alt="jwt" width="60" height="60" style="background-color:black;"/> 
  </a> 
  <a href="https://graphql.org" target="_blank"> 
  <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="60" height="60"/> 
  </a> 
  <a href="https://www.apollographql.com/" target="_blank"> 
  <img src="https://camo.githubusercontent.com/492d19f5d3fb07917042aa9f7b962c6a98d0847afdbc3586211b36c84a7af957/687474703a2f2f7261776769742e636f6d2f6f6f6164652f617765736f6d652d61706f6c6c6f2d6772617068716c2f6d61737465722f6c6f676f2e737667" alt="apollo" width="60" height="60"/> 
  </a> 
  <a href="https://www.mongodb.com/" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="60" height="60"/> 
  </a> 
  <a href="https://postman.com" target="_blank"> 
  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="60" height="60"/> 
  </a>
</p>

</br>

## 💾 Installation and usage

1. Clone the repo:

```
https://github.com/am-chourasia/MyBlog.git
```

2. Setup the environement variable from the .env environment given.
3. Open the terminal and start the server:

```
cd server
npm start
```

  <img src="./assets/server_start.png" width="400">

4. Open the url and start querying :)

## 📂 Server Folder Structure

```
.
├── directives // custom directive for authorization
├── helpers   // helpers for database connection and authentication
├── model     // models for mongoDB database
├── resolvers   // resolvers for graphql queries and mutations
└── typeDefs    // schemas for graphql server
```

## 📑 Overview

The GraphQL Schema provides two objects:

1. Users
2. Posts

These two objects contains various fields which can be used by frontend. \
`JWT` Authentication and Authorization for all signed in user with Custom Directive is also provided. \
The password entered by user is encripted before being added to the database with the `bcrypt` library.
</br>
</br>

### Features that can be added:

1. Adding Comments feature for the posts, linking it with users commenting on the post.
2. 'Follow' features for users to follow other users.

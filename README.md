# nc-news

NC-News is a 2 weeks project created as part of the Northcoders Bootcamp. The aim is to create a news website that allows you to navigate through the different articles, topics and users and interact with them (logging in, posting comments or upvoting/downvoting...). This github project is the backend part, created with Express and hosted on heroku.  
Links to the frontend and hosted version are available below.


## Installation and available scripts

To run the project locally :

```bash
npm install
npm start
```

To run the tests :

```bash
npm test
```

To run the tests on the util functions used in the seed file :

```bash
npm test-utils
```

## List of available Endpoints

The available endpoints are listed below :
```http
GET /api/topics
GET /api/users/:username
GET /api/articles/:article_id
PATCH /api/articles/:article_id
POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments
GET /api/articles
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
GET /api
```

## Useful links

Link to the hosted version : https://nc-news-api-marie.herokuapp.com/api
This gives a description of all the available endpoints and their output.

Link to the frontend github repository : https://github.com/Mariefay/nc-news-FE
Link to the hosted version of the frontend : https://marie-nc-news-frontend.herokuapp.com/

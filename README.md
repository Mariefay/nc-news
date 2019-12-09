# nc-news

NC-News is a news website that allows you to navigate through the different articles or topics and interact with them. 
Frontend part created with React, backend with Express.

## Installation

```bash
npm install
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

## Contributing

Pull requests are welcome

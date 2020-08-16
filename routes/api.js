/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
const booksController = require('../controllers/booksController');
module.exports = function (app) {
  app.get('/api/books', booksController.getBooks);
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

  app.post('/api/books', booksController.createBook);

  app.delete('/api/books', booksController.deleteBooks);
  //if successful response will be 'complete delete successful'

  app.get('/api/books/:id', booksController.getBook);
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

  app.post('/api/books/:id', booksController.addComment);
  //json res format same as .get

  app.delete('/api/books/:id', booksController.deleteBook);
  //if successful response will be 'delete successful'
};

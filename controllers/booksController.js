require('dotenv').config();
const { ObjectID } = require('mongodb');
const mongo = require('../db/mongo');

//Create a Book
exports.createBook = (req, res) => {
  let book = {};
  book.title = req.body.title;
  book._id = new ObjectID();
  book.commentcount = [];
  mongo(async function (db) {
    try {
      if (!book) {
        return res.status(404).send();
      }
      await db.insertOne(book);
      console.log('success!', book);
      return res.send({ _id: book._id, title: book.title });
    } catch (e) {
      return res.send({ error: e.message });
    }
  });
};

//Read all books
exports.getBooks = (req, res) => {
  mongo(async function (db) {
    try {
      let books = await db.find({}).toArray();
      console.log('success!', books);
      if (!books) {
        return res.status(404).send();
      }
      return res.send(books);
    } catch (e) {
      return res.send({ error: e.message });
    }
  });
};

//Read a book
exports.getBook = (req, res) => {
  mongo(async function (db) {
    try {
      let book = await db.findOne({ _id: ObjectID(req.params.id) });
      console.log('success!', book);
      if (!book) {
        return res.status(404).send('no book exists');
      }
      return res.send(book);
    } catch (e) {
      return res.send('no book exists');
    }
  });
};

//Post a comment
exports.addComment = (req, res) => {
  mongo(async function (db) {
    try {
      const result = await db.updateOne(
        { _id: ObjectID(req.params.id) },
        { $push: { commentcount: req.body.comment } },
        { upsert: false }
      );
      console.log('Success!', result);
      return res.send(result);
    } catch (e) {
      return res.send({ error: e.message });
    }
  });
};

//Delete a book
exports.deleteBook = (req, res) => {
  try {
    mongo(async function (db) {
      let book = await db.deleteOne({ _id: ObjectID(req.params.id) });
      if (!book) {
        return res.status(404).send('no book exists');
      }
      console.log('success!');
      return res.send('delete successful');
    });
  } catch (e) {
    return res.send({ error: e.message });
  }
};

//Delete all books
exports.deleteBooks = (req, res) => {
  try {
    mongo(async function (db) {
      let book = await db.deleteMany();
      console.log('success!');
      return res.send('complete delete successful');
    });
  } catch (e) {
    return res.send({ error: e.message });
  }
};

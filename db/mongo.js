//Connecting to mongo db
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.DB;
module.exports = function (action) {
  MongoClient.connect(
    CONNECTION_STRING,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log('MongoClient Connected');
        const db = client.db('fcc').collection('books');
        return action(db);
      }
    }
  );
};

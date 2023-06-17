const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://piyushv:fr5Cp8tHaAJ06R4N@cluster0.l7fuzif.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log("Connected!!");
    _db = client.db();
    callback(client);
  })
  .catch(err => {
    console.log("Error while conncting!!");
    console.log(err);
    throw err;
  });
}

const getDb = () => {
  if(_db){
    return _db;
  }
  throw "No database found!!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
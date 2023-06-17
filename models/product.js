const mongodb = require('mongodb')

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})
    }else{
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("here");
        console.log(result);
        return this;
      })
      .catch((err) => {
        console.log("error while inserting!!");
        console.log(err);
      });
    // db.collection('products').insertOne(this);
    // return this;
    }

    static fetchAll() {
      const db = getDb(); 
      return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log("error in fetching", err);
      });
    }

    static findById(prodId) {
      const db = getDb();
      return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log("error while finding", err);
      })
    }

    static deleteById(prodId){
      const db = getDb();

      return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log(result);
        return this;
      })
      .catch(err => {
        console.log("error while deleteing", err);
      })
    }
}

module.exports = Product;

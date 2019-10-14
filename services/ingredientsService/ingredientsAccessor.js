/** requires and dependencies */
const MongoClient = require('mongodb').MongoClient;

/** Constants */
const url = 'mongodb://acmongodb:4dFk4HyuEPwA57n1vEIvqdUPZV7jb4Bd3jDBAL9cfzKHMyOvC6fImNYQt7kzy6Wv0eOJdF330Ka48fN523yIYQ==@acmongodb.documents.azure.com:10255/?ssl=true'; // Connection URL
const dbName = 'iCanCookDB'; // Database name
const collectionName = 'ingredients'; // Collection Name
 
/** Class definition */
class IngredientsAccessor {
  /** Constructor */
  constructor(){
    // Create a new MongoClient
    this._client = new MongoClient(url, { useNewUrlParser: true });
  }

  /** Public methods */
  getName(id, callback){
    this._client.connect(function(err,res) {
      if(err){
        throw err;
      }
      else{
        const collection = res.db(dbName).collection(collectionName);
        collection.findOne({'id':id},function(err, doc) {
          if(err){
            throw err;
          }
          else{
            if(doc && (typeof doc == 'object') && (doc.hasOwnProperty('name'))){
              callback(null,doc.name);
            }
            else{
              callback(new Error('ingredient not found'));
            }
          }
        });
      }
    });
  }

  getList(callback){
    this._client.connect(function(err,res) {
      if(err){
        throw err;
      }
      else{
        const collection = res.db(dbName).collection(collectionName);
        collection.find({}).toArray(function(err, docs) {
          if(err){
            throw err;
          }
          else{
            console.log(docs);
            const ingredients = [];
            for(const doc of docs){
              console.log(doc);
              ingredients.push(doc.name);
            }
            callback(null,ingredients);
          }
        });
      }
    });
  }

  /** Private methods */
  _connect(){
    this._client.connect(function(err) {
      if(err){
        console.log(err);
      }
      else{
        console.log('Connected successfully to server');
        this._collection = this._client.db(dbName).collection(collectionName);
      }
    });
  }
}

module.exports = IngredientsAccessor;






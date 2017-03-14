// Why do we connect mongo db here
// because when we import a model, this var is global
// so will be executed.
var mongodb = require('../connect');
// mongoose schema, used as new Schema
var Schema = mongodb.mongoose.Schema;
// var promise
// requre
// es6 promise, other promise lib
var Promise = require('es6-promise').Promise;

var CategorySchema = new Schema({
  name: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

// constructor
var CategoryDAO = function(){};
var Category = mongodb.mongoose.model('Category', CategorySchema);

// empty func, prototype
CategoryDAO.prototype =  {
  constructor: CategoryDAO,

  save: function(obj){
    // return new promise
    // func
    // resolve, reject
    return new Promise(function(resolve, reject){
      // var instace
      // new Aritcle, obj
      // obj from above
      var instance = new Category(obj);
      // instance
      // .save
      // func, err
      instance.save(function(err){
        // err
        if(err) return reject(err);
        // resolve
        resolve();
      });
    });
  }, // end save

  delete: function(query) {
    // return new promise
    // func, resolve, reject
    return new Promise(function(resolve, reject){
      // article
      // .remove
      // query, what is query
      // func, err, data
      Category.remove(query, function(err, data){
        // if err, return, reject, err
        if(err) return reject(err)
        // resolve data
        resolve(data);
      });
    });
  },
};

// module
// .exports
// article dao
module.exports = CategoryDAO;

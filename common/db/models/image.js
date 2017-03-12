// mongodb, which is the mongoose instance
var mongodb = require('../connect');
// mongoose schema, used as new Schema
var Schema = mongodb.mongoose.Schema;
// var promise
// requre
// es6 promise, other promise lib
var Promise = require('es6-promise').Promise;

var ImageSchema = new Schema({
    id: { type: String, index: true },
    fileName : String,
    filePath : String
});

var ImageDAO = function(){};
var Image = mongodb.mongoose.model('Image', ArticleSchema);

// empty func, prototype
ImageDAO.prototype =  {
  constructor: ImageDAO,

  save: function(obj){
    // return new promise
    // func
    // resolve, reject
    return new Promise(function(resolve, reject){
      // var instace
      // new Aritcle, obj
      // obj from above
      var instance = new Image(obj);
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
  } // end save

};

// module
// .exports
// article dao
module.exports = ImageDAO;

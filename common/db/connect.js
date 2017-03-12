// use var, global
// var mongoose
// require
// mongoose
var mongoose = require('mongoose');

// attach to mongoose (global) with Promise
// mongoose
// .promise
// global.Promise
// there is a global promise
mongoose.Promise = global.Promise;

// config
// get mongo config
var config = require('../../config').mongo;

// mongo db url
var dbUrl = config.url();

// db option
var dbOption = config.mongoOptions;

// connect
// mongoose
// .connect
// db url
// db option
mongoose.connect(dbUrl, dbOption);

// export, so other can use it
// exports
// .mongoose
// =
// mongoose
exports.mongoose = mongoose;

// use strict
"use strict";

// glob, search files
const glob = require("glob");

const PromiseChain = require('es6-promise-chain');

// db config
const config = require('../../config');

//
var mongodb = require('../db/connect');

// image
const ImageDAO = require('../db/models/image');
// because ImageDAO has a constructor.
const imageDAO = new ImageDAO();

// category
const CategoryDAO = require('../db/models/category');
// because CategoryDao has a constructor.
const categoryDAO = new CategoryDAO();

// const task, const because never change
const Task = {
  // main entry method, fire
  fire: function() {
    this.delete()
      .then(() => {
        this.createCategory()
          .then(() => {
            console.log("---- now import ---");
            this.import().then(() => {
              console.log('--- all done ---');
              process.exit(1);
            });
          });

        // I cannot call exit here, because IO is above, need to use callback.
        //process.exit(1);
      });
  },

  import: function() {
    let imgDirs = config.imgRootPath.paths;
    let that = this;
    return PromiseChain.forEach(imgDirs, (imgDir) => {
      return new Promise(function(resolve, reject){
        let globPath = imgDir;
        //console.log(item);
        let options = {};

        glob(globPath, options, (er, files) => {
          // all files ready
          let filesPromise = files.map((x) => {
            // Have to return here, in fact, there are lots of time, I need to return
            // because, need to return ......
            // https://stackoverflow.com/questions/12344087/using-javascript-map-with-a-function-that-has-two-arguments
            return that.saveToDB(x, mongodb.mongoose.Types.ObjectId());
          });

          // http://www.datchley.name/es6-promises/
          return Promise.all(filesPromise)
            .then((res) => {
              console.log("Finish: " + globPath);
              resolve();
            });
        });

      });
    });

  },

  delete: function() {
    return imageDAO.delete({})
      .then(() => {
        console.log("--- Delete all documents in image collection ----");
        // have to keep returning promise
        return categoryDAO.delete({}).then(() => {
          console.log("--- Delete all documents in category collection ----");
          return Promise.resolve({});
        });
      });

  },

  saveToDB: function (item, category) {
    let filePath = item;
    let arr = item.split('/');
    let fileName = arr[arr.length - 1];

    //console.log(filePath, fileName);
    let data = {
      fileName: fileName,
      filePath: filePath,
      categoryId: category
    };

    return imageDAO.save(data);
  },

  createCategory: function() {
    let arr = [
      "tmp_cr",
      "tmp_bt"
    ];

    return PromiseChain.forEach(arr, (category) => {
      return new Promise(function(resolve, reject){
        let data = {
          name: category
        };

        categoryDAO.save(data).then(() => {
          console.log("save category: " + category);
          resolve();
        })
      });
    });

  }

}



module.exports = Task;

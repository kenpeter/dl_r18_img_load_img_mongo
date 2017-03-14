// use strict
"use strict";

// glob, search files
const glob = require("glob");

const PromiseChain = require('es6-promise-chain');

// db config
const config = require('../../config');

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
        console.log("then importing...");
        this.import().then(() => {
          console.log('--- all done ---');
          process.exit(1);
        });

        // I cannot call exit here, because IO is above, need to use callback.
        //process.exit(1);
      });
  },

  /*
  import: function() {
    let imgDir = config.imgRootPath.paths;
    let options = {};
    glob(imgDir, options, (er, files) => {
      // all files ready
    	//console.log(files);
      let filesPromise = files.map(this.saveToDB);

      // http://www.datchley.name/es6-promises/
      Promise.all(filesPromise)
        .then((res) => {
          console.log("Finish import image to mongodb");
          // Here we get out!!!!!!!!!!!!!!!!!!!!!!!!!
          process.exit(0);
        });
    });
  },
  */

  /*
  import: function() {
    let imgDirs = config.imgRootPath.paths;
    let globPromise = imgDirs.map(this.globEach);
    Promise.all(globPromise)
      .then((res) => {
        console.log("Finish import image to mongodb");
        // Here we get out!!!!!!!!!!!!!!!!!!!!!!!!!
        process.exit(0);
      });

  },
  */

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
        	//console.log("no.....?");
          let filesPromise = files.map(that.saveToDB);

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

  globEach: function(item) {
    let globPath = item;
    //console.log(item);
    let options = {};

    glob(globPath, options, (er, files) => {
      // all files ready
    	console.log("no.....?");
      let filesPromise = files.map(this.saveToDB);

      // http://www.datchley.name/es6-promises/
      return Promise.all(filesPromise)
        .then((res) => {
          console.log("Finish: " + globPath);
        });
    });
  },

  saveToDB: function (item){
    let filePath = item;
    let arr = item.split('/');
    let fileName = arr[arr.length - 1];

    //console.log(filePath, fileName);
    let data = {
      fileName: fileName,
      filePath: filePath
    };

    return imageDAO.save(data);
  }
}

module.exports = Task;

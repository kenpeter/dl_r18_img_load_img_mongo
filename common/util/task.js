// use strict
"use strict";

const glob = require("glob");

const config = require('../../config');
const ImageDAO = require('../db/models/image');
const imageDAO = new ImageDAO();

const Task = {
  fire: function() {
    this.delete()
      .then(() => {
        console.log("then importing...");
        this.import();

        // I cannot call exit here, because IO is above, need to use callback.
        //process.exit(1);
      });
  },

  import: function() {
    let imgDir = config.imgRootPath.path;
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

  delete: function() {
    return imageDAO.delete({})
      .then(() => {
        console.log("--- Delete all documents in image collection ----");
        return Promise.resolve({});
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

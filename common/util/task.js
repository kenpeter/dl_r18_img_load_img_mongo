// use strict
"use strict";

const glob = require("glob");

const CONFIG = require('../../config');

const Task = {
  fire: function() {
    this.import();
  },

  import: function() {
    let imgDir = '/var/www/html/test/testme/dl_r18_img/upload/**/*.jpg';
    let options = {};
    glob(imgDir, options, (er, files) => {
    	console.log(files);

    });
  }
}

module.exports = Task;

// module
// exports config
module.exports = {
  // mongo, obj
  mongo: {
    // db name
    name: 'dl_r18_img',
    // localhost
    host: '127.0.0.1',
    // port
    port: 27017,
    // username
    username: 'dl_r18_img',
    // password
    password: 'dl_r18_img',
    // url: mongodb://dl_r18_img:dl_r18_img@127.0.0.1:27017/dl_r18_img
    url: function() {
      return ['mongodb://',
        this.username, ':',
        this.password, '@',
        this.host, ':', this.port, '/', this.name].join('');
    }
  },
  mongoOptions: {
      server: {
          poolSize: 1,
          socketOptions: {
              auto_reconnect: true
          }
      }
  }
}

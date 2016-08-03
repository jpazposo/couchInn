var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'couchinn'
    },
    port: 3000,
    db: 'mongodb://localhost/couchinn-development-demo3-reentrega1'
  },

  test: {
    root: rootPath,
    app: {
      name: 'couchinn'
    },
    port: 3000,
    db: 'mongodb://localhost/couchinn-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'couchinn'
    },
    port: 3000,
    db: 'mongodb://localhost/couchinn-production'
  }
};

module.exports = config[env];

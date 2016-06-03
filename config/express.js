var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var passport = require('passport');
/*var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;*/
var LocalStrategy = require('passport-local').Strategy;

/*var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';*/

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('html', require('ejs').renderFile);


  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

/*  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, {  });
    console.log('JwtStrategy');
    User.findOne({id: jwt_payload.sub}, function(err, user) {
      console.log(err);
      console.log(user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log(user.comparePassword(password));
      if (!user.comparePassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }));*/

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        console.log(user.comparePassword(password));
        if (!user.comparePassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

};

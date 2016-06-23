var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');

var passport = require('passport');
/*var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;*/
var LocalStrategy = require('passport-local').Strategy;

/*var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';*/

var mongoose = require('mongoose');
var User = mongoose.model('User');


var hasPermission = function (rol, url) {
  /**
  ** @param rol ('admin' | 'user' | 'anonymous')
  ** @param url : ( /admin/(..) /user-action/(..))
  ** @return Boolean
  */
  var userPattern = new RegExp("\/user-action\/*|^\/$");
  var adminPattern = new RegExp("\/admin\/*|^\/$");
  var anonymousPattern = new RegExp("^\/login$|^\/register$|^\/$");

  var result = false;

  switch (rol) {
    case 'admim':
      result = adminPattern.test(url); // @todo review reg exp
      break;
    case 'user':
      result = userPattern.test(url); // @todo review reg exp
      break;
    case 'anonymous':
      result = anonymousPattern.test(url); // @todo review reg exp
      break;
    default:
      result = true;
  }

  return result;

};

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


  app.use(function authenticate(req, res, next) {
    console.log('pasó por authenticate');
    token = req.headers.authorization;
    try {
      var decoded = jwt.verify(token, 'shhhhh');
      req.role = decoded.role;
      console.log(decoded);
    } catch (e) {
      req.role = 'anonymous'
    } finally {
      next();
    }
  });

  app.use(function checkForPermission(req, res, next){
    console.log('pasó por checkForPermission ');
    console.log(req.role);
    console.log(req.url);

    if (req.role == "admin"){
      next();
    }
    else {
      if (hasPermission(req.role, req.url)){
        next();
      } else {
        res.sendStatus(403);
      }
    }
  });



  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

};

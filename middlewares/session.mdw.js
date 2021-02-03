const session = require('express-session');
const MyPgStore = require('express-pg-session')(session);
const { pg } = require('../config/config.json');

module.exports = function (app) {
  const sessionStore = new MyPgStore({
    conString: "postgres://shjxenspysdldz:a681d453611cc91a7274db3ea7b356e156b28da1af6cc140081668d5bbafd807@ec2-52-23-86-208.compute-1.amazonaws.com:5432/d2cetqcshjn6gn?ssl=true&sslmode=require",
    ssl: {
      rejectUnauthorized: false
    },
    tableName: "SESSIONS"
  });

  app.set('trust proxy', 1)
  app.use(session({
    store: sessionStore,
    secret: process.env.FOO_COOKIE_SECRECT || 'SECRET_KEY',
    resave: true,
    saveUninitialized: true,
    cookie: {
      //secure: true
    }
  }))
}
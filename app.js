const express= require('express');
const axios= require('axios');
const path= require('path');
const pug= require('pug');
const port= process.env.port || 3000
const mongoose= require('mongoose');
const session= require('express-session');
const expressValidator= require('express-validator');
const bodyParser= require('body-parser');
const passport= require('passport');

// const data= require('./model/data');


// let data= require('./model/data');
let manage= require('./routes/manage');
let index= require('./routes/index');
let staff= require('./routes/staff');
let drug= require('./routes/drugs');





const app= express()

// setting up database
// mongoose.connect('mongodb://localhost/kadunaHack', { useNewUrlParser: true });
//online database connection using mlab
mongoose.connect('mongodb://kad:123kaduna@ds241493.mlab.com:41493/kaduna_hack', { useNewUrlParser: true });
let db=mongoose.connection;

db.once('open', function(){
    console.log('connected')
});

db.on('error', function(err){
    console.log(err)
})


// view engine
// app.set('views', path.join(__dirname, 'view'))
// app.set('view engine', 'pug')

//moment
app.locals.moment= require('moment')

//middlewares 

// express session 
app.use(session({
  secret: 'cristos',
  resave: false,
  saveUninitialized: true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//express session
app.use(
  session({
    secret: "some secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto'
    }
  })
);
//express validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//creating universal route

// creating routes

//ROUTERS 
app.use('/', index);
app.use('/manage', manage);
app.use('/drug', drug);
app.use('/staff', staff);

app.listen(port, () =>{
 console.log('listening at '+port)
})

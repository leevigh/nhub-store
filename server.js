const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const ejs =require('ejs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
// const expressValidator = require('expressValidator')
const flash = require("connect-flash");
const {mongoDB, port,globalVariables} = require('./config/configuration');


// Assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const db = mongoose.connection



// configure mongoose to connect to mongodb
mongoose.connect(mongoDB,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
//   useMongoClient: true
 })
 .then (response => console.log (`Database connected successfully 0n:${mongoDB}`))
 .catch(err => console.log(`Database Connection Error: ${err}`))


//configure express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

// //express validator middlewire
// app.use (expressValidator({errorformater: (param, message, value)=>{
//     const namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root;

//   while(namespace.length){
//       formParam += '[' + namespace.shift() + ']';
//   }
//   return{
//       param:formParam,
//       message: message,
//       value: value
//   };
// }})); 

//passport Config
// const config =require("./config/passport")


//configure other middlewires 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());




//Setup flash and session

app.use(session({
    secret: "jfsdjkgdu$*@##mdksjhks",
    saveUninitialized: true,
    resave: false ,
    store: new MongoStore({ mongooseConnection: db }),
    cookie: {
        maxAge:3600000
    } // 1 Hour Expiration Time
}))

//passport Authentification configuration

app.use(passport.initialize());
app.use(passport.session());


//setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//setting up morgan
app.use(logger('dev'));


//Connect flash Init
app.use(flash());

//make use of globalVariables
app.use(globalVariables);


// =====importing route=====
const defaultRoutes = require('./routes/defaultRoutes');

app.use('/', defaultRoutes);

//Catch 404 and forward to Error handler
app.use((req,res,next)=>{
    let PageTitle = 'Error'
    res.render('error404', {PageTitle});
    next();
});
   

app.listen(port,()=>{
    console.log(`Talk to server on port ${port}`)
});
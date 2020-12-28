const express = require('express')
const router = express.Router()
const {index,registerGet, registerPost,storeVerify,
    loginGet,loginPost} = require('../controllers/defaultControllers');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {Store} = require('../models/store')
const bcrypt = require ('bcryptjs')
const config = require('../config/configuration') //add


// const aboutController = require('../controller/defaultControllers').about;

//home route
router.get("/", index)

//register route
router.route("/register")
.get(registerGet)
.post(registerPost)

// store verification route
router.get("/verify-store/:token", storeVerify);

//==========================================================

// Defining the local strategy
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
    await Store.findOne({email: email}).then(async(store)=>{ //in passing one parameter one can remove the paranthesis
        if(!store){
            return done(null, false, req.flash('error-message', 'No Store Register with this Account'));
        }
        if(!store.active){
            return done(null, false, req.flash('error-message', 'please verify store and try again'));
        }

        await bcrypt.compare(password, store.password, (err, passwordMatched, )=>{
            if(err){
                return err;
            }


            if(!passwordMatched){
                return done(null, false, req.flash('error-message','Invalid password'));
            }
            return done(null, store, req.flash('success-message', 'login Successfull!!!')); //add change false to store

        });
    
    });
}));

//Determines which data of the store object should be store in the session
passport.serializeUser((store, done)=>{
console.log("storeeeeeeeee", store)
    done(null, store.id)
});

// Use the data 'store.id ' from 'SerializeUser' to get entire store object
passport.deserializeUser(async(id, done)=>{
    console.log(id)
    try{
        const store = await Store.findById(id);
        done(null, store)
    }catch(error){
        done(error, null);
    }
});
//==========================================================

// login route
router.route("/login")
.get(loginGet)
.post(passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/login',
    failureFlash: true,
    successFlash: true,
    session: true,
}),(loginPost)) 


module.exports = router;
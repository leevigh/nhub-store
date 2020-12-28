// const localStrategy = require("passport-local").Strategy;
// const mongoose = require('mongoose');
// const Store = require('../models/store');
// const config = require('../config/configuration');
// const bcrypt = require('bcryptjs');

// module.exports = ((passport)=>{
//   //  local Strategy
//   passport.use(new localStrategy((email, password, done)=>{
//       // Match username
//       let query = {email:email}
//         Store.findOne(query, (err,store)=>{
//           if (err) throw err;
//           if(!store){ 
//               return done(null, false, {message: 'No user found'})
//           }
//           // Match password
     
//         bcrypt.compare(password, store.password, (err, isMatch)=>{
//               if(err) throw err;
//               if(isMatch){
//                   return done(null, store);
//               }else{
//                   return done(null, false, {message: 'Wrong Password'})
//               }
//           })
//       })
//     }))
//     passport.serializeUser((store, done)=>{
//         done(null, store.id);
//       }); 

//       passport.deserializeUser((id, done)=>{
//           Store.findById(id, (err, store)=>{
//               done(err, store);
//           })
//       })
// });

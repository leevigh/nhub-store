const mongoose = require('mongoose');

const {Schema} = mongoose;

const storeSchema = new Schema({
    storeName: String,
    address: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: String,
    active: {
        type: Boolean,
        default: false
    },
    secretToken: String

    })

module.exports = {Store:mongoose.model('store',storeSchema)}
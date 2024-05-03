const mongoose = require('mongoose')


/**
 * name
 * userid
 * password
 * email
 * userType
 */
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        //required : true, // redundent as there is a default field
        default : "CUSTOMER",
        enum : ["CUSTOMER","ADMIN"] // either customer or admin
    }
},{timestamps:true,versionKey : false}) // typo error in timestamps, it was timestamp before

module.exports = mongoose.model("User", userSchema) // create a collection -> "Users"(automatic plural) and exported this file as a module
// super terrible mistake of 'export' instead 'exports'
// I did it before as well
// it cost me few hours to figure it out
// very terrible error from my side
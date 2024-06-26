/**
 * This will be the starting file of the project
 */

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())


/**
 * Create an admin user at the starting of the application
 * if not already present
 */
// Connection with mongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log("Error while connecting to the mongodb")
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})// let so it can be redifined

        if(user){
            console.log("Admin is already present")
            return
    }
    }catch(err){
        console.log("Error while readign the data", err)
    }

    try{
        user = await user_model.create({
            name : "Rajat",
            userId : "admin",
            email : "mrajat581@gmail.com",
            userType : "ADMIN",// didn't mentioned it and admin was getting registered as customer
            password : bcrypt.hashSync("Welcome1",8)//find hash in syncronous way 
        })
        console.log("Admin created ", user)

    }catch(err){// error: didn't mention '(err)'
        console.log("Error while creating admin", err)
    }
}


/**
 * Stich the route to the server
 */

require("./routes/auth.route")(app)
require("./routes/category.route")(app)

/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{ // 8080->port no. // can be customized
    console.log("Server started at port num : ", server_config.PORT)
})
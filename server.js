const express   = require("express");
const mongoose  = require("mongoose");
const config    = require("config");
const path      = require("path")

const app = express();

// Bodyparser middleware
// body parser lets us catch data from the req.body
// express has its own body parser on a newer version
app.use(express.json({extended:true}))

// router
const expenseRouter = require("./routes/expense");
const accountRouter = require("./routes/account");
const incomeRouter  = require("./routes/income")
// =======================================================================================
// SERVE STATIC ASSETS IF IN PRODUCTION
if(process.env.NODE_ENV === "production"){
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req,res)=>{
        // res.sendFile(path.resolve(__dirname, "client", "index.html"));
        res.sendFile(path.resolve(__dirname, "client", "build","index.html"));

    })
}
// =======================================================================================
// config comes from the package config, this package searches for the default config on the directory
// DB config
const db= require("./config/keys").mongoURI
// const db = config.get("mongoURI");

// to use routes for the routes api 
app.use("/", expenseRouter)
app.use("/", accountRouter)
app.use("/", incomeRouter)

// for connecting to mongodb
mongoose
    .connect(db, {
        useNewUrlParser: true,
        // this is not running , gotta search it
        // userCreateIndexes: true
    })
    .then(()=>console.log("MongoDB connected"))
    .catch(err=> console.log(err))

const port = process.env.PORT || 5000

app.listen(port , ()=>
    console.log(`===============================`),
    console.log(`Server started on port ${port}`),
    console.log(`===============================`),
)
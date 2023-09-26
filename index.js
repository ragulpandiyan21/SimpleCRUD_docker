const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");


const app = express();

const PORT = process.env.PORT || 3000
const mongoURL = 'mongodb://ragul:mypassword@mongo:27017/node_crud'
mongoose
    .connect(mongoURL, {useNewUrlParser: true, 
        useUnifiedTopology: true})
    .then(()=> console.log("Succesfully connected to the database"))
    .catch((e)=>{
        console.log(e)});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: false,
}));

app.use((req,res, next)=>{
    res.locals.message = req.session.message; 
    delete req.session.message;
    next();
});


app.set('view engine', 'ejs');

/*app.get('/', (req,res,)=>{
    res.send("Welcome to the demo page which updates automatically");
});*/

app.use("", require("./routes/routes"))

app.listen(PORT, ()=>{
    console.log("Server listening on the port")
})
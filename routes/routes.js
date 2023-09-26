const express = require("express");
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single('image');

router.post('/add', upload, (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });
    user.save()
    .then(savedUser => {
        req.session.message = {
            type: 'Success',
            message: 'User added Successfully'
        };
        res.redirect('/');
    })
    .catch(error => {
        res.json({ message: error.message, type: 'Danger' });
    });
})

router.get("/", (req, res)=> {
    res.render('index', {title: 'Home Page'})
});

router.get("/add", (req, res)=> {
    res.render('add_user', {title: 'Add Users'})
});

module.exports = router;
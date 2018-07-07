const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const app = express();
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');


app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));
// use the routes 
const users = require('./API/routes/users');
const reservation = require('./API/routes/reservations');

// connect to he database
mongoose.connect(config.database,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('connect to the database');
    }
});

app.use('/users',users);
app.use('/reservation',reservation);
app.use(express.static(path.join(__dirname,'dist/onlinelabreservation')));

app.use(session({
    secret:'45ajdwd9ww9joi0-o-alow9www',
    saveUninitialized:false,
    resave:false
}))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'dist/onlinelabreservation/index.html'));
  }); 

app.listen(config.port,(err)=>{
    if(err){
        console.log(err);
    }   
    else{
        console.log('it\'s work');
    }
})
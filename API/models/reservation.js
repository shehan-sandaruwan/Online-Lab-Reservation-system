const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
   

    lab:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    starttime:{
        type:String,
        require:true
    },
    endtime:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }

});
module.exports = mongoose.model('Reservation',ReservationSchema);
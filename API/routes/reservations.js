const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const checkAuth = require('../middleware/check -auth');


router.post('/reserve',(req,res,next)=>{
    const reservation = new Reservation({
        lab:req.body.lab,
        date:req.body.date,
        starttime:req.body.start,
        endtime:req.body.end,
        email:req.body.email
    });
    Reservation.findOne({$and: [ { lab:req.body.lab}, { date:req.body.date} ,{starttime:req.body.start}]})
    .exec(function(err, item) {
        if (err) {
            return res.status(404).json({success: false, msg: 'Cannot Booked something wrong'});
        }       
        if (item == null) {
            reservation.save().then(result=>{
                console.log(result);
                res.status(201).json({
                    success:true,
                    message:'make reservation successfully'
                });
             })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
        }
        else{  
        res.status(401).json(err);
        }
    });
      
});

router.get('/',(req,res,next)=>{
    Reservation.find()
    .exec()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});
router.get('/search',(req,res,next)=>{
    const rowValue = req.query;
    console.log(rowValue.date);
    const updateOps= {}

    if(rowValue.lab){
        updateOps.lab = rowValue.lab;
    }

    if(rowValue.date){
        updateOps.date = rowValue.date;
    }
    if(rowValue.starttime){
        updateOps.starttime = rowValue.starttime;
    }
    if(!updateOps){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    console.log(updateOps.lab,updateOps.date,updateOps.starttime);
    Reservation.find({$and: [ { lab:updateOps.lab}, { date:updateOps.date} ,{starttime:updateOps.starttime}]})
    .exec()
    .then(result =>{    
     console.log(result);
     res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
});
router.get('/:email',(req,res,next)=>{
    const email = req.params.email;
    const newEmail = decodeURIComponent(email);
    Reservation.find({email:newEmail})
    .exec()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json({
            error:err
        });
    });
});

router.put('/:number',(req,res,next)=>{ 
    var rowValue = req.body;
    const updateOps= {}

    if(rowValue.date){
        updateOps.date = rowValue.date;
    }
    if(rowValue.starttime){
        updateOps.starttime = rowValue.starttime;
    }
    if(rowValue.endtime){
        updateOps.endtime = rowValue.endtime;
    }
    if(!updateOps){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    Reservation.update({_id:req.params.number},{$set:updateOps})
    //Reservation.findOneAndUpdate({number:number},{$set:{date: req.body.date, starttime:req.body.starttime, endtime:req.body.endtime}})
    .exec()
    .then(result =>{
     console.log(result);
     res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
});

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Reservation.findOneAndRemove({_id:id})
    .exec(function(err, item) {
        if (err) {
            return res.json({success: false, msg: 'Cannot remove item'});
        }       
        if (!item) {
            return res.status(404).json({success: false, msg: 'User not found'});
        }  
        res.json({success: true, msg: 'User deleted.'});
    });
});

module.exports = router;
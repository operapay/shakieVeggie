const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');

let Order = require('../models/order');
let Formula = require('../models/formula');
let Bottle = require('../models/bottle');

//รับค่าจาก checkout หน้า cart
router.get('/:id/:total',function(req,res){
    Order.findById(req.params.id, function(req, order){
        res.render('payment', {
            order:order._id
        });        
    });
});

router.post('/:id/:total',function(req,res){
    let order = {};
    order.totalprice = req.params.total;
    //console.log('');
    let query = {_id:req.params.id}

    Order.update(query, order, function(err){
        if(err) {
            console.log(err);
            return;
        }
        else{
            res.redirect('/payment/' + req.params.id + '/' + req.params.total);
        }
        //res.redirect('/payment/' + order);
    });   
});

router.post('/:id',function(req,res){
    //console.log('checkout');
    let order = {};
    order.name = req.body.name;
    order.address = req.body.address;
    order.address2 = req.body.address2;
    order.country = req.body.country;
    order.state = req.body.state;
    order.zip = req.body.zip;
    //order.totalprice = req.params.total;

    let query = {_id:req.params.id}

    Order.update(query, order, function(err){
        if(err) {
            console.log(err);
            return;
        }
        else{
            res.redirect('/tracking/track/'+ req.params.id);
        }
    });    
});

module.exports = router;
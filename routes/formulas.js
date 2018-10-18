const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');

let Formula = require('../models/formula');
let Nutrient = require('../models/nutrient');

router.get('/',function(req,res){
    Formula.find({},function(err,formulas){
        res.render('formula',{
            title:'formulas',
            formulas:formulas
        });
    });
});

router.get('/cart',function(req,res){
    res.render('cart');
});

router.get('/add',function(req,res){
    res.render('add_formula', {
        title:'Add Formula'
    });
});

// Add Submit POST Route
router.post('/add',function(req,res){
    let formula = new Formula();
    formula.formulaname = req.body.formulaname;
    formula.component1 = req.body.component1;
    formula.component2 = req.body.component2;
    formula.component3 = req.body.component3;

    formula.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            //req.flash('success','Formula Added');
            res.redirect('/');
        }
    });
});

router.get('/nutrient',function(req,res){
    res.render('add_nutrient', {
        title:'Add Nutrient'
    });
});

// Add Submit POST Route
router.post('/nutrient',function(req,res){
    let nutrient = new Nutrient();
    nutrient.name = req.body.name;
    nutrient.fruit1 = req.body.fruit1;
    nutrient.fruit2 = req.body.fruit2;
    nutrient.fruit3 = req.body.fruit3;
    nutrient.fruit4 = req.body.fruit4;
    nutrient.fruit5 = req.body.fruit5;
    nutrient.fruit6 = req.body.fruit6;

    nutrient.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            //req.flash('success','nutrient Added');
            res.redirect('/');
        }
    });
});

router.get('/test',function(req,res){
    res.render('formulatest');
});

module.exports = router;
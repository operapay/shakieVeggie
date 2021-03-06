let Formula = require('../models/formula');
let Nutrient = require('../models/nutrient');
let Bottle = require('../models/bottle')
let Order = require('../models/order');
let Recommend = require('../models/recommend');
const {HandingErorr} = require('./handingError')
exports.disease = async (req, res, next) => {
    try {
        const {
            kidney,
            liver,
            hypertension,
            diabetes,
            pregnant,
            surgery,
        } = req.body;

        if(kidney){
            checkkidney = 1;
            //console.log('kidney');
        }
        if(liver){
            checkliver = 1;
            //console.log('liver');
        }
        if(hypertension){
            checkhypertension = 1;
            //console.log('hypertension');
        }
        if(diabetes){
            checkdiabetes = 1;
            //console.log('diabetes');
        }
        if(pregnant){
            checkpregnant = 1;
            //console.log('pregnant');
        }
        if(surgery){
            checksurgery = 1;
            //console.log('surgery');
        }
        if(req.params.id=="5bfc9a4ba56ce810389363e4" && checkdiabetes) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else if(req.params.id=="5bf262819740b128788f18e1" && checksurgery) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else if(req.params.id=="5bf262819740b128788f18e1" && checkkidney) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else if(req.params.id=="5bf2626c59f86d3d406b8038" && checksurgery) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else if(req.params.id=="5bf2626c59f86d3d406b8038" && checkdiabetes) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else if(req.params.id=="5bf2626c59f86d3d406b8038" && checkhypertension) {
            req.flash('danger','Please choose the other formulas.');
            res.redirect('/formulas/' + req.params.order);
        } else {
            Order.findById(req.params.order,function(err,orders){
                Formula.findById(req.params.id, function(err,formula){
                    res.redirect('/recommend/'+  orders._id + "/" + formula._id + '/component');
                });
            });
        }
    }
    catch (e) {
        HandingErorr(res, e)
    }
}
exports.renderrecommend = async (req, res, next) => {
    try {
        Order.findById(req.params.order,function(err,orders){
            Formula.findById(req.params.id, function(err,formula){
                Nutrient.findById(formula.component1,function(err,nutrient1){
                    Nutrient.findById(formula.component2,function(err,nutrient2){
                        Nutrient.findById(formula.component3,function(err,nutrient3){
                            Recommend.findOne({formulaid:formula._id},function(err,recommend){
                                res.render('recommend', {
                                    orders:orders._id,
                                    formula:formula,
                                    component1:nutrient1,
                                    component2:nutrient2,
                                    component3:nutrient3,
                                    recommend:recommend
                                }); 
                            }); 
                        });
                    });
                });
            });
        });
    
        checkkidney = 0;
        checkliver = 0;
        checkhypertension = 0;
        checkdiabetes = 0;
        checkpregnant = 0;
        checksurgery = 0;
    }
    catch (e) {
        HandingErorr(res, e)
    }
}
exports.addtocart = async (req, res, next) => {
    try {
        const {
            component1,
            component2,
            component3,
            amont,
        } = req.body;

        const bottle = new Bottle();

        bottle.orderid = req.params.order;
        bottle.formulaid = req.params.id;
        bottle.fruit1 = component1;
        bottle.fruit2 = component2;
        bottle.fruit3 = component3;
        bottle.amount = amont;
        bottle.save();
        req.flash('success','Added order to cart');
        res.redirect('/formulas/' + req.params.order);
    }
    catch (e) {
        HandingErorr(res, e)
    }
}
exports.customnodisease = async (req, res, next) => {
    try {
        Order.findById(req.params.order,function(err,orders){
            Formula.findById(req.params.id, function(err,formula){
                Nutrient.findById(formula.component1,function(err,nutrient1){
                    Nutrient.findById(formula.component2,function(err,nutrient2){
                        Nutrient.findById(formula.component3,function(err,nutrient3){
                            Recommend.findOne({formulaid:formula._id},function(err,recommend){
                                res.render('recommend2', {
                                    orders:orders._id,
                                    formula:formula,
                                    component1:nutrient1,
                                    component2:nutrient2,
                                    component3:nutrient3,
                                    recommend:recommend
                                }); 
                            }); 
                        });
                    });
                });
            });
        });
    }
    catch (e) {
        HandingErorr(res, e)
    }
}
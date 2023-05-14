const express = require('express');
const paymentRoutes = express.Router();

let Payments = require('./payment.model');


paymentRoutes.route('/cusaddpayment').post(function (req,res){
    let payments = new Payments(req.body);
    payments.save()
        .then(payments => {
            res.status(200).json({'payment' : 'payments is added successfull'});
        })
        .catch(err => {
            res.status(400).send("Unable to save database")
        });
});

paymentRoutes.route('/cusgetpayment/:id').get(function (req, res){
    let email = req.params.id;
    console.log("Get Payment Details Email : " +email);
    Payments.find({$and:[{email : email}]},function (err,cus){
        if(err)
            console.log(err);
        else{
            res.json(cus)
        }
    });

});

paymentRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Payments.findById(id, function (err,payment){
        res.json(payment);
    });
});

paymentRoutes.route('/cusupdate/:id').post(function (req,res){
    let id = req.params.id;
    console.log("Edit id " +id)
    Payments.findById(id, function (err, payments){
        if(!payments)
            res.status(404).send("Data is not found??");
        else{
            payments.fname = req.body.fname;
            payments.lname = req.body.lname;
            payments.email = req.body.email;
            payments.amount = req.body.amount;
            payments.cardnumber = req.body.cardnumber;
            payments.date = req.body.date;
            payments.cvv = req.body.cvv;
            payments.status = req.body.status;
            // payments.status = "Pendding";


            payments.save().then(payments => {
                res.json('Update Complete');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

paymentRoutes.route('/cusdeletepayment/:id').get(function(req,res){
    Payments.findByIdAndRemove({_id:req.params.id}, function (err, payments){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

paymentRoutes.route('/search/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Payments.find({$and:[{$or: [{fname: search}, {lname: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});


paymentRoutes.route('/getall').get(function (req,res){
    console.log("Get All Payments");
    Payments.find(function (err,payments){
        res.json(payments);
    });
});


paymentRoutes.route('/adminapprovepayment/:id').get(function (req,res){
 
    let id = req.params.id;
    console.log("change payment id : "+id)
    Payments.findById(id, function (err, payments){
        if(!payments)
            res.status(404).send("Data is not found??");
        else{
            payments.status = "Done";

            payments.save().then(payments => {
                res.json('Update Completed');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});


module.exports = paymentRoutes;
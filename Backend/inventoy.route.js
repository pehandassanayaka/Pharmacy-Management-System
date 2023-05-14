const express = require('express');
const inventoryRoutes = express.Router();


let Inventory = require('./inventory.model');
let Oder = require('./oder.model');

inventoryRoutes.route('/add').post(function (req,res){
    let inventory = new Inventory(req.body);
    inventory.save()
        .then(inventory => {
            res.status(200).json({'inventory' : 'new inventory is added successfull'});
        })
        .catch(err => {
            res.status(400).send("Unable to save database")
        });
});



inventoryRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Inventory.findById(id, function (err,inventory){
        res.json(inventory);
    });
});

//mount Farmer details
inventoryRoutes.route('/iedit/:id').get(function (req,res){
    let id = req.params.id;
    Inventory.findById(id, function (err,Farmer){
        res.json(Farmer);
    });
});

inventoryRoutes.route('/update/:id').post(function (req,res){
    let id = req.params.id;
    Inventory.findById(id, function (err, inventory){
        if(!inventory)
            res.status(404).send("Data is not found??");
        else{
            inventory.pName = req.body.pName;
            inventory.stock = req.body.stock;
            inventory.pCode = req.body.pCode;
            inventory.cost = req.body.cost;
            inventory.vender = req.body.vender;
         


            inventory.save().then(business => {
                res.json('Update Complete');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

inventoryRoutes.route('/delete/:id').get(function(req,res){
    Inventory.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

inventoryRoutes.route('/search/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Inventory.find({$and:[{$or: [{pName: search}, {category: search},{pNo: search},{qty: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});

//get all details
// Define a route for getting all customers
inventoryRoutes.route('/getall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Inventory.find(function(err, inventory) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(inventory);
        }
    });
});

// *****************************************************************************************



inventoryRoutes.route('/oadd').post(function (req,res){
    let oder = new Oder(req.body);
    oder.save()
        .then(oder => {
            res.status(200).json({'oder' : 'new oder is added successfull'});
        })
        .catch(err => {
            res.status(400).send("Unable to save database")
        });
});



inventoryRoutes.route('/oedit/:id').get(function (req,res){
    let id = req.params.id;
    Oder.findById(id, function (err,inventory){
        res.json(inventory);
    });
});

inventoryRoutes.route('/oupdate/:id').post(function (req,res){
    let id = req.params.id;
    Oder.findById(id, function (err, oder){
        if(!oder)
            res.status(404).send("Data is not found??");
        else{
            oder.pName = req.body.pName;
            oder.category = req.body.category;
            oder.pieces = req.body.pieces;
            oder.total = req.body.total;
            oder.status = req.body.status;
   
            oder.save().then(business => {
                res.json('Update Complete');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

inventoryRoutes.route('/odelete/:id').get(function(req,res){
    Oder.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

inventoryRoutes.route('/search/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Oder.find({$and:[{$or: [{pName: search}, {category: search},{pNo: search},{qty: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});

//get all details
// Define a route for getting all customers
inventoryRoutes.route('/ogetall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Oder.find(function(err, inventory) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(inventory);
        }
    });
});


inventoryRoutes.route('/stock/:id').get(function (req,res){
 
    let id = req.params.id;
    console.log("change payment id : "+id)
    Oder.findById(id, function (err, oder){
        if(!oder)
            res.status(404).send("Data is not found??");
        else{
            oder.status = "Done";

            oder.save().then(taskallocate => {
                res.json('Update Completed');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});



// *********************************************************************************************


module.exports = inventoryRoutes;
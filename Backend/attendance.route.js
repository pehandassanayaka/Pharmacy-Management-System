const express = require('express');
const attendanceRoutes = express.Router();


let Attendance = require('./markatendance');
let Taskallocate = require('./taskallocate');

attendanceRoutes.route('/add').post(function (req,res){
    let attendance = new Attendance(req.body);
    attendance.save()
        .then(attendance => {
            res.status(200).json({'attendance' : 'new attendance is added successfull'});
        })
        .catch(err => {
            res.status(400).send("Unable to save database")
        });
});



attendanceRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Attendance.findById(id, function (err,attendance){
        res.json(attendance);
    });
});

attendanceRoutes.route('/update/:id').post(function (req,res){
    let id = req.params.id;
    Attendance.findById(id, function (err, attendance){
        if(!attendance)
            res.status(404).send("Data is not found??");
        else{
            attendance.staffid = req.body.staffid;
            attendance.name = req.body.name;
            attendance.day = req.body.day;
            attendance.email = req.body.email;
            attendance.status = req.body.status;
          
            attendance.save().then(business => {
                res.json('Update Complete');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

attendanceRoutes.route('/delete/:id').get(function(req,res){
    Attendance.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

//search
attendanceRoutes.route('/search/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Attendance.find({$and:[{$or: [{staffid: search}, {name: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});


//today
attendanceRoutes.route('/today/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Attendance.find({$and:[{$or: [{day: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});



//get all details
// Define a route for getting all customers
attendanceRoutes.route('/getall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Attendance.find(function(err, attendance) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(attendance);
        }
    });
});


attendanceRoutes.route('/attendance/:id').get(function (req,res){
 
    let id = req.params.id;
    console.log("change payment id : "+id)
    Attendance.findById(id, function (err, attendance){
        if(!attendance)
            res.status(404).send("Data is not found??");
        else{
            attendance.status = "Done";

            attendance.save().then(attendance => {
                res.json('Update Completed');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});


// *************************************************************************************



attendanceRoutes.route('/tadd').post(function (req,res){
    let taskallocate = new Taskallocate(req.body);
    taskallocate.save()
        .then(taskallocate => {
            res.status(200).json({'taskallocate' : 'new taskallocate is added successfull'});
        })
        .catch(err => {
            res.status(400).send("Unable to save database")
        });
});



attendanceRoutes.route('/tedit/:id').get(function (req,res){
    let id = req.params.id;
    Taskallocate.findById(id, function (err,attendance){
        res.json(attendance);
    });
});

attendanceRoutes.route('/tupdate/:id').post(function (req,res){
    let id = req.params.id;
    Taskallocate.findById(id, function (err, taskallocate){
        if(!taskallocate)
            res.status(404).send("Data is not found??");
        else{
            taskallocate.taskNo = req.body.taskNo;
            taskallocate.staffid = req.body.staffid;
            taskallocate.description = req.body.description;
            taskallocate.email = req.body.email;
            taskallocate.status = req.body.status;
          
            taskallocate.save().then(business => {
                res.json('Update Complete');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

attendanceRoutes.route('/tdelete/:id').get(function(req,res){
    Taskallocate.findByIdAndRemove({_id:req.params.id}, function (err, customers){
        if(err)res.json(err);

        else res.json('Successfully Removed');
    });
});

//search
attendanceRoutes.route('/tsearch/:pathParam1?').get(function (req, res){
    let search = req.params.pathParam1;
    // let email = req.params.pathParam2;
    console.log("your search is "+search);

    // Orders.find({$and:[{date : search},{email : email}]},function (err,srch){
        Taskallocate.find({$and:[{$or: [{staffid: search}, {name: search},{day: search},{qty: search}]}]},function (err,srch){ 
        if(err)
            console.log(err);
        else{
            res.json(srch)
        }
    });

});


//get all details
// Define a route for getting all customers
attendanceRoutes.route('/tgetall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Taskallocate.find(function(err, attendance) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(attendance);
        }
    });
});


attendanceRoutes.route('/taskstatus/:id').get(function (req,res){
 
    let id = req.params.id;
    console.log("change payment id : "+id)
    Taskallocate.findById(id, function (err, taskallocate){
        if(!taskallocate)
            res.status(404).send("Data is not found??");
        else{
            taskallocate.status = "Done";

            taskallocate.save().then(taskallocate => {
                res.json('Update Completed');
            })
                .catch(err =>{
                    res.status(400).send("Unable to update data");
                });
        }
    });
});


// ***************************************************************************************

module.exports = attendanceRoutes;
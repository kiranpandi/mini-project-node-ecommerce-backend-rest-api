const express = require('express');
const router = express.Router();

var User = require('../model/User');

router.route('/user').get( (req,res) => {
    User.find( (err,data) => {
        if(err) res.status(400).send('Failed to get from the database',err);
        else{
            res.send(data);
        }
    })
});

router.route('/user/create').post( (req,res) => {
    let user = new User(req.body);
    user.save()
    .then(data => {
        res.send(data);
    })
    .catch(err=> res.status(400).send('Failed to store in database'))
});

router.route('/user/:id').put( (req,res) => {
    let user = req.body;
    User.updateOne({"_id":req.params.id},user,(err,data)=> {
        if(!err) res.send('Updated')
        else{
            res.status(500).send({message:"Error in updating"});
        }
    })
})

router.route('/user/:id').delete( (req,res) => {
    User.deleteOne({"_id":req.params.id},(err,data)=> {
        if(!err) res.send('Deleted')
        else{
            res.status(500).send({message:"Error in Deleting"});
        }
    })
})

module.exports = router;
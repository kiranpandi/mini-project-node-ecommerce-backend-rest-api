const express = require('express');
const router = express.Router();

var Product = require('../model/Product');

router.route('/product').get( (req,res) => {
    Product.find( (err,data) => {
        if(err) res.status(400).send('Failed to get from the database',err);
        else{
            res.send(data);
        }
    })
});

router.route('/product/create').post( (req,res) => {
    let product = new Product(req.body);
    product.save()
    .then(data => {
        res.send(data);
    })
    .catch(err=> res.status(400).send('Failed to store in database'))
});

router.route('/product/:id').put( (req,res) => {
    let product = req.body;
    Product.updateOne({"_id":req.params.id},product,(err,data)=> {
        if(!err) res.send('Updated')
        else{
            res.status(500).send({message:"Error in updating"});
        }
    })
})

router.route('/product/:id').delete( (req,res) => {
    Product.deleteOne({"_id":req.params.id},(err,data)=> {
        if(!err) res.send('Deleted')
        else{
            res.status(500).send({message:"Error in Deleting"});
        }
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();

var Order = require('../model/Order');
var Product = require('../model/Product');

router.route('/order').get( (req,res) => {
    Order.find( (err,data) => {
        if(!err) res.send(data);
        else{
            res.status(400).send({message:'Cannot GET Orders'});
        }
    })
});

router.route('/order').post( (req,res) => {
    let order = new Order(req.body);
    order.save()
    .then(data => res.send(data))
    .catch(err=> res.status(400).send('Failed to store in database'));
})

router.route('/order/map/:id/:quantity').post( (req,res) => {
    let product;
    Product.findOne({"_id":req.params.id},(err,data)=> {
        if(!err) product = data;
        else{
            res.status(400).send({message:'Cannot find product while mapping'});
        }
    });

    Order.findOne({quantity:req.params.quantity},(err,data)=> {
        let order = new Order(data);
        order.product = product;
        order.save()
        .then(data => res.send(data))
        .catch(err=> res.status(400).send('Failed to store in database'))
    })
})

router.route('/order/map/:id').put( (req,res) => {

        let order = {
            quantity:req.body.quantity
        };

        Order.updateOne({"_id":req.params.id},order,(err,data)=> {
            if(!err) res.send('Updated')
            else{
                res.status(500).send({message:"Error in updating"});
            }
        })
})

router.route('/order/remove/:id').delete( (req,res) => {

    Order.deleteOne({"_id":req.params.id},(err,data) => {
        if(!err) res.send('Deleted')
            else{
                res.status(500).send({message:"Error in Deleting"});
            }
    })

})

module.exports = router;
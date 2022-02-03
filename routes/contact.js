const express = require('express');

const router = express.Router();

const Contact = require('../models/Contact');

const controllers = require("../controllers/contactControllers")


//test routing
router.get('/hello',(req,res)=>{
    res.send('hello routing')
})

//post Contact
router.post("/",controllers.postContact)

//get method
//get one contact
//path :http//localhost:5000/api/contact/:id

router.get('/:id',async(req,res)=>{
    try{
        const result = await Contact.findOne({_id:req.params.id});
        res.status(200).send({response:result , message:"geting contacts sucessfully"})
    }catch (error) {
        res.status(500).send({message:"can not get contact with this id", error})
    }
});

//Delete method
//get one contact and Delete
//path :http//localhost:5000/api/contact/:id

router.delete('/:id',async (req,res)=>{
    try{
        const result = await Contact.deleteOne({_id:req.params.id})
        result
        ? res.send({response:"user deleted"})
        : res.send("there is no user with this id")
    }catch (error) {

    }
})

//put method
//get one contact and update
//path :http//localhost:5000/api/contact/:id

router.put('/:id',async(req,res)=>{
    try{
        const user = await Contact.findOone({email:req.body.email});
        if(user){
            res.status(400).send({message:"user already exist email should be unique"})
            return
        }
        const result = await Contact.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}}
        )
        result.nModified
        ? res.send({message:"user not updated"})
        : res.send({message:"user updated"})
    }catch (error) {
        res.status(500).send({message:`there is ${error}`})
    }
})

module.exports = router
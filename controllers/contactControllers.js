const Contact = require('../models/Contact');

exports.postContact = async (req,res)=>{
    try{
        //create a new contact with model contact
        const newContatct = new Contact(req.body);
        //test email
        if(!req.body.email){
            res.status(400).send({message:"email is required check again"});
            return
        }
        //test2 if email already exist
        const user = await Contact.findOone({email:req.body.email});
        if(user){
            res.status(400).send({message:"user already exist email should be unique"})
            return
        }
        //save Contact
        const response = await newContatct.save();
        res.send({response:response , msg:'user is saved'}).status(200)

    }catch (err) {
         console.log(error)
         res.status(500).send({message:"can not save it"})
    }
}
//import router
const router = require("express").Router();

//import employees model
let seller =require("../models/seller");


router.route("/add").post(async(req,res)=>{

    

    
    const sellerID = req.body;
    const name = req.body.name;
    const birthday=Date(req.body.birthday);
    const gender=req.body.gender;
    const address=req.body.address;
    const phonenumber=Number(req.body.phonenumber);
    const email=req.body.email;
   
   

    const newseller= new seller({ 
        sellerID,
        name,
        birthday,
        gender,
        address,
        phonenumber,
        email,
      


    })

    const totalNumberOfEmpInDb = await seller.countDocuments()
// convert number to string, so we can concatenate 0s easily...
    let numberToString = totalNumberOfEmpInDb.toString()

    // If length of number string is less than 5 then add leading 0s in nuberToString
    if(numberToString.length < 5){
        for (let i = numberToString.length; i < 5; i++){
            numberToString = '0' + numberToString
        }
    }
    newseller.sellerID = `SELL${numberToString}`

    newseller.save().then(()=>{
      res.json("seller added")
    }).catch((err)=>{
        console.log(err);
    }) 

})

router.route("/view").get((req,res)=>{

    seller.find().then((sellers)=>{
        res.json(sellers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let sellerid = req.body.id;
    const {address} = req.body;
    const {phonenumber} = req.body;
   
   

    const Update = {
        address,
        phonenumber,

   
    }

    const update = await seller.findByIdAndUpdate(sellerid, Update).then(()=>{
        res.status(200).send({status: "seller updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating seller", error: err.message});
    })
})


router.route("/delete/:id").delete(async(req,res)=>{
    var sellerid = req.params.id;

    await seller.findByIdAndRemove(sellerid).exec().then(()=>{
        res.status(200).send({status: "seller deleted"})
        
    }).catch((err)=>{
        res.status(500).send({status: "Error with deleting seller", error: err.message});
    })
})

module.exports = router;


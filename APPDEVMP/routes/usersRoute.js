const express = require('express');
const router = express.Router();
const User = require("../models/user");
const userModel = require('../models/user');


router.get("/", async (req,res)=>{
    try {
        const users = await userModel.find({}).select("-password")
        res.status(200).json(users) 
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/:id", async (req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.params.id}).select("-password")
        res.status(200).json(user) 
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put(("/:id"),async (req,res)=>{
   try {
    const user = await userModel.findOne({_id:req.params.id})
    if(!user){
      return res.status(404).json("User Not Found!")
    }
    user.name = req.body.name || user.name,
    user.email = req.body.email || user.email,
    user.password = req.body.password || user.password,
    user.isAdmin = req.body.isAdmin || user.isAdmin
    user.save()
    return res.status(200).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin: user.isAdmin
    })
   } catch (error) {
   return res.status(500).json(error)
   }
})


router.delete("/:id",async (req,res)=>{
  try {
    await userModel.deleteOne({_id:req.params.id})
    return res.status(200).json("User Deleted SuccessFully!")
  } catch (error) {
    return res.status(500).json(error)
  }
})



router.post("/register", async (req, res) => {

    const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password });

    try {
        const user = await newuser.save()
        res.send("User Registered Successfully!")
    } catch (error) {
        return res.status(400).json({ error })
    }

})



router.post("/login", async (req, res) => {

    const { email, password } = req.body



    try {
        const user = await User.findOne({ email: email, password: password })

        if (user) {
            const temp = {
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }
            res.send(temp);
        }
        else {
            return res.status(400).json({ message: "Login Failed!" })
        }
    } catch (error) {
        return res.status(400).json({error})

    }

});


module.exports = router;


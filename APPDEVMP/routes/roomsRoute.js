const express  = require('express');
const Room = require('../models/room');
const roomModel = require('../models/room');
const router = express.Router();




router.get("/getallrooms",  async (req,res)=>{
try {
    const rooms  = await Room.find({}) 
    res.send(rooms);
} catch (error) {
    return res.status(400).json({message:error})
}

})

router.get("/:id",async (req,res)=>{
  try {
    const room = await roomModel.findOne({_id:req.params.id})
    return res.status(200).json(room)
  } catch (error) {
    return res.status(500).json(error)
  }
})



router.delete("/:id",async (req,res)=>{
  try {
     await roomModel.deleteOne({_id:req.params.id})
     return res.status(200).json("Deleted Successfully!")
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put("/:id",async (req,res)=>{
  try {
     const room = await roomModel.findOne({_id:req.params.id})
     if(!room){
        return res.status(404).json("Room Not Found!")
     }
     room.name = req.body.name || room.name
     room.description= req.body.description || room.description
     room.type = req.body.type || room.type
     room.rentperday = req.body.rentperday || room.rentperday
     room.phonenumber = req.body.phonenumber || room.phonenumber
     room.maxcount = req.body.maxcount || room.maxcount
     room.save()
     return res.status(200).json("Room Updated Succesfully!")
  } catch (error) {
    return res.status(500).json(error)
  }
})


router.post("/create",async (req,res)=>{
    try {
         const room = new roomModel({
            name:"Default Room Name",
            description:"Default Description",
            type:"Default Type",
            rentperday: 1000,
            phonenumber: 920000000000,
            currentbookings:[],
            maxcount:3,
            imageurls:[]
         })
         room.save()
         return res.status(200).json("Room Created Successfully!")
    } catch (error) {
        return res.status(500).json(error)
    }
})





router.post("/getroombyid",  async (req,res)=>{


    const roomid = req.body.roomid


    try {
        const room  = await Room.findOne({_id:roomid})
        res.send(room);
    } catch (error) {
        return res.status(400).json({message:error})
    }
    
    })



module.exports = router;

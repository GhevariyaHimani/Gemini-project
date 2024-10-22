const asynchandler = require("express-async-handler");
const chat = require("../models/chatmodel");


const getallchat = asynchandler(async (req, res) => {
    // const chats = await chat.find({user_id : req.user.id});
    const chats = await chat.find();
    res.status(200).json(chats)
});

const getchat = asynchandler(async (req, res) => {
    const chats = await chat.findById(req.params.id);
    if(!chats) {
        res.status(404);
        throw new Error("chat not found");
    } else {
        res.status(200).json(chats)
    }
})

module.exports= {getallchat, getchat}
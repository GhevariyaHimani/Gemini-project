const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {GoogleGenerativeAI} = require("@google/generative-ai");
const dotenv = require("dotenv").config();
const genAi = new GoogleGenerativeAI(process.env.API_KEY);
const express = require("express")
const app = express();
const { Error } = require("mongoose");
const model = genAi.getGenerativeModel({model : "gemini-pro"});

const users = require("../models/usermodel");
const chatmodel = require("../models/chatmodel")

app.use(express.json());


const registerUser = asynchandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!email || !password || !username) {
        res.status(400);
        throw new Error ("ALl fields are mendatory ! ")
    }

    const useravilabe = await users.findOne({email});
    if(useravilabe) {
        throw new Error ("user already exits ! ");
    }

    const hashpassword = await bcrypt.hash(password, 10);

    // console.log(hashpassword)
    const user = await users.create({
        username,
        email,
        password : hashpassword,
    });

    if(user) {
        res.status(201).json({_id : user.id, email : user.email});
    } else {
        res.status(400);
        throw new Error("user data is not valid")
    }
})

const loginUser = asynchandler(async (req, res) => {
    const {email, password} = req.body;
    // console.log(email)
    if(!email || !password) {
        res.status(400);
        throw new Error ("all fields are mendatory ! ");
    }

    const user = await users.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1h"}
    )

    res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error ("email and password are not valid ");
    }
})


const chatAPI = asynchandler(async (req, res) => {
    const generate = async (prompt) => {
        try{
            const que = await model.generateContent(prompt);
            // console.log(que.response.text());
            return que.response.text();
        } catch(err) {
            console.log(err);
            // throw new Error("Error generating content");
        }
    }

    try{
        const data = req.body.topicName; 
        // console.log(data)    // print question
        const result = await generate(data);

        if(req.user) {
            // console.log(req.user);
            const chat = await chatmodel.create({
                topicName : data,
                // response : result,
                // user_id : req.user.id,
                // _id : req.topic.id
            })

            res.status(200).json({
                // result: result,
                message: "Chat saved",
                topicName: chat.topicName,
            });

            // res.status(200).json(chat);
        } else {
            res.status(401)
            throw new Error("Login required to save chat" );
        }
        // res.send({
        //     "result" : result
        // })

        }catch(err) {
            throw new Error("An error occurred");
        }
})

const chatwithoutlogin = asynchandler(async (req, res) => {
    const generate = async (prompt) => {
    
        try{
            const que = await model.generateContent(prompt);
            console.log(que.response.text());
            return que.response.text();
        } catch(err) {
            console.log(err);
        }
    } 
    try{
        const data = req.body.topicName;
        const result = await generate(data);
        res.send({
            "response" : result
        })
        }catch(err) {
            console.log(err)
        }
})

module.exports = {registerUser, loginUser, chatAPI, chatwithoutlogin};

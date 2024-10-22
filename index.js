const {GoogleGenerativeAI} = require("@google/generative-ai");
const dotenv = require("dotenv").config();
const genAi = new GoogleGenerativeAI(process.env.API_KEY);

async function getResponse(){
    const model = genAi.getGenerativeModel({model : "gemini-pro"});
    const prompt = `what is database`;
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch(err) {
        console.log(err);
    }
}

// getResponse()

// const {GoogleGenerativeAI} = require("@google/generative-ai");
// const dotenv = require("dotenv").config();
// const genAi = new GoogleGenerativeAI(process.env.API_KEY);
// const express = require("express")
// const app = express();
// const bodyparser = require("body-parser")
// const model = genAi.getGenerativeModel({model : "gemini-pro"});
// const asynchandler= require("express-async-handler")
// app.use(express.json());
// app.use(bodyparser.json()) 


// const chatAPI = asynchandler(async (req, res) => {
//     const generate = async (prompt) => {
    
//     try{
//         const result = await model.generateContent(prompt);
//         console.log(result.response.text());
//         return result.response.text();
//     } catch(err) {
//         console.log(err);
//     }
// } 
//     try{
//         const data = req.body.question;
//         const result = await generate(data);
//         res.send({
//             "result" : result
//         })
//         }catch(err) {
//             console.log(err)
//         }
// })
// module.exports = chatAPI;


// // app.get("/", (req, res) => {
// //     res.send("hello")
// // })

// // app.get("/api/content", async (req, res) => {
// //     try{
// //         const data = req.body.question;
// //         const result = await generate(data);
// //         res.send({
// //             "result" : result
// //         })
// //     }catch(err) {
// //         console.log(err)
// //     }
// // })
const mongoose = require("mongoose");

// const validateEmail = function (email) {
//     let re = /\b[a-z]+[0-9]+@\b(yahoo|gmail)\.com$/;
//     return re.test(email);
// };


const userschema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "please add the user name"],
    },
    email : {
        type : String,
        required : [true, "please enter email"],
        // lowercase : true,
        unique : [true, "Email already Exits"],
        validate : {
            validator : function (value) {
                return /\b[a-z]+[0-9]+@\b(yahoo|gmail)\.com$/.test(value);
            }
        }, 
        // validate : [validateEmail, "enter valid email"],
    },
    password : {
        type : String,
        required : [true, "please add password"],
        validate : {
            validator : function (value) {
                return /^[a-zA-z0-9]+[!@$#]/.test(value);
            }
        },
    }
})

module.exports = mongoose.model("users", userschema);
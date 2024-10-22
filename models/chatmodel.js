const mongoose = require("mongoose");

const chatschema = mongoose.Schema({
    // user_id : {
    //     type : mongoose.Schema.ObjectId,
    //     required : true,
    //     ref : "users",
    // },
    topicName : {
        type : String,
        required : true,
    },
    // response : {
    //     type : String,
    //     required : true,
    // }
},{
        timestamps: true,
});

module.exports = mongoose.model("chat " ,chatschema);

const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const messageSchema = new Schema(
{
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    isUser: {
        type: Boolean,
        required: true
    },
    response: {
        type: String,
    }
},
{
    timestamps: true
}
);

const Message = model("messages", messageSchema);

module.exports = Message;
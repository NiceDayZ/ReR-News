const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const userSchema = new Schema(
{
    name: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    confirmationStatus: {
        type: Boolean,
        default: false
    },
    preferences:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "preferences"
    }
},
{
    timestamps: true
}
);

const User = model("users", userSchema);

module.exports = User;
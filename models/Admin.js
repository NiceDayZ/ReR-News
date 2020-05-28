const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
{

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
    }
},
{
    timestamps: true
}
);

const Admin = model("admins", AdminSchema);

module.exports = Admin;
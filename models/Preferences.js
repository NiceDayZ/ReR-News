const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const prefSchema = new Schema(
{
    customRSS: {
        required: true,
        type: String
    },
    newsPref: {
        required: true,
        type: Array
    },
    imagesPref: {
        required: true,
        type: Array
    },
    videosPref: {
        required: true,
        type: Array
    },
    booksPref: {
        type: Array,
        default: false
    }
},
{
    timestamps: true
}
);

const Preference = model("preferences", prefSchema);

module.exports = Preference;
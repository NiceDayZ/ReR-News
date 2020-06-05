const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const prefSchema = new Schema(
{
    customRSS: {
        type: Array,
        default: []
    },
    newsPref: {
        type: Array,
        default: []
    },
    imagesPref: {
        type: Array,
        default: []
    },
    videosPref: {
        type: Array,
        default: []
    },
    booksPref: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
}
);

const Preference = model("preferences", prefSchema);

module.exports = Preference;
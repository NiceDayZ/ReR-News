const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CacheSchema = new Schema(
{

    request: {
        required: true,
        type: String
    },
    response: {
        required: true,
        type: String
    },
    contentType:{
        required: true,
        type: String
    },
    userId: {
        type: String
    }
},
{
    timestamps: true
}
);

const Cache = model("cache", CacheSchema);

module.exports = Cache;
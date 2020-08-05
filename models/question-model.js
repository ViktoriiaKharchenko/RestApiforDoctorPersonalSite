const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Question = new Schema(
    {
        title: { type: String,required: true},
        text: { type: String, required: true },
        age :{
            type: Number
            },
        name :{
            type : String
        },
        answer:{
            type: String
        }


    },
    { timestamps: true },
)

module.exports = mongoose.model('questions', Question)

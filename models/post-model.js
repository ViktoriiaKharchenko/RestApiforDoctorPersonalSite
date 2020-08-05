const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Post = new Schema(
    {
        title: { type: String,required: true},
        text: { type: String, required: true },
        disease: { type: String, required: true },
        classification: { type: String, required: true },
        practice: { type: String, required: true },
        important: { type: String, required: true },
        recommendation: { type: String, required: true },
        public: { type : Boolean,required: true},


    },
    { timestamps: true },
)

module.exports = mongoose.model('posts', Post)
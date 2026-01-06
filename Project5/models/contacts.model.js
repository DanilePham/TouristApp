const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        email:String,
        deleted:{
            type:Boolean,
            default:false
        },
        deletedBy: String,
        deletedAt: Date
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
)

module.exports = mongoose.model('Contact', schema,"contacts");
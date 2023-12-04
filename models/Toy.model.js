const mongoose = require("mongoose");


const toySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    catName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl:{
        type: String,
        required: false
    },
    date_created: {
        type: Date,
        required: false,
        default: Date.now()
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    }
});

const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy = Toy;
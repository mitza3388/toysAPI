const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    role:{
        type:String,
        default: "user",
        enum:["admin","user"],
        required:true
    }
});

// Do thing to the schema before saving
userSchema.pre("save", function (next) {
    // console.log(this);
    this.id = String(this._id);
    next();
});

const User = model("User", userSchema);
module.exports.User = User;
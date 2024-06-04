const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Name is required"]
    },
    number: {
        type: Number,
        required: [true, "Number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    is_Admin: {
        type: Boolean,
        default: false,
    }

}, {
      timestamps: true
},
);

const User = mongoose.model("User", userSchema);
module.exports = User;

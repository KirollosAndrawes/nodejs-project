const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    country: String,
    gender: String,
},{timestamps: true})

// create model based on the schema
const User = mongoose.model("customer", userSchema);

module.exports = User;

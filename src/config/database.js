const mongoose = require('mongoose');

const connectDB = async ()=>{
 await mongoose.connect('mongodb+srv://priDev:wBnTjdTTeWXWgEfa@devtinder.929pjqt.mongodb.net/?appName=DevTinder')
};


module.exports = connectDB;
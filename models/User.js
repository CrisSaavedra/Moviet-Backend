const { Schema, model } = require('mongoose');



const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    idMovies: {
        type : [String],
        require: false,
       
    }
});



module.exports = model('User', UserSchema );

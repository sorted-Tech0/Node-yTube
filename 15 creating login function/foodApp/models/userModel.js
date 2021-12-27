const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

let db_link = "mongodb+srv://admin:q3wOqY2GzP5XWfhB@cluster0.iyb25.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log('database connected');
})
.catch( function(err){
    console.log(err);
});


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function() {
            return this.confirmPassword == this.password;
        }
    }

});


userSchema.pre('save', function() {
    this.confirmPassword = undefined;
});

// pre hooks for hashig the password

// userSchema.pre('save', async function() {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     // console.log(hashedString);
//     // setting the password as hashed string
//     this.password = hashedString;
// });

const userModel = mongoose.model('usermodel', userSchema);

module.exports = userModel;
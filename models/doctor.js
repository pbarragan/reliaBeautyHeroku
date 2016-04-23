// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var doctorSchema = mongoose.Schema({

    name: String,
    numandstreet: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    url: String,
    education: String,
    hospaff: String,
    specialties: String,
    procedures: [String],
    prices: [Number],
    percents: [Number],
    stars: Number,
    imgurl: String
});

/*
// methods ======================
// generating a hash
doctorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
doctorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/

// create the model for users and expose it to our app
module.exports = mongoose.model('Doctor', doctorSchema);


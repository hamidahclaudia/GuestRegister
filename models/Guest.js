const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required : true
    },
    idCardNo: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
});

const Guest = mongoose.model('Guest', GuestSchema);
module.exports = Guest; 
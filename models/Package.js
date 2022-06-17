const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    startingPrice: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isMostPopular: {
        type: Boolean,
        required: false,
        default: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    cityName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Package', schema);
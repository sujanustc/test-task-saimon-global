const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
            ref: 'Package'
    },
    singlePerPax: {
        type: Number,
        required: true
    },
    doublePerPax: {
        type: Number,
        required: true
    },
    twinPerPax: {
        type: Number,
        required: true
    },
    triplePerPax: {
        type: Number,
        required: true
    },
    child7To12: {
        type: Number,
        required: true
    },
    child3To6: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Plan', schema);
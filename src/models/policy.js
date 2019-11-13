const mongoose = require('mongoose')
const validator = require('validator')

const Policy = mongoose.model('Policy', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    cover_amount: {
        type: Number,
        required: true,
        trim: true
    },
    base_amount_for_person: {
        type: Number,
        required: true,
        trim: true
    },
    disabled_person: {
        type: String,
        trim: true
    },
    medical_history: {
        type: String,
        trim: true
    }
})

module.exports = Policy


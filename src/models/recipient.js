const mongoose = require('mongoose')
const validator = require('validator')

const Recipient = mongoose.model('Recipient', {
    recipient_name: {
        type: String,
        required: true,
        trim: true
    },
    recipient_age: {
        type: Number,
        default: 0,
    },
    recipient_adhar_no: {
        type: Number,
        default: 0,
    },
    recipient_contact: {
        type: Number,
        default: 0,
    },
    recipient_disabled: {
        type: String,
        trim: true
    },
    recipient_medical_history: {
        type: String,
        trim: true
    },
    user_id: {
        type: String,
        trim: true
    },
    policy_id: {
        type: String,
        trim: true
    }
})

module.exports = Recipient
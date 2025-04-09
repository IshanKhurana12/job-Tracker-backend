const { application } = require('express');
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    link: {
        type: String,
        trim: true,
        default: '',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});



const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
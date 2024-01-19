const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema( {
    taskTitle: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Tasks', TaskSchema);
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    status: {
        type: String, // Updated from Boolean to String
        enum: ['Not Started', 'In Progress', 'Completed'], // Optional: to restrict to specific statuses
        default: 'Not Started'
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

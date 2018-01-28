import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Entry = new Schema({
    outside: Number,
    inside: Number
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Entry', Entry);
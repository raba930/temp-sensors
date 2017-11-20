import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Entry = new Schema({
    outside: Number,
    inside: Number
});

module.exports = mongoose.model('Entry', Entry);
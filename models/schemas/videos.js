const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let VideoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    owner: {type: String, required: true},
    description: {type: String, required: false},
    views: {type: Number, default: 0},
    like: {type: Number, default: 0},
    unlike: {type: Number, default: 0},
    playlist: {type: String, required: false},
    processed: {type: Boolean, default: false},
    created: {type: Date, default: new Date()}
});

module.exports = mongoose.model('video', VideoSchema);
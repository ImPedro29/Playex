const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let PlaylistSchema = new mongoose.Schema({
    title: {type: String, required: true},
    owner: {type: String, required: true},
    videos: {type: Array, required: true},
    created: {type: Date, default: new Date()}
});

module.exports = mongoose.model('playlist', PlaylistSchema);
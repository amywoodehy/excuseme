var mongoose = require('mongoose');


var excuseSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        type: String,
        default: "Anonymous"
    },
    date: {
        type: Date,
        default: Date.now
    },
    votesYes: {
        type: Number,
        default: 0
    },
    votesNo: {
        type: Number,
        default: 0
    }
});


var Excuse = mongoose.model('Excuse', excuseSchema);

module.exports = Excuse;
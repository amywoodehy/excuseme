var mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2/excuseme');

var excuseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
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
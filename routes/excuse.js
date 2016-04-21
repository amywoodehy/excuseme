var express = require("express");
var route = express.Router();

var Excuse = require('../models/excuse');


var handleError = function(err, res) {
    function handleNotFoundError(err, res) {
        res.send({
            name: "not found",
            message: "check the value " + err.value + " to be right"
        });
    }
    if(err.name == "CastError") return handleNotFoundError(err, res);
    console.log(err);
    res.send(err);
};


route.get('/', function(req, res){
    res.render('excuse', {title: "Excuse application?"});
});


route.get('/list', function(req, res){
    Excuse.find(function(err, excuses){
        res.send(excuses);
    });
});


route.post('/add', function(req, res){
    if(req.is('json')){
        var options = {
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        };
        Excuse.create(options, function(err, inputed) {
            if(err) return handleError(err, res);
            res.send(inputed);
        });
    }
});


route.get('/author/:name', function(req, res){
    Excuse.find({author: {$regex: new RegExp(req.params.name, "i")}}, function(err, exc){
        if(err) return handleError(err, res);
        res.send(exc);
    });
});


route.get('/:excuseId', function(req, res){
    Excuse.findById(req.params.excuseId, function(err, exc){
        if(err) return handleError(err, res);
        res.send(exc);
    });
});


route.post('/:excuseId/yes', function(req, res){
    Excuse.update({_id: req.params.excuseId}, {$inc: {votesYes: 1}}, function(err, exc){
        if(err) return handleError(err, res);
        res.send(exc);
    });
});


route.post('/:excuseId/no', function(req, res){
    Excuse.update({_id: req.params.excuseId}, {$inc: {votesNo: 1}}, function(err, exc){
        if(err) return handleError(err, res);
        res.send(exc);
    });
});


module.exports = route;
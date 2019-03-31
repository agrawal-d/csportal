var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schemas = require('../schemas/all.js')
router.get("/questions", function (req, res, next) {
    res.render("questions", { questions: req.body.questions })
})

router.get("/answers/:id", function (req, res, next) {
    var Answer = mongoose.model('Answer', schemas.answers);
    var query = Answer.find({ question: req.params.id });
    var result = query.exec(function (err, answers) {
        if (err) return console.error(err)
        res.render("answers",{answers:answers})
        // console.log(answers)
    })
})

module.exports = router;
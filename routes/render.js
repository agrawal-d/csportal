var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schemas = require('../schemas/all.js')
router.get("/questions", function (req, res, next) {
    res.render("questions", { questions: req.body.questions })
})

router.get("/answers/:id", function (req, res, next) {
    console.log(req.params.id)
    var Answer = mongoose.model('Answer', schemas.answers);
    var query = Answer.find({ question: req.params.id });
    var result = query.exec(function (err, answers) {
        if (err) return console.error(err)
        res.render("answers", { answers: answers, question: req.params.id })
        console.log(answers)
    })
})

router.get("/add-question/:materialId", function (req, res, next) {
    var Material = mongoose.model('Material', schemas.materials);
    Material.findById(req.params.materialId, function (err, material) {
        if (err) return console.error(err)
        console.log(material)
        res.render("add-question", { material: material });
    })
})

router.get("/create-material", function (req, res, next) {
    res.render("create-material.pug")
})

module.exports = router;
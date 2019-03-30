var express = require('express');
var router = express.Router();
router.get("/questions",function(req, res, next){
    res.render("questions",{questions:req.body.questions})
})
module.exports = router;
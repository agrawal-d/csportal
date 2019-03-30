var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schemas = require('../schemas/all.js')
mongoose.connect('mongodb://127.0.0.1/cs', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database connection started.");
});
/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log("COOKIES->")
  // console.log(req.cookies)
  if(req.query.logout){
    res.render('index', { title: 'Loged out of CSBITS',logout:true });
  }else if(req.cookies.id) {
    console.log("Login from" + req.cookies.id)
    res.render('dashboard', { body:req.body, title: "CSPortal - Get all you computer science content here.", user:req.cookies })

  } else {
    console.log("Not logged in")
    res.render('index', { title: 'Login to CSPortal to access content' });
  }

});

router.get("/materials",function(req, res, next){
  res.render("materials", {title:"Material Solutions | CS Bits Portal",user:req.cookies})
})











//APIs


router.post('/api/login',function(req, res){
  console.log("OOPS")
  var User = mongoose.model('User',schemas.users);
  var query = User.find({googleid:req.body.googleid});
  var result = query.exec(function(err, users){
    if(err) return console.error(err);
    if(users.length>=1){
      console.log("User login EXISTS");
      res.json({login:true})
    }else{
      console.log("User login NEW USER");
      var user = new User({
        googleid:req.body.googleid,
        name:req.body.name,
        admin:0,
        email:req.body.email,
        image:req.body.image
      })
      user.save(function(err, user){
        if(err) return console.error(err)
        res.json({login:true})
      })
    }
  });

  console.log("Logged in GOOGLE")
})

router.get('/api/logout',function(req, res, next){
  // res.clearCookie('googleid');
  // res.clearCookie()
  res.clearCookie("id");
  res.clearCookie("email");
  res.clearCookie("name");
  res.clearCookie("image");

  // res.clearCookie('name');
  // res.clearCookile('image');
  res.redirect("/?logout=true")
})

router.get('/api/users', function (req, res, next) {
  var User = mongoose.model('User', schemas.users);
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.json(users);
  })

});

router.get('/api/materials', function (req, res, next) {
  var Material = mongoose.model('Material', schemas.materials);
  // var material = new Material({
  //   name: "Lab Sheet 2",
  //   user: "Divyanshu Agrawal",
  //   verified: true

  // })
  // material.save(function (err, material) {
  //   if (err) return console.error(err);
  //   res.json("{success:true}");
  // })
  Material.find(function (err, materials) {
    if (err) return console.error(err);
    res.json(materials);
  })
});

router.post('/api/questions', function (req, res, next) {
  if (req.body.question && req.body.user) {
    var Question = mongoose.model('Question', schemas.questions);
    var question = new Question({
      question: req.body.question,
      user: req.body.user,
      upvotes: 0,
      downvotes: 0,
      material: req.body.material
    })
    question.save(function (err, question) {
      if (err) return console.error(err)
      res.json(question)
    })
  } else {
    res.json({ error: true })
  }

})

router.get('/api/questions', function (req, res, next) {
  if (!req.query.material) {
    res.json({ error: true, message: "Send a material id" })
  } else {
    var Question = mongoose.model('Question', schemas.questions);
    var query = Question.find({ material: req.query.material });
    var result = query.exec(function (err, questions) {
      if (err) return console.error(err)
      res.json(questions)
    })

  }
})

router.post('/api/answer', function (req, res, next) {
  if (!req.body.question) {
    res.json({ error: true })
  } else {
    var Answer = mongoose.model('Answers', schemas.answers);
    var answer = new Answer({
      code: req.body.code,
      descreption: req.body.descreption,
      language: req.body.language,
      upvotes: 0,
      downvotes: 0,
      question: req.body.question
    })
    answer.save(function (err, answer) {
      if (err) return console.error(err)
      res.json(answer);
    })
  }
})

router.post('/api/materials', function (req, res, next) {
  if (req.body) {
    var data = req.body
    var name = data.name;
    var user = data.user;
    var verified = false;
    var Material = mongoose.model('Material', schemas.materials);
    var material = new Material({
      name: name,
      user: user,
      verified: verified,
    })
    material.save(function (err, material) {
      if (err) return console.error(err)
      res.json(material);
    })
  } else {
    req.send({ error: true });
  }

})
module.exports = router;

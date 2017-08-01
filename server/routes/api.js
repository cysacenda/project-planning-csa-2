const express = require('express');
const router = express.Router();

//Mongoose specific
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* GET All Todos */
router.get('/todos', function(req, res, next) {
  db.todos.find(function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});

module.exports = router;

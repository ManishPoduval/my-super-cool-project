const router = require("express").Router();
const TodoModel = require('../models/Todo.model')

/* GET home page */
router.get("/", (req, res, next) => {
  
  TodoModel.find()
    .then((todos) => {
      
      res.render("kaj.hbs", {todos});
    })
    .catch(() => {
      next('Todo find failed')
    })
    
  
});

module.exports = router;

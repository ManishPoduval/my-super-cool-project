const TodoModel = require("../models/Todo.model");

const router = require("express").Router();

// My TODO routes will go here

//Create todo
// Handles GET requests to `/todos/create`
router.get('/todos/create', (req, res, next) => {
    // sending an hbs form back to the 
    res.render('todos/create-form.hbs')
})


// Handles POST requests to `/todos/create`
router.post('/todos/create', (req, res, next) => {
    //all the form data will be available inside req.body
    console.log(  req.body )
    const {title, description} = req.body
    //Insert the title and description in the DB

    //IMPORT YOUR TODOMODEL AT THE TOP OF THE FILE
    TodoModel.create({title, description})
        .then(() => {
            //redirect the user to home page

            // redirects it to a certain url path
            res.redirect('/')
        })
        .catch(() => {
            next('Todo creation failed')
        })

})

// Handles GET requests to `/todo/:somethingDynamic`
router.get('/todo/:todoId', (req, res, next) => {
    const {todoId} = req.params

    TodoModel.findById(todoId)
        .then((todo) => {
            //render some HBS file with that todo information
            res.render('todos/detail.hbs', {todo})
        })
        .catch(() => {
            next('Single todo fetch failed')
        })
    
})

// Handles GET requests to `/todos/235y38sdf23423/edit
router.get('/todos/:todoId/edit', (req, res, next) => {
    const {todoId} = req.params

    TodoModel.findById(todoId)
        .then((todo) => {
            //render some HBS file with that todo information
            res.render('todos/edit-form.hbs', {todo})
        })
        .catch(() => {
            next('Single todo fetch failed')
        })

})

// Handles POST requests to `/todos/235y38sdf23423/edit
router.post('/todos/:todoId/edit', (req, res, next) => {

    //We get this information from the form that the user submits
    const {title, description} = req.body

    // we grab the dynamic id from the url
    const {todoId} = req.params

    // Find that specific todo by id and update it
    TodoModel.findByIdAndUpdate(todoId, {title, description})
        .then(() => {
            res.redirect('/')
        })
        .catch(() => {
            next('Todo Edit failed')
        })

})

// Handles GET requests to `/todos/235y38sdf23423/delete
router.get('/todos/:todoId/delete', (req, res, next) => {
    //grab the todoId from the url
    const {todoId} = req.params 
    
    // Delete from the database
    TodoModel.findByIdAndDelete(todoId)
        .then(() => {
            //then send the user to the home page
            res.redirect('/')
        })
        .catch(() => {
            next('Todo delete failed')
        })

})

module.exports = router;

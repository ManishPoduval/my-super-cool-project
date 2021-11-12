// SEEDING IS TO ENSURE OUR DB HAS SOME INITIAL DATA

// 1. MAKE THE DB CONNECTIONS
require('../db')
const mongoose = require('mongoose')

// 2. REQUIRE THE MODEL
let TodoModel = require('../models/Todo.model')

// 3. INSERT DATA IN THE MODEL
TodoModel.insertMany([
    {title:'Gym', description:'Skip it'},
    {title:'Teach', description: 'Todo app lecture'}
])
    .then(() => {
        console.log('Data inserted')
        mongoose.connection.close()
    })
    .catch((err) => {
        console.log('Error ', err)
        mongoose.connection.close()
    })



// 4. Close the connection
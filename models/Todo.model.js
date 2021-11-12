const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
})

const TodoModel = mongoose.model("Todo", TodoSchema) 

module.exports = TodoModel
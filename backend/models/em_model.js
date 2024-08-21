const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String
})

const em_model = mongoose.model("Registered_User", EmployeeSchema)

module.exports = em_model
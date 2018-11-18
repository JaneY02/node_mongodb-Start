let mongoose =require('mongoose')
let MovieSchema = require('../schemas/movies')

let Movie = mongoose.model('Movie',MovieSchema)

module.exports = Movie
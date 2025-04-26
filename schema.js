const mongoose = require('mongoose')

const personajesSchema =new mongoose.Schema(
    {name : String , health : Number, damage : Number, startingItems : String, image: String},
    {collection : 'proyectofinal', versionKey : false}
)
const Personajes = mongoose.model('Personajes', personajesSchema)


const registroSchema = new mongoose.Schema({
    username: { type: String, required: true  },
    email: { type: String, required: true  },
    password: { type: String, required: true }},
    {collection : 'registro', versionKey: false}
);
const Registro = mongoose.model('Registro', registroSchema)

module.exports = {
    Personajes,
    Registro
}
const mongoose = require('mongoose')

const personajesSchema =new mongoose.Schema( // Base de datos de la colleción proyectofinal donde guardan los personajes
    {name : String , health : Number, damage : Number, startingItems : String, image: String},
    {collection : 'proyectofinal', versionKey : false}
)
const Personajes = mongoose.model('Personajes', personajesSchema)


const registroSchema = new mongoose.Schema({ // Base de datos de la colleción registro donde guardan los datos de los usuarios registrados
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
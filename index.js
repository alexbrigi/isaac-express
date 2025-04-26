console.clear()
console.log(`Express || Proyecto Final Iniciado`)

const {router} = require('./router')

const express = require('express')
const cors    = require('cors')
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/cei` 

const conectar = async () => {
    await mongoose.connect(MONGO_URL)
        .then(()=>console.log(`Mongo | Conectado`))
        .catch((error)=>console.log(error))
}
conectar()

const app = express()
    app.use(cors())
    app.use(express.urlencoded({extended : false}))
    app.use(express.json())
    app.use(router)


app.listen( 3000, ()=> console.log(`Express | API iniciada`))
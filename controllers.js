const {Personajes} = require('./schema')

//-- Controllers --//

const getPersonajes = async (req,res,next)=>{   // Petición GET
    try {
        const buscar = await Personajes.find()
        res.json(buscar)
    } catch (error) {
        next(error)
    }
}
const postPersonajes = async (req,res,next)=>{ // Petición POST
    try {
        const {name,health,damage,startingItems,image} = req.body
        const nuevo = new Personajes({ 
            name,
            health,
            damage,
            startingItems,
            image
        })
        await nuevo.save()
        const buscar = await Personajes.find()
        res.status(201).json(buscar)
    } catch (error) {
        next(error)
    }
    
}
const putPersonajes = async (req,res,next)=>{ // Petición PUT
    try {
        const { _id, ...datos} = req.body
        await Personajes.findByIdAndUpdate(_id,datos)
        const buscar = await Personajes.find()
        res.json(buscar)
    } catch (error) {
        next(error)
    }
}
const deletePersonajes = async (req,res,next)=>{ // Petición DELETE
    try {
        const {_id} = req.params
        await Personajes.findByIdAndDelete(_id)
        const buscar = await Personajes.find()
        res.json(buscar)
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    getPersonajes,
    postPersonajes,
    putPersonajes,
    deletePersonajes
}
const express = require('express')
const { getPersonajes, postPersonajes, putPersonajes, deletePersonajes } = require('./controllers')

const {Registro} = require('./schema')

const router = express.Router()

    router.route(`/personajes`)
        .get(getPersonajes)
        .post(postPersonajes)
        .put(putPersonajes)
    router.route(`/personajes/_id/:_id`)
        .delete(deletePersonajes)

    router.post('/register', async (req,res)=>{
        const {username, email, password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }
        try {
            const userLogin = await Registro.findOne({$or: [{username},{email}]})
            if(userLogin) {
                return res.status(400).json({message : 'Usuario o Email ya existe.'})
            }
            const nuevoRegistro = new Registro({username,email,password})
            await nuevoRegistro.save()
            res.status(201).json({message:'Usuario creado correctamente'})
        } catch (error) {
            res.status(500).json({message:'Error al crear el usuario'})            
        }
    })

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }
        try {
            const user = await Registro.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado.' });
            }
    
            
            if (user.password === password) {  
                return res.status(200).json({ message: 'Usuario logeado correctamente .' });
            } else {
                return res.status(400).json({ message: 'Contraseña incorrecta.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el login.' });
        }
    });
    

router.use((req, res, next) => { // Este código le pregunte a chatgpt porque el (all'*') me daba error y sin el all funciona.
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

router.use(( error , req , res , next )=>{
    let { status , message } = error
        status  = status || 500
        message = message || `Error interno`

    res.status(status).json(message)
})



module.exports = {
    router
}
const express = require('express')
const PersistenciaArchivos = require('../persistence/persistenciaArchivos')

class productosController{

    constructor(){

        this.productosRouter = express.Router()
        this.persistencia = new PersistenciaArchivos('productos.txt')

        this.productosRouter.get('/productos', (req, res) =>{
            this.persistencia.obtenerTodos()
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.productosRouter.get('/productos/:id', (req, res) =>{
            this.persistencia.obtengoItem(req.params.id)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.productosRouter.post('/productos', (req, res) =>{
            this.persistencia.insertarItem(req.body)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.productosRouter.put('/productos/:id', (req, res) =>{
            this.persistencia.modificarItem(req.params.id, req.body)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.productosRouter.delete('/productos/:id', (req, res) =>{
            this.persistencia.eliminarItem(req.params.id)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

    }

    getRouter(){
        return this.productosRouter
    }

}

module.exports = productosController
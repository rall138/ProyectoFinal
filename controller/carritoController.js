const express = require('express')
const PersistenciaArchivos = require('../persistence/persistenciaArchivos')

class carritoController{

    constructor(){

        this.carritoRouter = express.Router()
        this.persistencia = new PersistenciaArchivos('carritos.txt')

        this.carritoRouter.get('/carrito', (req, res) =>{
            this.persistencia.obtenerTodos()
            .then((result) => res.json(JSON.parse(result)))
            .catch(error => res.json(error))
        })

        this.carritoRouter.get('/carrito/:id', (req, res) =>{
            this.persistencia.obtengoItem(req.params.id)
            .then((result) => res.json(result.productos))
            .catch(error => res.json(error))
        })

        this.carritoRouter.post('/carrito', (req, res) =>{
            const carrito = req.body
            carrito.timestamp = Date.now()
            this.persistencia.insertarItem(carrito)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        // Agregar productos al carro
        this.carritoRouter.post('/carrito/:id/productos', (req, res) =>{
            const producto = req.body
            this.persistencia.obtengoItem(req.params.id)
            .then(carrito => {
                const prod = carrito.productos.filter(prd => prd.id === producto.id)[0]
                if(!prod){
                    carrito.productos.push(producto)
                    return this.persistencia.modificarItem(carrito.id, carrito)
                }else{
                    return null
                }
            })
            .then(status => res.json(status))
        })

        this.carritoRouter.put('/carrito/:id', (req, res) =>{
            this.persistencia.modificarItem(req.params.id, req.body)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.carritoRouter.delete('/carrito/:id', (req, res) =>{
            this.persistencia.eliminarItem(req.params.id)
            .then((result) => res.json(result))
            .catch(error => res.json(error))
        })

        this.carritoRouter.delete('/carrito/:id/productos/:id_prod', (req, res) =>{
            this.persistencia.obtengoItem(req.params.id)
            .then(carrito => {
                carrito.productos = carrito.productos.filter(prd => parseInt(prd.id) !== parseInt(req.params.id_prod))
                return this.persistencia.modificarItem(carrito.id, carrito)
            })
            .then(status => res.json(status))
        })

    }

    getRouter(){
        return this.carritoRouter
    }

}

module.exports = carritoController
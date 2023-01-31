// const http = require('http')

// const PORT = 4000

// const server = http.createServer((req, res)=>{
//     res.end("Este es el primer servidor")
// })

// server.listen(PORT, ()=>{
//     console.log(`Server ready on ${PORT}`)
// })

// const http = require('http')

// //import * as http from 'http'
// const PORT = 5050

// const server = http.createServer((request, response) => {
//     response.end("Este es el primer servidor!")
// })

// server.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`)
// })


import express from 'express'
import {ProductManager} from './products/ProductManager.js'


const PORT = 8080
const app = express()
const productManager = new ProductManager();

const productos = [
    {id:1,title: "porotos"},
    {id:2,title:"arroz"}
]

app.use(express.urlencoded({extended:true})) // permite busquedas de url complejas

app.get('/contacto', (req,res)=>{
    res.send('Hola esta es la pagina de contacto')
})


/**
 * Welcome Page
 */
app.get('/', (req,res)=>{
    res.send('Bienvenidos a tu tienda online API ')
})

app.get('/products', async (req, res) => {
    let limit = req.query.limit;
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    res.json({ products });
  });


app.get('/products/:id', async (req, res) => {

    let id  = req.params.id;
    try {
        let allProducts = await productManager.getProducts();
        let productById = allProducts.find(item => item.id == id)
          if (!productById) {
            res.status(404).json({ message: 'Product not found' });
            return;
          }
        res.json({ productById });
    } catch (error) {
        console.log(error)
    }
  });



app.listen(PORT, ()=>{
    console.log(`Server ready on port ${PORT}`)
})
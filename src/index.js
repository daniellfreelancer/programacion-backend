import express from 'express'
import {ProductManager} from './products/ProductManager.js'
import cookieParser from 'cookie-parser'


const PORT = 8080
const app = express()
const productManager = new ProductManager();



app.use(express.urlencoded({extended:true})) // permite busquedas de url complejas
app.use(cookieParser())
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
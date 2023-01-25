import {promises as fs} from 'fs'

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {

  constructor() {
    this.products = [];
    this.id = 0;
    this.patch = "./products.txt"
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    
    

    try {
      if (this.findProductByCode(code)) {
        return console.log("Product Code already exist");
      }

      const item = new Product(title, description, price, thumbnail, code, stock);

      if (this.validateProduct(item)) {
        const product = { ...item, id: this.id++ };
        this.products.push(product);
        await fs.writeFile(this.patch, JSON.stringify(this.products));
        console.log("Product added");
      } else {
        console.log("All fields are required");
      }
    } catch (error) {
      console.log(error);
    }
  }

  readAllProducts = async ()=>{
    let response =  await fs.readFile(this.patch, "utf-8")
    return  JSON.parse(response)
  }

  getProducts = async () => {
    let response = await this.readAllProducts()
    console.log(response)
    return response
  }

  getProductsById = async (id) => {
    let response =  await this.readAllProducts()

    let product = response.find((item) => item.id === id);

    if (!product) {
      console.log("Product Not Found");
      return null;
    }
    console.log(product)
    return product;
  }

  deleteProductoById = async (id)=>{

    let response = await this.readAllProducts();
    let responseFilter = response.filter(products => products.id != id)

    await fs.writeFile(this.patch, JSON.stringify(responseFilter))
    console.log(`${id} has been deleted`)
    console.log(responseFilter)
    


  }


  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.readAllProducts();
      const productIndex = products.findIndex((item) => item.id === id);

      if (productIndex === -1) {
        console.log("Product Not Found");
        return;
      }

      const product = { ...products[productIndex], ...updatedProduct };
      products[productIndex] = product;
      await fs.writeFile(this.patch, JSON.stringify(products));
      console.log("Product updated");
    } catch (error) {
      console.log(error);
    }
  }




  findProductByCode(code) {
    return this.products.find((item) => item.code === code);
  }

  validateProduct(product) {
    return Object.values(product).every((value) => value !== undefined);
  }
}

const newCollection = new ProductManager();

// newCollection.addProduct(
//   "Poroto",
//   "Porotos Negros",
//   1000,
//   "url:pic",
//   "001",
//   100
// );

// newCollection.addProduct(
//   "Poroto",
//   "Porotos Rojos",
//   2500,
//   "url:pic",
//   "002",
//   200
// );

// newCollection.addProduct(
//   "Porotos",
//   "Porotos Blancos",
//   2500,
//   "url:pic",
//   "003",
//   150
// );

// newCollection.addProduct(
//   "Porotos",
//   "Porotos verdes",
//   2500,
//   "url:pic",
//   "004",
//   300
// );

// newCollection.addProduct(
//   "Porotos",
//   "Porotos Naranja",
//   2500,
//   "url:pic",
//   "005",
//   0
// );

// console.log(newCollection.getProducts());

// newCollection.addProduct("Porotos", "Porotos Rosa", 3000, "url:pic", "002");

// console.log(newCollection.getProducts());
// console.log(newCollection.getProductsById(1));


// newCollection.deleteProductoById(1)

newCollection.updateProduct(4, { stock: 10})

newCollection.getProducts()
import { promises as fs } from 'fs'

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

export class ProductManager {

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

  readAllProducts = async () => {
    let response = await fs.readFile(this.patch, "utf-8")
    return JSON.parse(response)
  }

  getProducts = async () => {
    let response = await this.readAllProducts()
    console.log(response)
    return response
  }

  getProductsById = async (id) => {
    let response = await this.readAllProducts()

    let product = response.find((item) => item.id === id);

    if (!product) {
      console.log("Product Not Found");
      return null;
    }
    console.log(product)
    return product;
  }

  deleteProductoById = async (id) => {

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



// newCollection.getProductsById(0)
//item 01
// newCollection.addProduct(
//   "Poroto",
//   "Porotos Negros",
//   1000,
//   "url:pic",
//   "001",
//   100
// );
// //item 02
// newCollection.addProduct(
//   "Poroto",
//   "Porotos Rojos",
//   2500,
//   "url:pic",
//   "002",
//   200
// );
// //item 03
// newCollection.addProduct(
//   "Porotos",
//   "Porotos Blancos",
//   2500,
//   "url:pic",
//   "003",
//   150
// );
// //item 04
// newCollection.addProduct(
//   "Porotos",
//   "Porotos verdes",
//   2500,
//   "url:pic",
//   "004",
//   300
// );
// //item 05
// newCollection.addProduct(
//   "Porotos",
//   "Porotos Marron",
//   2500,
//   "url:pic",
//   "005",
//   0
// );
// //item 06
// newCollection.addProduct(
//   "Lenteja",
//   "Lentejas Común",
//   1200,
//   "url:pic",
//   "006",
//   100
// );
// //item 07
// newCollection.addProduct(
//   "Lenteja",
//   "Lentejas Chicas",
//   2500,
//   "url:pic",
//   "007",
//   200
// );
// //item08
// newCollection.addProduct(
//   "Lenteja",
//   "Lentejas Naranjas",
//   5000,
//   "url:pic",
//   "008",
//   1500
// );
// //item09
// newCollection.addProduct(
//   "Lenteja",
//   "Porotos Amarillas",
//   2500,
//   "url:pic",
//   "009",
//   450
// );
// //item10
// newCollection.addProduct(
//   "Lenteja",
//   "Porotos Grandes",
//   2500,
//   "url:pic",
//   "0010",
//   60
// );
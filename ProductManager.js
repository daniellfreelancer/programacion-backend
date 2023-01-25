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

  addProduct(title, description, price, thumbnail, code, stock) {
    try {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].code == code) {
          return console.log("Product Code already exist");
        } else {
          console.log("Product added");
        }
      }

      let item = new Product(title, description, price, thumbnail, code, stock);

      if (Object.values(item).includes(undefined)) {
        console.log("All fields are required");
      } else {
        this.products.push({ ...item, id: this.id++ });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    let product = this.products.find((item) => item.id === id);

    if (!product) {
      console.log("Not Found");
      return null;
    }

    return product;
  }
}

const newCollection = new ProductManager();

newCollection.addProduct(
  "Poroto",
  "Porotos Negros",
  1000,
  "url:pic",
  "001",
  100
);

newCollection.addProduct(
  "Poroto",
  "Porotos Rojos",
  2500,
  "url:pic",
  "002",
  200
);

newCollection.addProduct(
  "Porotos",
  "Porotos Blancos",
  2500,
  "url:pic",
  "003",
  150
);

newCollection.addProduct(
  "Porotos",
  "Porotos verdes",
  2500,
  "url:pic",
  "004",
  300
);

newCollection.addProduct(
  "Porotos",
  "Porotos Naranja",
  2500,
  "url:pic",
  "005",
  0
);

console.log(newCollection.getProducts());

newCollection.addProduct("Porotos", "Porotos Rosa", 3000, "url:pic", "002");

//console.log(newCollection.getProducts());
console.log(newCollection.getProductsById(5));

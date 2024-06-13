#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// imports data
const productsData = require('./data/products.data');
const categoriesData = require('./data/categories.data');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const Category = require("./models/category");

const products = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // execute the code
  await createCategories();
  await createProducts();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate({name}, index) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate({name, description, stock, price, categories}, index) {
  const productdetail = {
    name,
    description,
    stock,
    price,
  };
  if (categories) productdetail.categories = categories;

  const product = new Product(productdetail);
  await product.save();
  products[index] = product;
  console.log(`Added product: ${name}`);
}

// creating documents
async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(categoriesData[0], 0),
    categoryCreate(categoriesData[1], 1),
    categoryCreate(categoriesData[2], 2),
  ]);
}

async function createProducts() {
  console.log("Adding Products");
  
  // add the category to the product
  productsData[0].categories = [categories[0]];
  productsData[1].categories = [categories[0]];
  productsData[2].categories = [categories[0]];
  productsData[3].categories = [categories[1]];
  productsData[4].categories = [categories[1]];
  productsData[5].categories = [categories[2]];
  productsData[6].categories = [categories[2]];

  await Promise.all([
    productCreate(productsData[0], 0),
    productCreate(productsData[1], 1),
    productCreate(productsData[2], 2),
    productCreate(productsData[3], 3),
    productCreate(productsData[4], 4),
    productCreate(productsData[5], 5),
    productCreate(productsData[6], 6),    
  ]);
}
//______________________________
//          COMP229             |
//  Assignment 2                |
//  Student: Radmir Taskynbayev |
//  ID: 301239725               |
//______________________________|

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String
});

module.exports = mongoose.model('Product', productSchema);

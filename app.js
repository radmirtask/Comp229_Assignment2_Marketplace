//______________________________
//          COMP229             |
//  Assignment 2                |
//  Student: Radmir Taskynbayev |
//  ID: 301239725               |
//______________________________|

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const productController = require('./controllers/productController');

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Marketplace', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


  app.get('/api/products', productController.getAllProducts);
  app.get('/api/products/:id', productController.getProductById);
  app.post('/api/products', productController.addProduct);
  app.put('/api/products/:id', productController.updateProduct);
  app.delete('/api/products/:id', productController.removeProductById);
  app.delete('/api/products', productController.removeAllProducts);
  app.get('/api/products', productController.findProductsByName);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// konfiguracja EJS + layoutów
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// dane w pamięci
const products = [
  { id: 1, name: 'Kubek JavaScript', price: 25 },
  { id: 2, name: 'T-Shirt Node.js', price: 75 },
  { id: 3, name: 'Czapka Dev', price: 40 }
];
let cart = [];

// routing
app.get('/', (req, res) => {
  res.render('index', { products });
});

app.post('/cart/add', (req, res) => {
  const id = parseInt(req.body.productId, 10);
  const item = products.find(p => p.id === id);
  if (item) cart.push(item);
  res.redirect('/cart');
});

app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  res.render('cart', { cart, total });
});

app.post('/cart/clear', (req, res) => {
  cart = [];
  res.redirect('/');
});

// start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Store listening on http://localhost:${PORT}`)
);

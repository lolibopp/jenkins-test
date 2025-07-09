const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// konfiguracja
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// dane w pamięci
const products = [
  { id: 1, name: 'Kubek JavaScript', price: 25 },
  { id: 2, name: 'T-Shirt Node.js', price: 75 },
  { id: 3, name: 'Czapka Dev', price: 40 }
];
let cart = [];

// Strona główna → lista produktów
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Dodaj do koszyka
app.post('/cart/add', (req, res) => {
  const id = parseInt(req.body.productId, 10);
  const item = products.find(p => p.id === id);
  if (item) cart.push(item);
  res.redirect('/cart');
});

// Wyświetl koszyk
app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  res.render('cart', { cart, total });
});

// Opróżnij koszyk
app.post('/cart/clear', (req, res) => {
  cart = [];
  res.redirect('/');
});

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Store listening on ${PORT}`));

const express = require('express');
const path = require('path'); 
const productsRouter = require('./server/routers/productsRouter');
const cartRouter = require('./server/routers/cartRouter');

const app = express();
const port = process.env.PORT || 8080;
// const DIST_DIR = path.join(__dirname, '../build');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(path.join(__dirname, './build')));


const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(DIST_DIR)); 

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

// app.get('/', (req, res) => {
//  res.sendFile(HTML_FILE); // EDIT
// });
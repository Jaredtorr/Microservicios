const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hola, soy Jared y este es el frontend</h1>');
});

app.listen(PORT, () => {
  console.log('Frontend corriendo en puerto ' + PORT);
});

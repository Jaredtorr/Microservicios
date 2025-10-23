
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios');
  res.json(result.rows);
});

app.get('/torres', async (req, res) => {
  const result = await pool.query("SELECT nombre, apellido FROM usuarios WHERE apellido='Torres'");
  res.json(result.rows[0]);
});

app.listen(5000, () => console.log('Backend corriendo en puerto 5000'));

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon') || process.env.DATABASE_URL?.includes('render')
    ? { rejectUnauthorized: false }
    : false,
});

async function executarSQL(sql) {
  const client = await pool.connect();
  try {
    await client.query(sql);
  } finally {
    client.release();
  }
}

async function inicializarTabelas() {
  const fs = require('fs');
  const path = require('path');
  const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
  await pool.query(sql);
}

module.exports = { pool, executarSQL, inicializarTabelas };

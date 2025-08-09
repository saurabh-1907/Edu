const mysql = require('mysql2/promise');
const url = require('url');

const CONNECTION_STRING = process.env.DATABASE_URL;

if (!CONNECTION_STRING) {
  console.error('DATABASE_URL not set in environment');
  process.exit(1);
}

const dbUrl = new URL(CONNECTION_STRING);

const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  ssl: {
    rejectUnauthorized: true 
  },
  connectionLimit: 10
});

module.exports = pool;

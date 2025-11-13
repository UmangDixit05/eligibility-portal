import mysql from 'mysql2';
import { config } from './config.js';

const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

export default db;

// File: vulnerable.js
const http = require('http');
const url = require('url');
const mysql = require('mysql');

// ⚠️ Insecure DB connection (use your own creds/host)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'demo'
});

const server = http.createServer((req, res) => {
  // Parse `?id=` from URL
  const queryObject = url.parse(req.url, true).query;
  const userId = queryObject.id;

  // 🔥 Vulnerable: direct string concatenation allows SQL injection
  const sql = `SELECT name, email FROM users WHERE id = ${userId}`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(results));
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
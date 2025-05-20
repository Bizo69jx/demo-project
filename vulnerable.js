const http = require('http');
const url = require('url');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'demo'
});

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const userId = queryObject.id;

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

module.exports = {
  awsAccessKeyId: 'AKIAIOSFODNN7EXAMPLE',  
  awsSecretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
};
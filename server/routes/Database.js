// database.js
const mysql = require('mysql');

class Database
{
  constructor()
  {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'voting_system'
    });
  }

  connect()
  {
    this.connection.connect((err) => {
      if (err) throw err;
      console.log('MySQL Connected');
    });
  }

query(sql, values, callback) {
  if (!Array.isArray(values)) {
    values = []; // Assign an empty array if values is not provided
  }

  this.connection.query(sql, values, (err, result) => {
    if (err) throw err;
    callback.json(result);
  });
}
  close() {
    this.connection.end();
  }
}

module.exports = Database;


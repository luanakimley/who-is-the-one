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
  if (typeof values === 'function')
  {
    callback = values;
    values = [];
  }
  else if (!Array.isArray(values))
  {
    values = [];
  }

  this.connection.query(sql, values, (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

  close()
  {
    this.connection.end();
  }
}

module.exports = Database;


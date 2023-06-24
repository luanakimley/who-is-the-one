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

    this.connect();
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

        if (Array.isArray(result) && result.length > 0)
        {
          if (result[0] instanceof Array)
          {
            callback(result[0]);
          }
          else
          {
            callback(result);
          }
        }
        else
        {
          callback([]);
        }
  });
}

  close()
  {
    this.connection.end();
  }
}

module.exports = Database;

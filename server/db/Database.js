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

query(sql, values, callback)
{
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
    if (err)
    {
        console.log(err);
    }

        if (Array.isArray(result))
        {
          const filteredResult = result.reduce((acc, item) => {
              if (!('fieldCount' in item && 'affectedRows' in item))
              {
                acc.push(item);
              }
              return acc;
          }, []);

            if(filteredResult.length === 1)
            {
                callback(filteredResult[0]);
            }
            else
            {
                callback(filteredResult)
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

module.exports = new Database();


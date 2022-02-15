mysql = require("../mysql");

exports.signup = (req, res, next) => {
  mysql.getConnection((errors, connection) => {
    if (errors) {
      return next(new Error("Can't connect to MySQL."));
    } else {
      connection.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [req.body.name, req.body.email, req.body.password],
        (error, result, fields) => {
          connection.release();
          if (error) {
            console.log(error);
            return res.status(500).send({
              message: error.sqlMessage,
            });
          }
          res.send({
            message: "Welcome, " + req.body.name,
          });
        }
      );
    }
  });
};

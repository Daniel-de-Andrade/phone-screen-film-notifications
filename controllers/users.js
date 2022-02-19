const mysql = require("../mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.signup = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return next(new Error("Can't connect to database."));
    }

    bcrypt.hash(req.body.password.toString(), 10, (errBcrypt, hash) => {
      if (errBcrypt) {
        return next(errBcrypt);
      }
      conn.query(
        "INSERT INTO users (name, email, cpf, password) VALUES (?, ?, ?, ?)",
        [req.body.name, req.body.email, hash],
        (error, result, fields) => {
          conn.release();
          if (error) {
            return res.status(500).send({
              message: error.sqlMessage,
            });
          }
          res.send({
            message: "Welcome, " + req.body.name,
          });
        }
      );
    });
  });
};

exports.signin = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [req.body.email],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (result.length < 1) {
          return res.status(401).send({
            message: "Invalid data.",
          });
        } else {
          bcrypt.compare(
            req.body.password.toString(),
            result[0].password,
            (errBcrypt, resultBcrypt) => {
              if (errBcrypt) {
                return next(errBcrypt);
              }
              if (resultBcrypt) {
                const token = jwt.sign(
                  {
                    userId: result[0].id,
                    userName: result[0].name,
                    userEmail: result[0].email,
                  },
                  config.JWT_KEY,
                  {
                    expiresIn: "30d",
                  }
                );
                return res.status(200).send({
                  message: "Welcome, " + result[0].name,
                  token: token,
                });
              }
              return res.status(401).send({
                message: "Invalid data.",
              });
            }
          );
        }
      }
    );
  });
};

exports.profile = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [req.body.name, req.body.email, req.user.userId],

      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "User profile updated.",
        });
      }
    );
  });
};

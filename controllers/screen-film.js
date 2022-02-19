const mysql = require("../mysql");

exports.create = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "INSERT INTO screen-film (user, name, phone, imei, pdv) VALUES (?, ?, ?, ?, ?)",
      [
        req.user.userId,
        req.body.name,
        req.body.phone,
        req.body.imei,
        req.body.pdv,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "Film created successfuly.",
          filmId: results.insertId,
        });
      }
    );
  });
};

exports.details = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "SELECT * FROM screen-film WHERE id = ? AND user = ?",
      [req.body.id, req.user.userId],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (results.length < 1) {
          return res.status(404).send({
            message: "No such film.",
          });
        }
        res.status(200).send({
          message: "Film details",
          film: results[0],
        });
      }
    );
  });
};

exports.read = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "SELECT * FROM screen-film WHERE user = ?",
      [req.user.userId],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "Film list",
          films: results,
        });
      }
    );
  });
};

exports.update = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }

    conn.query(
      "SELECT * FROM screen-film WHERE id = ?",
      [req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (results.length < 1) {
          return res.status(404).send({
            message: "No such film.",
          });
        } else {
          conn.query(
            "UPDATE screen-film SET name = ?, phone = ?, imei = ?, pdv = ? WHERE id = ? AND user = ?",
            [
              req.body.name,
              req.body.phone,
              req.body.imei,
              req.body.pdv,
              req.body.id,
              req.user.userId,
            ],
            (error, results, fields) => {
              if (error) {
                return res.status(500).send({
                  message: error.sqlMessage,
                });
              }
              res.send({
                message: "Film updated sucessfuly.",
              });
            }
          );
        }
      }
    );
  });
};

exports.delete = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }

    conn.query(
      "SELECT * FROM screen-film WHERE id = ?",
      [req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (results.length < 1) {
          return res.status(404).send({
            message: "No such film.",
          });
        } else {
          conn.query(
            "DELETE FROM screen-film WHERE id = ?",
            [req.body.id],
            (error, results, fields) => {
              if (error) {
                return res.status(500).send({
                  message: error.sqlMessage,
                });
              }
              res.status(200).send({
                message: "Film deleted successfuly.",
              });
            }
          );
        }
      }
    );
  });
};

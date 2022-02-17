const mysql = require("../mysql");

exports.create = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    conn.release();
    if (err) {
      return next(new Error("Cant connect to database."));
    }
    conn.query(
      "INSERT INTO contacts (user, name, phone, email) VALUES (?, ?, ?, ?)",
      [req.user.userId, req.body.name, req.body.phone, req.body.email],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "Contact created successfuly.",
          contactId: results.insertId,
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
      "SELECT * FROM contacts WHERE id = ? AND user = ?",
      [req.body.id, req.user.userId],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (results.length < 1) {
          return res.status(404).send({
            message: "User not found.",
          });
        }
        res.status(200).send({
          message: "Contact details",
          contact: results[0],
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
      "SELECT * FROM contacts WHERE user = ?",
      [req.user.userId],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "Contact list",
          contacts: results,
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
      "SELECT * FROM contacts WHERE id = ?",
      [req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        if (results.length < 1) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
      }
    );

    conn.query(
      "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ? AND user = ?",
      [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.id,
        res.user.userId,
      ],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.send("");
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
      "DELETE FROM contacts WHERE id = ?",
      [req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({
            message: error.sqlMessage,
          });
        }
        res.status(200).send({
          message: "Contact deleted successfuly.",
        });
      }
    );
  });
};

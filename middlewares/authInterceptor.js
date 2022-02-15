const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * @function intercept Intercept route do know if user is logged
 */

exports.intercept = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, config.JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ mensagem: "Falha na autenticação" });
  }
};

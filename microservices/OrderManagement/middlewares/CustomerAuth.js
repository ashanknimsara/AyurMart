const { CustomerToken } = require("../models/CustomerToken");
const jwt = require("jsonwebtoken");

let CustomerAUth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  CustomerToken.findOne(
    { CustomerID: decoded.CustomerID, token, tokenType: "login" },
    (err, customerToken) => {
      if (err) throw err;
      if (!customerToken) {
        return res.json({
          isAuth: false,
        });
      }
      req.token = token;
      req.CustomerID = decoded.CustomerID;
      next();
    },
  );
};

module.exports = { CustomerAUth };

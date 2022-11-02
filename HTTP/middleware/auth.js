const authentication = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send({ message: "user is not login" });
    }
  };
  
  module.exports = authentication;
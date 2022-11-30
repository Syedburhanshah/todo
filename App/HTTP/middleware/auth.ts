const authentication = (req:any, res:any, next:any) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send({ message: "user is not login" });
    }
  };
  
 export default  authentication;
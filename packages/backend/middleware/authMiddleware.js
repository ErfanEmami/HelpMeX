const authMiddleware = (req, res, next) => {
    if (!req.session?.passport?.user) {
      return res.status(401).send('Not authenticated');
    }
    next();
  };
  
  export default authMiddleware;
  
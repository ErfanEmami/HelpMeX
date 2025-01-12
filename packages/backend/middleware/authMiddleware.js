const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Not authenticated');
    }
    next();
  };
  
  export default authMiddleware;
  
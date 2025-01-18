const testMiddleware = async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a delay
  next(); // Call the next middleware or route handler
};

export default testMiddleware;

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Something Went Wrong";
  return res.status(statusCode).json({ message, success: false });
};

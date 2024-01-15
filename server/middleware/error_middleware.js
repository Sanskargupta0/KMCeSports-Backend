const errorMiddleware = (err, req, res, Next) => {
  const status = err.status || 500;
  const message = err.msg || "BACKEND ERROR";
  const extraDetails = err.extraD || "Something went wrong";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;

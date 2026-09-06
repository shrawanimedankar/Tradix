const sendResponse = (
  res,
  {
    success = true,
    status_code = 200,
    message = success ? "Request successful." : "An error occurred.",
    data = null,
    error = null,
  }
) => {
  const responseBody = {
    success,
    status_code,
    message,
    data,
    error: error
      ? {
          code: error.code || "ERROR",
          message: error.message || String(error),
        }
      : null,
  };

  return res.status(status_code).json(responseBody);
};

module.exports = { sendResponse };
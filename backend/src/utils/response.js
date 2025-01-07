const response = (statusCode, data, message, res) => {
  res.status(statusCode).send({
    data: data,
    message,
    statusCode
  });
};

export default response;

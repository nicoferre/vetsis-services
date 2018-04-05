const securityController = require('../controller/securityController');

const newUser = (req, res) => {
  const content = req.body;
  securityController.newUser(content)
    .then((user) => {
      res.status(201)
        .send(user);
    }, (err) => {
      res.status(err.code)
        .send({
          error: {
            code: err.code,
            message: err.message,
          },
        });
    });
};

const login = (req, res) => {
  const content = req.body;
  let callbackSuccess = function callbackSuccess(user) {
    return res.send(user);
  };
  let callbackError = function callbackError(err) {
    return res.status(500).send(err);
  };
  securityController.loginUser(content, callbackSuccess, callbackError);
};

module.exports = {
  newUser,
  login
};

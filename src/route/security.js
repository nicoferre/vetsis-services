const securityController = require('../controller/securityController');
const console = require('../utils/logger').logger;

const newUser = (req, res) => {
  const content = req.body;
  securityController.newUser(content)
    .then(() => {
      res.status(201)
        .send();
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
  securityController.loginUser(content, callbackSuccess);
};

module.exports = {
  newUser,
  login
};

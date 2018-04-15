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

const showUsers = (req, res) => {
  let callbackSuccess = function callbackSuccess(users) {
    return res.send(users);
  };
  securityController.showUsers(callbackSuccess);
};

const deleteUser = (req, res) => {
  const userId = req.headers.user_id;
  const success = (data) => {
    if (data === 0) {
      const error = {
        error: {
          code: 404,
          message: 'No provider found with that name.',
        },
      };
      return res.status(404)
        .send(error);
    } else {
      res.status(204)
        .send();
    }
  };

  const error = () => {
    const error = {
      error: {
        code: 500,
        message: 'Internal Server Error.',
      },
    };
    return res.status(500)
      .send(error);
  };

  securityController
    .deleteUser(userId)
    .then(success, error);
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

const newRole = (req, res) => {
  const content = req.body;
  securityController.newRole(content)
    .then((role) => {
      res.status(200)
        .send(role);
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

const showRoles = (req, res) => {
  let callbackSuccess = function callbackSuccess(roles) {
    return res.send(roles);
  };
  securityController.showRoles(callbackSuccess);
};

const deleteRole = (req, res) => {
  const roleId = req.headers.role_id;
  const success = (data) => {
    if (data === 0) {
      const error = {
        error: {
          code: 404,
          message: 'No provider found with that name.',
        },
      };
      return res.status(404)
        .send(error);
    } else {
      res.status(204)
        .send();
    }
  };

  const error = () => {
    const error = {
      error: {
        code: 500,
        message: 'Internal Server Error.',
      },
    };
    return res.status(500)
      .send(error);
  };

  securityController
    .deleteRole(roleId)
    .then(success, error);
};

module.exports = {
  newUser,
  showUsers,
  login,
  deleteUser,
  newRole,
  showRoles,
  deleteRole,
};

const dao = require('../dao/mongoDBDao');

const newUser = (user) => {
  const promise = (resolve, reject) => {
    dao.storeUser(user)
      .then((user) => resolve(user), err => reject(err));
  };
  return new Promise(promise);
};

const showUsers = (callbackSuccess) => {
  dao.showUsers(callbackSuccess);
};

const deleteUser = userId => dao.deleteUser(userId);

const loginUser = (user, callbackSuccess, callbackError) => {
  dao.loginUser(user, callbackSuccess, callbackError);
};

const newRole = (role) => {
  const promise = (resolve, reject) => {
    dao.newRole(role)
      .then((role) => resolve(role), err => reject(err));
  };
  return new Promise(promise);
};

const showRoles = (roleId, callbackSuccess) => {
  dao.showRoles(roleId, callbackSuccess);
};

const deleteRole = roleId => dao.deleteRole(roleId);

module.exports = {
  newUser,
  loginUser,
  showUsers,
  deleteUser,
  newRole,
  showRoles,
  deleteRole,
};

const dao = require('../dao/mongoDBDao');

const newUser = (user) => {
  const promise = (resolve, reject) => {
    dao.storeUser(user)
      .then(() => resolve(), err => reject(err));
  };
  return new Promise(promise);
};

const loginUser = (user, callbackSuccess) => {
  dao.loginUser(user, callbackSuccess);
};

module.exports = {
  newUser,
  loginUser
};

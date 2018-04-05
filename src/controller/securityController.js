const dao = require('../dao/mongoDBDao');

const newUser = (user) => {
  const promise = (resolve, reject) => {
    dao.storeUser(user)
      .then((user) => resolve(user), err => reject(err));
  };
  return new Promise(promise);
};

const loginUser = (user, callbackSuccess, callbackError) => {
  dao.loginUser(user, callbackSuccess, callbackError);
};

module.exports = {
  newUser,
  loginUser
};

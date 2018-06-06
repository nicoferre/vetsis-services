const dao = require('../dao/mongoDBDao');

const newLocation = (location) => {
  const promise = (resolve, reject) => {
    dao.newLocation(location)
      .then((location) => resolve(location), err => reject(err));
  };
  return new Promise(promise);
};

const showLocations = (callbackSuccess) => {
  dao.showLocations(callbackSuccess);
};

module.exports = {
  newLocation,
  showLocations,
};

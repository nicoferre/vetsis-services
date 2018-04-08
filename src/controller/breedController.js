const dao = require('../dao/mongoDBDao');

const newBreed = (breed) => {
  const promise = (resolve, reject) => {
    dao.newBreed(breed)
      .then((breed) => resolve(breed), err => reject(err));
  };
  return new Promise(promise);
};

const showBreed = (speciesId, callbackSuccess) => {
  dao.showBreed(speciesId, callbackSuccess);
};

const deleteBreed = breedId => dao.deleteBreed(breedId);

const modifyBreed = (breed) => {
  const promise = (resolve, reject) => {
    dao.modifyBreed(breed)
      .then((breed) => resolve(breed), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newBreed,
  showBreed,
  modifyBreed,
  deleteBreed,
};

const dao = require('../dao/mongoDBDao');

const newSpecies = (species) => {
  const promise = (resolve, reject) => {
    dao.newSpecies(species)
      .then((species) => resolve(species), err => reject(err));
  };
  return new Promise(promise);
};

const showSpecies = (callbackSuccess) => {
  dao.showSpecies(callbackSuccess);
};

const deleteSpecies = speciesId => dao.deleteSpecies(speciesId);

const modifySpecies = (species) => {
  const promise = (resolve, reject) => {
    dao.modifySpecies(species)
      .then((species) => resolve(species), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newSpecies,
  showSpecies,
  modifySpecies,
  deleteSpecies,
};

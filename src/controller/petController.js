const dao = require('../dao/mongoDBDao');

const newPet = (pet) => {
  const promise = (resolve, reject) => {
    dao.newPet(pet)
      .then((pet) => resolve(pet), err => reject(err));
  };
  return new Promise(promise);
};

const showPets = (callbackSuccess) => {
  dao.showPets(callbackSuccess);
};

const lastId = (callbackSuccess) => {
  dao.lastId(callbackSuccess);
};
const deletePet = petId => dao.deletePet(petId);

const modifyPet = (pet) => {
  const promise = (resolve, reject) => {
    dao.modifyPet(pet)
      .then((pet) => resolve(pet), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newPet,
  showPets,
  modifyPet,
  deletePet,
  lastId,
};

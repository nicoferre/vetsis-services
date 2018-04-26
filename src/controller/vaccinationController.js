const dao = require('../dao/mongoDBDao');

const newVaccination = (vaccination) => {
  const promise = (resolve, reject) => {
    dao.newVaccination(vaccination)
      .then((vaccination) => resolve(vaccination), err => reject(err));
  };
  return new Promise(promise);
};

const showVaccination = (vaccinationId, callbackSuccess) => {
  dao.showVaccination(vaccinationId, callbackSuccess);
};

const deleteVaccination = vaccinationId => dao.deleteVaccination(vaccinationId);

const modifyVaccination = (vaccination) => {
  const promise = (resolve, reject) => {
    dao.modifyVaccination(vaccination)
      .then((vaccination) => resolve(vaccination), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newVaccination,
  showVaccination,
  modifyVaccination,
  deleteVaccination,
};

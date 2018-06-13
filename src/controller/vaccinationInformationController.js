const dao = require('../dao/mongoDBDao');

const newVaccinationInformation = (vaccination) => {
  const promise = (resolve, reject) => {
    dao.newVaccinationInformation(vaccination)
      .then((vaccination) => resolve(vaccination), err => reject(err));
  };
  return new Promise(promise);
};

const showVaccinationInformation = (vaccinationId, callbackSuccess) => {
  dao.showVaccinationInformations(vaccinationId, callbackSuccess);
};

const deleteVaccinationInformation = vaccinationId => dao.deleteVaccinationInformation(vaccinationId);

const modifyVaccinationInformation = (vaccination) => {
  const promise = (resolve, reject) => {
    dao.modifyVaccinationInformation(vaccination)
      .then((vaccination) => resolve(vaccination), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newVaccinationInformation,
  showVaccinationInformation,
  modifyVaccinationInformation,
  deleteVaccinationInformation,
};

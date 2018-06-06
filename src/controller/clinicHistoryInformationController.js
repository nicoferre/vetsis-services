const dao = require('../dao/mongoDBDao');

const newClinicHistoryInformation = (clinicHistoryInformation) => {
  const promise = (resolve, reject) => {
    dao.newClinicHistoryInformation(clinicHistoryInformation)
      .then((clinicHistoryInformation) => resolve(clinicHistoryInformation), err => reject(err));
  };
  return new Promise(promise);
};

const showClinicHistoriesInformations = (clinicHistoryId, callbackSuccess) => {
  dao.showClinicHistoriesInformations(clinicHistoryId, callbackSuccess);
};

const deleteClinicHistoryInformation = clinicHistoryInformationId => dao.deleteClinicHistoryInformation(clinicHistoryInformationId);

const modifyClinicHistoryInformation = (clinicHistoryInformation) => {
  const promise = (resolve, reject) => {
    dao.modifyClinicHistoryInformation(clinicHistoryInformation)
      .then((clinicHistoryInformation) => resolve(clinicHistoryInformation), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newClinicHistoryInformation,
  showClinicHistoriesInformations,
  modifyClinicHistoryInformation,
  deleteClinicHistoryInformation,
};

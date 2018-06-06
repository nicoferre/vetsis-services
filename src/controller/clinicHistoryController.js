const dao = require('../dao/mongoDBDao');

const newClinicHistory = (clinicHistory) => {
  const promise = (resolve, reject) => {
    dao.newClinicHistory(clinicHistory)
      .then((clinicHistory) => resolve(clinicHistory), err => reject(err));
  };
  return new Promise(promise);
};

const showClinicHistories = (clinicHistoryId, callbackSuccess) => {
  dao.showClinicHistories(clinicHistoryId, callbackSuccess);
};

const deleteClinicHistory = clinicHistoryId => dao.deleteClinicHistory(clinicHistoryId);

const modifyClinicHistory = (clinicHistory) => {
  const promise = (resolve, reject) => {
    dao.modifyClinicHistory(clinicHistory)
      .then((clinicHistory) => resolve(clinicHistory), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newClinicHistory,
  showClinicHistories,
  modifyClinicHistory,
  deleteClinicHistory,
};

const clinicHistoryInformationController = require('../controller/clinicHistoryInformationController');

const newClinicHistoryInformation = (req, res) => {
  const content = req.body;
  clinicHistoryInformationController.newClinicHistoryInformation(content)
    .then((clinicHistoryInformation) => {
      res.status(200)
        .send(clinicHistoryInformation);
    }, (err) => {
      res.status(err.code)
        .send({
          error: {
            code: err.code,
            message: err.message,
          },
        });
    });
};

const showClinicHistoriesInformations = (req, res) => {
  const clinicHistoryId = req.headers.id;
  let callbackSuccess = function callbackSuccess(clinicHistoryInformation) {
    return res.send(clinicHistoryInformation);
  };
  clinicHistoryInformationController.showClinicHistoriesInformations(clinicHistoryId, callbackSuccess);
};

const deleteClinicHistoryInformation = (req, res) => {
  const clinicHistoryId = req.headers.id;
  const success = (data) => {
    if (data === 0) {
      const error = {
        error: {
          code: 404,
          message: 'No provider found with that name.',
        },
      };
      return res.status(404)
        .send(error);
    } else {
      res.status(204)
        .send();
    }
  };

  const error = () => {
    const error = {
      error: {
        code: 500,
        message: 'Internal Server Error.',
      },
    };
    return res.status(500)
      .send(error);
  };

  clinicHistoryInformationController
    .deleteClinicHistoryInformation(clinicHistoryInformationId)
    .then(success, error);
};

const modifyClinicHistoryInformation = (req, res) => {
  const content = req.body;
  clinicHistoryInformationController.modifyClinicHistoryInformation(content)
    .then((clinicHistoryInformation) => {
      res.status(200)
        .send(clinicHistoryInformation);
    }, (err) => {
      res.status(err.code)
        .send({
          error: {
            code: err.code,
            message: err.message,
          },
        });
    });
};

module.exports = {
  newClinicHistoryInformation,
  deleteClinicHistoryInformation,
  modifyClinicHistoryInformation,
  showClinicHistoriesInformations,
};

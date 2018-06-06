const clinicHistoryController = require('../controller/clinicHistoryController');

const newClinicHistory = (req, res) => {
  const content = req.body;
  clinicHistoryController.newClinicHistory(content)
    .then((clinicHistory) => {
      res.status(200)
        .send(clinicHistory);
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

const showClinicHistories = (req, res) => {
  const clinicHistoryId = req.headers.history_id;
  let callbackSuccess = function callbackSuccess(clinicHistories) {
    return res.send(clinicHistories);
  };
  clinicHistoryController.showClinicHistories(clinicHistoryId, callbackSuccess);
};

const deleteClinicHistory = (req, res) => {
  const clinicHistoryId = req.headers.history_id;
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

  clinicHistoryController
    .deleteClinicHistory(clinicHistoryId)
    .then(success, error);
};

const modifyClinicHistory = (req, res) => {
  const content = req.body;
  clinicHistoryController.modifyClinicHistory(content)
    .then((clinicHistory) => {
      res.status(200)
        .send(clinicHistory);
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
  newClinicHistory,
  deleteClinicHistory,
  modifyClinicHistory,
  showClinicHistories,
};

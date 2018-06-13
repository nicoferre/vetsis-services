const vaccinationInformationController = require('../controller/vaccinationInformationController');

const newVaccinationInformation = (req, res) => {
  const content = req.body;
  vaccinationInformationController.newVaccinationInformation(content)
    .then((vaccination) => {
      res.status(200)
        .send(vaccination);
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

const showVaccinationInformation = (req, res) => {
  const vaccinationId = req.headers.id;
  let callbackSuccess = function callbackSuccess(species) {
    return res.send(species);
  };
  vaccinationInformationController.showVaccinationInformation(vaccinationId, callbackSuccess);
};

const deleteVaccinationInformation = (req, res) => {
  const vaccinationId = req.headers.id;
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

  vaccinationInformationController
    .deleteVaccinationInformation(vaccinationId)
    .then(success, error);
};

const modifyVaccinationInformation = (req, res) => {
  const content = req.body;
  vaccinationInformationController.modifyVaccinationInformation(content)
    .then((vaccination) => {
      res.status(200)
        .send(vaccination);
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
  newVaccinationInformation,
  deleteVaccinationInformation,
  modifyVaccinationInformation,
  showVaccinationInformation,
};

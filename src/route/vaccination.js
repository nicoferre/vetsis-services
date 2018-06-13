const vaccinationController = require('../controller/vaccinationController');

const newVaccination = (req, res) => {
  const content = req.body;
  vaccinationController.newVaccination(content)
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

const showVaccination = (req, res) => {
  const petId = req.headers.pet_id;
  console.info(petId);
  let callbackSuccess = function callbackSuccess(species) {
    return res.send(species);
  };
  vaccinationController.showVaccination(petId, callbackSuccess);
};

const deleteVaccination = (req, res) => {
  const vaccinationId = req.headers.vaccination_id;
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

  vaccinationController
    .deleteVaccination(vaccinationId)
    .then(success, error);
};

const modifyVaccination = (req, res) => {
  const content = req.body;
  vaccinationController.modifyVaccination(content)
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
  newVaccination,
  deleteVaccination,
  modifyVaccination,
  showVaccination,
};

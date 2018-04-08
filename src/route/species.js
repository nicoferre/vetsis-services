const speciesController = require('../controller/speciesController');

const newSpecies = (req, res) => {
  const content = req.body;
  speciesController.newSpecies(content)
    .then((species) => {
      res.status(200)
        .send(species);
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

const showSpecies = (req, res) => {
  let callbackSuccess = function callbackSuccess(categories) {
    return res.send(categories);
  };
  speciesController.showSpecies(callbackSuccess);
};

const deleteSpecies = (req, res) => {
  const speciesId = req.headers.species_id;
  console.info(speciesId);
  const success = (data) => {
    console.info(data);
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

  speciesController
    .deleteSpecies(speciesId)
    .then(success, error);
};

const modifySpecies = (req, res) => {
  const content = req.body;
  speciesController.modifySpecies(content)
    .then((species) => {
      res.status(200)
        .send(species);
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
  newSpecies,
  deleteSpecies,
  modifySpecies,
  showSpecies,
};

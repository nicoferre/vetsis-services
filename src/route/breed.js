const breedController = require('../controller/breedController');

const newBreed = (req, res) => {
  const content = req.body;
  breedController.newBreed(content)
    .then((breed) => {
      res.status(200)
        .send(breed);
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

const showBreed = (req, res) => {
  const speciesId = req.headers.species_id;
  let callbackSuccess = function callbackSuccess(species) {
    return res.send(species);
  };
  breedController.showBreed(speciesId, callbackSuccess);
};

const deleteBreed = (req, res) => {
  const breedId = req.headers.breed_id;
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

  breedController
    .deleteBreed(breedId)
    .then(success, error);
};

const modifyBreed = (req, res) => {
  const content = req.body;
  breedController.modifyBreed(content)
    .then((breed) => {
      res.status(200)
        .send(breed);
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
  newBreed,
  deleteBreed,
  modifyBreed,
  showBreed,
};

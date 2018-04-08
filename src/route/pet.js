const petController = require('../controller/petController');

const newPet = (req, res) => {
  const content = req.body;
  petController.newPet(content)
    .then((pet) => {
      res.status(200)
        .send(pet);
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

const showPets = (req, res) => {
  let callbackSuccess = function callbackSuccess(pets) {
    return res.send(pets);
  };
  petController.showPets(callbackSuccess);
};

const lastId = (req, res) => {
  let callbackSuccess = function callbackSuccess(pets) {
    return res.sendStatus(pets);
  };
  petController.lastId(callbackSuccess);
};

const deletePet = (req, res) => {
  const petId = req.headers.pet_id;
  console.info(petId);
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

  petController
    .deletePet(petId)
    .then(success, error);
};

const modifyPet = (req, res) => {
  const content = req.body;
  petController.modifyPet(content)
    .then((pet) => {
      res.status(200)
        .send(pet);
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
  newPet,
  deletePet,
  modifyPet,
  showPets,
  lastId,
};

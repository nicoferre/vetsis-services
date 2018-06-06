const locationController = require('../controller/locationController');

const newLocation = (req, res) => {
  const content = req.body;
  locationController.newLocation(content)
    .then((user) => {
      res.status(201)
        .send(user);
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

const showLocations = (req, res) => {
  let callbackSuccess = function callbackSuccess(users) {
    return res.send(users);
  };
  locationController.showLocations(callbackSuccess);
};

module.exports = {
  newLocation,
  showLocations,
};

const vetsisController = require('../controller/vetsis');

const availableCustomers = (req, res) => {
  const error = () => {
    const error = {
      error: {
        code: 500,
        message: 'Internal Server Error.',
      },
    };
    return res.status(500).send(error);
  };

  const success = (data) => {
    res.send(data)
  };
  vetsisController.availableCustomersController().then(success, error);
}

const newCustomer = (req, res) => {
  const content = req.body;
  vetsisController.newCustomerController(content).then(() => {
    res.status(201).send();
  }, (err) => {
    res.status(err.code).send({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  });
}

module.exports = {
  availableCustomers,
  newCustomer,
};

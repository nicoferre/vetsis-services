const vetsisController = require('../controller/customerController');

const newCustomer = (req, res) => {
  const content = req.body;
  vetsisController.newCustomerController(content)
    .then(() => {
      res.status(201)
        .send();
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

const modifyCustomer = (req, res) => {
  const content = req.body;
  vetsisController.modifyCustomerController(content)
    .then(() => {
      res.status(201)
        .send();
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

const showCustomer = (req, res) => {
  const customerId = req.headers.customer_id;
  let callbackSuccess = function callbackSuccess(customers) {
    return res.send(customers);
  };
  vetsisController.showCustomerController(customerId, callbackSuccess);
};

const deleteCustomer = (req, res) => {
  const customerId = req.headers.customer_id;

  const success = (data) => {
    if (data === 0) {
      const error = {
        error: {
          code: 404,
          message: 'No customer found with that name.',
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

  vetsisController
    .deleteCustomerController(customerId)
    .then(success, error);
};

module.exports = {
  newCustomer ,
  deleteCustomer,
  modifyCustomer,
  showCustomer
};

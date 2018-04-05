const customerController = require('../controller/customerController');

const newCustomer = (req, res) => {
  const content = req.body;
  customerController.newCustomerController(content)
    .then((customer) => {
      res.status(200)
        .send(customer);
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
  customerController.modifyCustomerController(content)
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
  customerController.showCustomerController(customerId, callbackSuccess);
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

  customerController
    .deleteCustomerController(customerId)
    .then(success, error);
};

module.exports = {
  newCustomer,
  deleteCustomer,
  modifyCustomer,
  showCustomer
};

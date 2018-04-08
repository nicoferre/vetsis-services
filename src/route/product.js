const productController = require('../controller/productController');

const newProduct = (req, res) => {
  const content = req.body;
  productController.newProduct(content)
    .then((product) => {
      res.status(200)
        .send(product);
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

const showProducts = (req, res) => {
  let callbackSuccess = function callbackSuccess(categories) {
    return res.send(categories);
  };
  productController.showProducts(callbackSuccess);
};

const deleteProduct = (req, res) => {
  const productId = req.headers.product_id;
  console.info(productId);
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
      .send(error)
  };

  productController
    .deleteProduct(productId)
    .then(success, error);
};

const modifyProduct = (req, res) => {
  const content = req.body;
  productController.modifyProduct(content)
    .then((product) => {
      res.status(200)
        .send(product);
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
  newProduct,
  deleteProduct,
  modifyProduct,
  showProducts,
};

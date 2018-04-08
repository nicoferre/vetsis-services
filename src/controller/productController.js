const dao = require('../dao/mongoDBDao');

const newProduct = (product) => {
  const promise = (resolve, reject) => {
    dao.newProduct(product)
      .then((product) => resolve(product), err => reject(err));
  };
  return new Promise(promise);
};

const showProducts = (callbackSuccess) => {
  dao.showProducts(callbackSuccess);
};

const deleteProduct = productId => dao.deleteProduct(productId);

const modifyProduct = (product) => {
  const promise = (resolve, reject) => {
    dao.modifyProduct(product)
      .then((product) => resolve(product), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newProduct,
  deleteProduct,
  modifyProduct,
  showProducts,
};

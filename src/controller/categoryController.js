const dao = require('../dao/mongoDBDao');

const newCategory = (order) => {
  const promise = (resolve, reject) => {
    dao.newCategory(order)
      .then((order) => resolve(order), err => reject(err));
  };
  return new Promise(promise);
};

const showCategories = (callbackSuccess) => {
  dao.showCategories(callbackSuccess);
};

const deleteCategory = categoryId => dao.deleteCategory(categoryId);

const modifyCategory = (category) => {
  const promise = (resolve, reject) => {
    dao.modifyCategory(category)
      .then((category) => resolve(category), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newCategory,
  showCategories,
  modifyCategory,
  deleteCategory,
};

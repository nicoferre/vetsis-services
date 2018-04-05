const categoryController = require('../controller/categoryController');

const newCategory = (req, res) => {
  const content = req.body;
  categoryController.newCategory(content)
    .then((category) => {
      res.status(200)
        .send(category);
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

const showCategories = (req, res) => {
  let callbackSuccess = function callbackSuccess(categories) {
    return res.send(categories);
  };
  categoryController.showCategories(callbackSuccess);
};

const deleteCategory = (req, res) => {
  const categoryId = req.headers.category_id;
  console.info(categoryId);
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

  categoryController
    .deleteCategory(categoryId)
    .then(success, error);
};

const modifyCategory = (req, res) => {
  const content = req.body;
  categoryController.modifyCategory(content)
    .then((category) => {
      res.status(200)
        .send(category);
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
  newCategory,
  deleteCategory,
  modifyCategory,
  showCategories,
};

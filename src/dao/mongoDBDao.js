const console = require('../utils/logger').logger;
const MongoClient = require('mongodb').MongoClient;
const conf = require('../utils/config').configObject.config;

function MongoDBDao() {
  const url = `mongodb://${conf.DB.host}:${conf.DB.port}/${conf.DB.db_name}`;
  let connection;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.error(err);
    }
    connection = db;
  });

  this.loginUser = (user, callback, callbackError) => {
    return new Promise((resolve, reject) => {
      const query = { username: user.username, password: user.password };
      connection.collection('users')
        .find(query)
        .toArray(function (err, result) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 400,
              message: 'Internal Server Error.',
            };
            callbackError(true);
            return reject(error);
          }
          if (Object.keys(result).length === 0) {
            const error = {
              code: 400,
              message: 'Internal Server Error.',
            };
            callbackError(error);
            return reject(error);
          }
          callback(result);
          resolve(true);
        });
    });
  };

  this.storeUser = function (user) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('users').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        user.id = parseInt(res) +1;
        resolve(user);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('users').insertOne(user, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('customer inserted');
          resolve(user);
        });
      });
    });
    return promiseFind;
  };

  this.storeCustomer = function (customer) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('customers').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        customer.id = parseInt(res) +1;
        resolve(customer);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('customers').insertOne(customer, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('customer inserted');
          resolve(customer);
        });
      });
    });
    return promiseFind;
  };

  this.newProvider = function (provider) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('providers').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        provider.id = parseInt(res) +1;
        resolve(true);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('providers').insertOne(provider, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('provider inserted');
          resolve(provider);
        });
      });
    });
    return promiseFind;
  };

  this.newOrder = function (order) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('orders').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        order.id = parseInt(res) +1;
        order.idProvider = parseInt(order.idProvider);
        order.date = new Date();
        resolve(true);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('orders').insertOne(order, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('orders inserted');
          resolve(order);
        });
      });
    });
    return promiseFind;
  };

  this.modifyCustomer = function (customer) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: customer.id };
      connection.collection('customers')
        .updateOne(myQuery, customer, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(customer);
          console.info('Customer in process of update');
        });
    });
  };

  this.deleteOrder = function (orderId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(orderId) };
      connection.collection('orders')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Order in process of delete');
        });
    });
  };

  this.deleteProvider = function (providerId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(providerId) };
      connection.collection('providers')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Provider in process of delete');
        });
    });
  };

  this.deleteCustomer = function (customerId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(customerId) };
      connection.collection('customers')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Customer in process of delete');
        });
    });
  };

  this.showOrders = (callback) => {
    return new Promise((resolve, reject) => {
        connection.collection('orders')
          .aggregate([{ $lookup: { from: 'providers', localField: 'idProvider', foreignField: 'id', as: 'ordersdetails'}}])
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
    });
  };

  this.showProviders = (providerId, callback) => {
    return new Promise((resolve, reject) => {
      if (!providerId) {
        connection.collection('providers')
          .find({})
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
      } else {
        let query = { id: providerId };
        connection.collection('providers')
          .find(query)
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
      }
    });
  };

  this.showCustomer = (customerId, callback) => {
    return new Promise((resolve, reject) => {
      if (!customerId) {
        connection.collection('customers')
          .find({})
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
      } else {
        let query = { id: customerId };
        connection.collection('customers')
          .find(query)
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
      }
    });
  };

  this.deleteCategory = function (categoryId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(categoryId) };
      connection.collection('categories')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Category in process of delete');
        });
    });
  };

  this.newCategory = function (category) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('categories').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        category.id = parseInt(res) +1;
        resolve(true);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('categories').insertOne(category, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('category inserted');
          resolve(category);
        });
      });
    });
    return promiseFind;
  };

  this.showCategories = ( callback) => {
    return new Promise((resolve, reject) => {
        connection.collection('categories')
          .find({})
          .toArray(function (err, result) {
            if (err) {
              console.error(`Error:  ${err}`);
              const error = {
                code: 400,
                message: 'Internal Server Error.',
              };
              return reject(error);
            }
            callback(result);
            resolve(true);
          });
    });
  };

  this.modifyCategory = function (category) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: category.id };
      connection.collection('categories')
        .updateOne(myQuery, category, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(category);
          console.info('Customer in process of update');
        });
    });
  };

  this.modifyProduct = function (product) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: product.id };
      connection.collection('products')
        .updateOne(myQuery, product, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(product);
          console.info('product in process of update');
        });
    });
  };

  this.newProduct = function (product) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('products').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        product.id = parseInt(res) +1;
        resolve(true);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('products').insertOne(product, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('product inserted');
          resolve(product);
        });
      });
    });
    return promiseFind;
  };

  this.showProducts = ( callback) => {
    return new Promise((resolve, reject) => {
      connection.collection('products')
        .aggregate([{ $lookup: { from: 'categories', localField: 'idCategory', foreignField: 'id', as: 'categorydetails'}}])
        .toArray(function (err, result) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 400,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          callback(result);
          resolve(true);
        });
    });
  };

  this.deleteProduct = function (productId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(productId) };
      connection.collection('products')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Product in process of delete');
        });
    });
  }

  this.modifyPet = function (pet) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: pet.id };
      connection.collection('pets')
        .updateOne(myQuery, pet, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(pet);
          console.info('pet in process of update');
        });
    });
  };

  this.newPet = function (pet) {
    const promiseFind = new Promise((resolve, reject) => {
      connection.collection('pets').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        pet.id = parseInt(res) +1;
        resolve(true);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.collection('pets').insertOne(pet, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('pet inserted');
          resolve(pet);
        });
      });
    });
    return promiseFind;
  };

  this.showPets = ( callback) => {
    return new Promise((resolve, reject) => {
      connection.collection('pets')
        .aggregate([{ $lookup: { from: 'customers', localField: 'idCustomer', foreignField: 'id', as: 'customerdetails'}}])
        .toArray(function (err, result) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 400,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          callback(result);
          resolve(true);
        });
    });
  };

  this.lastId = ( callback) => {
    return new Promise((resolve, reject) => {
      connection.collection('pets').count((err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        callback(parseInt(res));
        resolve(true);
      });
    });
  };

  this.deletePet = function (petId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: parseInt(petId) };
      connection.collection('pets')
        .deleteOne(myQuery, (err, res) => {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          resolve(res.deletedCount);
          console.info('Pet in process of delete');
        });
    });
  };
}

const mongoDBDao = new MongoDBDao();

module.exports = mongoDBDao;

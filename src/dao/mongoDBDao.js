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
      console.log(user);
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
    const promise = (resolve, reject) => {
      connection.collection('users')
        .insertOne(user, function (err) {
          if (err) {
            console.error(`Error:  ${err}`);
            const error = {
              code: 500,
              message: 'Internal Server Error.',
            };
            return reject(error);
          }
          console.info('user inserted');
          resolve();
        });
    };
    return new Promise(promise);
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
        resolve(true);
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
          resolve();
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
          resolve();
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
          resolve(res.deletedCount);
          console.info('Customer in process of delete');
        });
    });
  };

  this.deleteCustomer = function (customerId) {
    return new Promise((resolve, reject) => {
      const myQuery = { id: customerId };
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

}

const mongoDBDao = new MongoDBDao();

module.exports = mongoDBDao;

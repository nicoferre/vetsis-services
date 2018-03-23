const console = require('../utils/logger').logger;
const MongoClient = require('mongodb').MongoClient;
const conf = require('../utils/config').configObject.config;
const http = require('http');


function MongoDBDao() {
  const url = `mongodb://${conf.DB.host}:${conf.DB.port}/${conf.DB.db_name}`;
  let connection;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.error(err);
    }
    connection = db;
  });

  this.availableCustomers = () =>{
    const promise = (resolve, reject) => {
      connection.collection('customers').find({}).toArray(function(err, result) {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 400,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        resolve(result);
      });
    }
    return new Promise(promise);
  }

  this.storeCustomer = function (customer) {
    const promise = (resolve, reject) => {
      connection.collection('customers').insertOne(customer, function (err, res) {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 500,
            message: 'Internal Server Error.',
          };
          return reject(error);
        };
        console.info('customer inserted');
        resolve();
      });
    };
    return new Promise(promise);
  };
}

const mongoDBDao = new MongoDBDao();

module.exports = mongoDBDao;

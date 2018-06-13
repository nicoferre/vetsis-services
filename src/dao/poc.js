this.modifyVaccinationInformation = function (vaccinationInformation) {
  return new Promise((resolve, reject) => {
    const myQuery = { id: vaccinationInformation.id };
    connection.collection('vaccinationInformations')
      .updateOne(myQuery, vaccinationInformation, (err, res) => {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 500,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        resolve(vaccinationInformation);
        console.info('vaccinationInformation in process of update');
      });
  });
};

this.newVaccinationInformation = function (vaccinationInformation) {
  const promiseFind = new Promise((resolve, reject) => {
    connection.collection('vaccinationInformations').count((err, res) => {
      if (err) {
        console.error(`Error:  ${err}`);
        const error = {
          code: 400,
          message: 'Internal Server Error.',
        };
        return reject(error);
      }
      vaccinationInformation.id = parseInt(res) +1;
      resolve(true);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      connection.collection('vaccinationInformations').insertOne(vaccinationInformation, function (err) {
        if (err) {
          console.error(`Error:  ${err}`);
          const error = {
            code: 500,
            message: 'Internal Server Error.',
          };
          return reject(error);
        }
        console.info('vaccinationInformation inserted');
        resolve(vaccinationInformation);
      });
    });
  });
  return promiseFind;
};

this.showClinicHistoriesInformations = (vaccinationId, callback) => {
  return new Promise((resolve, reject) => {
    const query = { idVaccination: parseInt(vaccinationId) };
    connection.collection('vaccinationInformations')
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
  });
};

this.deleteVaccinationInformation = function (vaccinationInformationId) {
  return new Promise((resolve, reject) => {
    const myQuery = { id: parseInt(vaccinationInformationId) };
    connection.collection('vaccinationInformations')
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
        console.info('VaccinationInformation in process of delete');
      });
  });
};

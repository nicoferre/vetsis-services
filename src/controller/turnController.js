const dao = require('../dao/mongoDBDao');

const newTurn = (turn) => {
  const promise = (resolve, reject) => {
    dao.newTurn(turn)
      .then((turn) => resolve(turn), err => reject(err));
  };
  return new Promise(promise);
};

const showTurns = (turnId, callbackSuccess) => {
  dao.showTurns(turnId, callbackSuccess);
};

const deleteTurn = turnId => dao.deleteTurn(turnId);

const modifyTurn = (turn) => {
  const promise = (resolve, reject) => {
    dao.modifyTurn(turn)
      .then((turn) => resolve(turn), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  newTurn,
  showTurns,
  modifyTurn,
  deleteTurn,
};

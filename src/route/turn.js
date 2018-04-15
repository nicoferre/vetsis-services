const turnController = require('../controller/turnController');

const newTurn = (req, res) => {
  const content = req.body;
  turnController.newTurn(content)
    .then((turn) => {
      res.status(200)
        .send(turn);
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

const showTurns = (req, res) => {
  const turnId = req.headers.turn_id;
  let callbackSuccess = function callbackSuccess(turn) {
    return res.send(turn);
  };
  turnController.showTurns(turnId, callbackSuccess);
};

const deleteTurn = (req, res) => {
  const turnId = req.headers.turn_id;
  const success = (data) => {
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

  turnController
    .deleteTurn(turnId)
    .then(success, error);
};

const modifyTurn = (req, res) => {
  const content = req.body;
  turnController.modifyTurn(content)
    .then((turn) => {
      res.status(200)
        .send(turn);
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
  newTurn,
  deleteTurn,
  modifyTurn,
  showTurns,
};

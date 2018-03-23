'use strict';

module.exports = {
  apiStatus: apiStatus,
  getIndex: getIndex
};

function apiStatus(req, res) {
  res.json({
    status: "ok"
  });
};

function getIndex(req, res){
	res.sendFile('public/client.html', {root: './'});
};

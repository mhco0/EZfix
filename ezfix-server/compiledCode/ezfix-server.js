"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const database_1 = require("./database");
var ezfixserver = express();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
ezfixserver.use(allowCrossDomain);
ezfixserver.use(bodyParser.json());
ezfixserver.post("/evaluate/:service_id", function (req, res) {
    const service = database_1.db.services.find(el => el.id == Number(req.params.service_id));
    if (service) {
        var evaluation = req.body;
        evaluation = service.evaluate(evaluation);
        if (evaluation) {
            res.send({ "success": "A avaliação foi salva com sucesso" });
            return;
        }
    }
    res.send({ "failure": "A avaliação não pôde ser feita" });
});
var server = ezfixserver.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=ezfix-server.js.map
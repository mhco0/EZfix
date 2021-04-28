"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const database_1 = require("./database");
const users_1 = require("./schemas/users");
const service_1 = require("./schemas/service");
database_1.db.service_providers.push(new users_1.ServiceProvider(1));
database_1.db.services.push(new service_1.Service(1, 1, 1));
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
            res.send({
                "success": "Successfull evaluation",
                "evaluation": evaluation
            });
            return;
        }
    }
    res.send({ "failure": "Error in evaluation" });
});
ezfixserver.get("/listevaluations/:provider_id", function (req, res) {
    const provider = database_1.db.service_providers.find(el => el.id == Number(req.params.provider_id));
    if (provider) {
        const provider_services = database_1.db.services.filter(el => el.service_provider_id == Number(req.params.provider_id));
        if (provider_services) {
            var provider_evaluations = [];
            provider_services.forEach(service => provider_evaluations.push(service.evaluation));
            res.send({
                "success": "Successfull evaluation listing",
                "evaluations": provider_evaluations
            });
            return;
        }
    }
    res.send({ "failure": "Evaluation listing error" });
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
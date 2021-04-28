"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const database_1 = require("./database");
const users_1 = require("./schemas/users");
database_1.db.clients.push(new users_1.Client(1, "Sérgio"));
database_1.db.service_providers.push(new users_1.ServiceProvider(1, "Flávio Cap", "House Cleaning", "https://randomuser.me/api/portraits/men/3.jpg"));
database_1.db.service_providers.push(new users_1.ServiceProvider(2, "Barnabé Cap", "House Cleaning", "https://randomuser.me/api/portraits/men/29.jpg"));
database_1.db.service_providers.push(new users_1.ServiceProvider(3, "Joana Cap", "House Cleaning", "https://randomuser.me/api/portraits/women/2.jpg"));
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
ezfixserver.get("/listcoments/:provider_id", function (req, res) {
    const provider = database_1.db.service_providers.find(el => el.id == Number(req.params.provider_id));
    if (provider) {
        const provider_services = database_1.db.services.filter(el => el.service_provider_id == Number(req.params.provider_id));
        if (provider_services) {
            class Coment {
            }
            var provider_coments = [];
            provider_services.forEach(service => {
                if (service.evaluation) {
                    provider_coments.push({
                        "client_name": database_1.db.clients.find(el => el.id == service.evaluation.evaluator_id).first_name,
                        "coment": service.evaluation.coment
                    });
                }
            });
            res.send({
                "success": "Successfull evaluation listing",
                "coments": provider_coments
            });
            return;
        }
    }
    res.send({ "failure": "Evaluation listing error" });
});
ezfixserver.post("/service/:provider_id", function (req, res) {
    const provider = database_1.db.service_providers.find(el => el.id == Number(req.params.provider_id));
    const service_id = database_1.db.services.length + 1;
    if (provider) {
        var service = req.body;
        service.id = service_id;
        console.log(service);
        database_1.db.services.push(service);
        res.send({
            "success": "Successfull service create",
            "service": service
        });
        return;
    }
    res.send({ "failure": "Error in create service" });
});
ezfixserver.get("/listcontracts/:client_id", function (req, res) {
    const client = database_1.db.clients.find(el => el.id == Number(req.params.client_id));
    console.log(client);
    if (client) {
        const client_services = database_1.db.services.filter(el => el.client_id == Number(req.params.client_id));
        if (client_services) {
            class Contract {
            }
            var contracts = [];
            client_services.forEach(service => {
                var provider = database_1.db.service_providers.find(el => el.id == service.service_provider_id);
                contracts.push({
                    "provider_name": provider.name,
                    "provider_avatar_url": provider.avatar_url,
                    "provider_category": provider.category,
                    "paymentStatus": service.payment_status,
                    "paymentOnline": service.payment_online
                });
            });
            res.send({
                "success": "Successfull contracts listing",
                "contracts": contracts
            });
            return;
        }
    }
    res.send({ "failure": "Contracts listing error" });
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
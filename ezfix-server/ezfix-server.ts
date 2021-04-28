import express = require('express');
import bodyParser = require("body-parser");
import { Evaluation } from "./schemas/evaluation";

import { db } from "./database"
import { Client, ServiceProvider } from './schemas/users';
import { Service } from './schemas/service';

db.clients.push(new Client(1, "Sérgio"))
db.service_providers.push(new ServiceProvider(1, "Flávio Cap", "House Cleaning", "https://randomuser.me/api/portraits/men/3.jpg"))
db.service_providers.push(new ServiceProvider(2, "Barnabé Cap", "House Cleaning", "https://randomuser.me/api/portraits/men/29.jpg"))
db.service_providers.push(new ServiceProvider(3, "Joana Cap", "House Cleaning", "https://randomuser.me/api/portraits/women/2.jpg"))

var ezfixserver = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
ezfixserver.use(allowCrossDomain);

ezfixserver.use(bodyParser.json());

ezfixserver.post("/evaluate/:service_id", function (req: express.Request, res: express.Response) {
    const service = db.services.find(el => el.id == Number(req.params.service_id));

    if (service) {
        var evaluation: Evaluation = <Evaluation>req.body;

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
})

ezfixserver.get("/listcoments/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));

    if (provider) {
        const provider_services = db.services.filter(el => el.service_provider_id == Number(req.params.provider_id));

        if (provider_services) {
            class Coment {
                client_name: string;
                coment: string;
            }
            var provider_coments: Array<Coment> = []

            provider_services.forEach(service => {
                if (service.evaluation) {
                    provider_coments.push({
                        "client_name": db.clients.find(el => el.id == service.evaluation.evaluator_id).first_name,
                        "coment": service.evaluation.coment
                    })
                }
            })

            res.send({
                "success": "Successfull evaluation listing",
                "coments": provider_coments
            });

            return;
        }
    }

    res.send({ "failure": "Evaluation listing error" });
})

ezfixserver.post("/service/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));
    const service_id = db.services.length + 1;

    if (provider) {
        var service: Service = <Service>req.body;
        service.id = service_id;
        console.log(service);

        db.services.push(service);

        res.send({
            "success": "Successfull service create",
            "service": service
        });

        return;

    }

    res.send({ "failure": "Error in create service" });
})

ezfixserver.get("/listcontracts/:client_id", function (req: express.Request, res: express.Response) {
    const client = db.clients.find(el => el.id == Number(req.params.client_id));

    if (client) {
        const client_services = db.services.filter(el => el.client_id == Number(req.params.client_id));

        if (client_services) {
            class Contract {
                provider_name: string;
                provider_avatar_url: string;
                provider_category: string;
                paymentStatus: Boolean;
                paymentOnline: Boolean;
            }
            var contracts: Array<Contract> = []

            client_services.forEach(service => {
                var provider = db.service_providers.find(el => el.id == service.service_provider_id);
                contracts.push({
                    "provider_name": provider.name,
                    "provider_avatar_url": provider.avatar_url,
                    "provider_category": provider.category,
                    "paymentStatus": service.payment_status,
                    "paymentOnline": service.payment_online
                })
            })

            res.send({
                "success": "Successfull contracts listing",
                "contracts": contracts
            });

            return;
        }
    }

    res.send({ "failure": "Contracts listing error" });
})

var server = ezfixserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
    server.close();
}

export { server, closeServer }
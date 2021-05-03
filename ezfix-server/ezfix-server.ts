import express = require('express');
import bodyParser = require("body-parser");
import { Evaluation } from "./schemas/evaluation";

import { db } from "./database"
import { Client, ServiceProvider } from './schemas/users';
import { Service } from './schemas/service';
import { Card } from "./schemas/card";

//Adicionando o cliente
db.clients.push(new Client(1, "Sérgio"))
db.service_providers.push(new ServiceProvider(
    1,
    "Flávio",
    "Playboy",
    "Hi, as you already know my name is Flavio and I would love to help you! I have more than 5 years of experience in house cleaning. For me, nothing is more satisfiying then a good smelling bathroom. Fun fact, I am a architecture student and a use every money that I earn here to support my studies.",
    "House Cleaning",
    "https://randomuser.me/api/portraits/men/4.jpg"
));

db.service_providers.push(new ServiceProvider(2, "Flávio", "Cap", "I'm Good", "House Cleaning", "https://randomuser.me/api/portraits/men/3.jpg"))
db.service_providers.push(new ServiceProvider(3, "Barnabé", "Cap", "I'm better", "House Cleaning", "https://randomuser.me/api/portraits/men/29.jpg"))
db.service_providers.push(new ServiceProvider(4, "Joana", "Cap", "I'm way better", "House Cleaning", "https://randomuser.me/api/portraits/women/2.jpg"))
db.service_providers.push(new ServiceProvider(5, "Maria", "Bonita", "I'm way even better", "Eletric Repair", "https://randomuser.me/api/portraits/women/7.jpg"))
db.service_providers.push(new ServiceProvider(6, "Davi", "Notorius", "I'm way more expensive", "Plumbing", "https://randomuser.me/api/portraits/men/25.jpg"))

db.cards.push(new Card("Sergio Soares", "1111222233334444", "101", 11, 2025))
db.cards.push(new Card("Sergio Soares", "2222333344445555", "202", 11, 2025))
db.cards.push(new Card("Sergio Soares", "1234123412341234", "303", 11, 2025))
db.cards.push(new Card("Thalisson Tavares", "3333444455556666", "404", 11, 2025))
db.cards.push(new Card("Gabriel Marques", "4444555566667777", "505", 11, 2025))
db.cards.push(new Card("Luis Pereira", "5555666677778888", "606", 11, 2025))
db.cards.push(new Card("Marcos Heitor", "6666777788889999", "707", 11, 2025))

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
            const provider = db.service_providers.find(el => el.id == service.service_provider_id);

            if (provider) {
                const new_grade = (evaluation.attendance_rating + evaluation.punctuality_rating + evaluation.service_quality_rating) / 3;
                provider.update_evaluation_average(new_grade);

                res.status(200).send({
                    "success": "Successful evaluation",
                    "evaluation": evaluation
                });

                return;
            }
        }
    }
    res.status(400).send({ "failure": "Error in evaluation" });
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

            res.status(200).send({
                "success": "Successful evaluation listing",
                "coments": provider_coments
            });

            return;
        }
    }
    res.status(400).send({ "failure": "Evaluation listing error" });
})

ezfixserver.get("/provider/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));

    if (provider) {
        res.status(200).send({
            "success": "Successful provider getting",
            "provider": provider
        });

        return;
    }

    res.status(400).send({ "failure": "Provider getting error" });

})

function findElementById(elements: Array<any>, id: number) {
    return elements.find(el => el.id == id)
}

ezfixserver.post("/service/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = findElementById(db.service_providers, Number(req.params.provider_id));
    const service_id = db.services.length + 1;

    if (provider) {
        var service: Service = <Service>req.body;
        service.id = service_id;

        db.services.push(new Service(
            service_id,
            service.client_id,
            service.service_provider_id,
            service.payment_status,
            service.payment_online
        ));

        res.send({ "success": "Successful service create" });

        return;

    }

    res.send({ "failure": "Error in create service" });
})

ezfixserver.post("/updateservice/:service_id", function (req: express.Request, res: express.Response) {
    const service = findElementById(db.services, Number(req.params.service_id));

    if (service) {
        var payment_status = <Boolean>req.body['payment_status'];
        var payment_online = <Boolean>req.body['payment_online'];

        service.updatePaymentStatus(payment_status);
        service.updatePaymentForm(payment_online);

        res.send({ "success": "Successful service update" });

        return;


    }
    res.send({ "failure": "Error updating service" });
})

ezfixserver.get("/listcontracts/:client_id", function (req: express.Request, res: express.Response) {
    const client = findElementById(db.clients, Number(req.params.client_id));

    if (client) {
        const client_services = db.services.filter(el => el.client_id == Number(req.params.client_id));

        if (client_services) {
            class Contract {
                id: number;
                provider_id: number;
                provider_name: string;
                provider_avatar_url: string;
                provider_category: string;
                paymentStatus: Boolean;
                paymentOnline: Boolean;
                has_evaluation: Boolean;
            }
            var contracts: Array<Contract> = []

            client_services.forEach(service => {
                var provider = findElementById(db.service_providers, service.service_provider_id);
                contracts.push({
                    "id": service.id,
                    "provider_id": provider.id,
                    "provider_name": provider.first_name + " " + provider.last_name,
                    "provider_avatar_url": provider.avatar_url,
                    "provider_category": provider.category,
                    "paymentStatus": service.payment_status,
                    "paymentOnline": service.payment_online,
                    "has_evaluation": service.evaluation != undefined
                })
            })
            res.send(JSON.stringify(contracts));

            return;
        }
    }
    res.send({ "failure": "Contracts listing error" });
})

ezfixserver.post("/payment/:client_id", function (req: express.Request, res: express.Response) {
    const client = findElementById(db.clients, Number(req.params.client_id));

    if (client) {
        var card: Card = <Card>req.body["card"];
        var match = db.cards.find(el => client.checkCardMatch(el, card));

        if (match) {

            if (req.body["saveCard"]) {
                client.saveCard(card);
            }

            res.status(200).send({
                "success": "Successful payment",
            });

            return;
        }
    }
    res.send({ "failure": "Payment error" });
})

ezfixserver.get("/cardslist/:client_id", function (req: express.Request, res: express.Response) {
    const client = findElementById(db.clients, Number(req.params.client_id));

    if (client) {
        var cards = client.cards;

        if (cards) {
            res.send(JSON.stringify(cards));

            return;
        }
    }
    res.send({ "failure": "Get cards list error" });
})

ezfixserver.get("/search/:category", function (req: express.Request, res: express.Response) {
    const providerList = db.service_providers.filter((provider) => provider.category.includes(req.params.category))
    res.send(JSON.stringify(providerList));
    return;
})

var server = ezfixserver.listen(3000, function () {
    console.log('EZfix app listening on port 3000!')
})

function closeServer(): void {
    server.close();
}

export { server, closeServer }
import express = require('express');
import bodyParser = require("body-parser");
import {Evaluation} from "./schemas/evaluation";

import {db} from "./database"
import { Client, ServiceProvider } from './schemas/users';
import { Service } from './schemas/service';

db.clients.push(new Client(1, "Flávio Playboy"))
db.service_providers.push(new ServiceProvider(1))
db.services.push(new Service(1, 1, 1)); // Apenas para fins de teste

var ezfixserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
ezfixserver.use(allowCrossDomain);

ezfixserver.use(bodyParser.json());

ezfixserver.post("/evaluate/:service_id", function (req: express.Request, res: express.Response) {
    const service = db.services.find(el => el.id == Number(req.params.service_id));

    if(service){
        var evaluation: Evaluation = <Evaluation> req.body;

        evaluation = service.evaluate(evaluation);
    
        if(evaluation){
            res.send({
                "success": "Successfull evaluation",
                "evaluation": evaluation
            });

            return;
        }
    }

    res.send({"failure": "Error in evaluation"});
})

ezfixserver.get("/listcoments/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));

    if(provider){
        const provider_services = db.services.filter(el => el.service_provider_id == Number(req.params.provider_id));

        if(provider_services){
            class Coment{
                client_name: string;
                coment: string;
            }
            var provider_coments:Array<Coment> = []

            provider_services.forEach(service => {
                provider_coments.push({
                    "client_name": db.clients.find(el => el.id == service.evaluation.evaluator_id).first_name,
                    "coment": service.evaluation.coment
                })
            })

            res.send({
                "success": "Successfull evaluation listing",
                "evaluations": provider_coments
            });

            return;
        }
    }

    res.send({"failure": "Evaluation listing error"});
})

var server = ezfixserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }
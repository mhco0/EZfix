import express = require('express');
import bodyParser = require("body-parser");
import {Evaluation} from "./schemas/evaluation";

import {db} from "./database"
import { Client, ServiceProvider } from './schemas/users';
import { Service } from './schemas/service';

//Adicionando o cliente
db.clients.push(new Client(1, "Sérgio"))

//Adicionando os providers
db.service_providers.push(new ServiceProvider(
    1, 
    "Flávio", 
    "Playboy", 
    "Hi, as you already know my name is Flavio and I would love to help you! I have more than 5 years of experience in house cleaning. For me, nothing is more satisfiying then a good smelling bathroom. Fun fact, I am a architecture student and a use every money that I earn here to support my studies.",
    "http://img.ibxk.com.br/2015/08/27/27151624778422.jpg?w=1040"
));


db.services.push(new Service(1, 1, 1)); //Apenas para fins de teste

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
            const provider = db.service_providers.find(el => el.id == service.service_provider_id);

            if(provider){
                const new_grade = (evaluation.attendance_rating + evaluation.punctuality_rating + evaluation.service_quality_rating) / 3;
                provider.update_evaluation_average(new_grade);

                res.status(200).send({
                    "success": "Successfull evaluation",
                    "evaluation": evaluation
                });
    
                return;
            }
        }
    }

    res.status(400).send({"failure": "Error in evaluation"});
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
                if(service.evaluation){
                    provider_coments.push({
                        "client_name": db.clients.find(el => el.id == service.evaluation.evaluator_id).first_name,
                        "coment": service.evaluation.coment
                    })
                }
            })

            res.status(200).send({
                "success": "Successfull evaluation listing",
                "coments": provider_coments
            });

            return;
        }
    }

    res.status(400).send({"failure": "Evaluation listing error"});
})

ezfixserver.get("/provider/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));

    if(provider){
        res.status(200).send({
            "success": "Successfull provider getting",
            "provider": provider
        });
    }

    res.status(400).send({"failure": "Provider getting error"});
})

var server = ezfixserver.listen(3000, function () {
    console.log('EZfix app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }
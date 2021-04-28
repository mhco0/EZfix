import express = require('express');
import bodyParser = require("body-parser");
import {Evaluation} from "./schemas/evaluation";

import {db} from "./database"
import { ServiceProvider } from './schemas/users';
import { Service } from './schemas/service';

db.service_providers.push(new ServiceProvider(1))
db.services.push(new Service(1, 1, 1));

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

ezfixserver.get("/listevaluations/:provider_id", function (req: express.Request, res: express.Response) {
    const provider = db.service_providers.find(el => el.id == Number(req.params.provider_id));

    if(provider){
        const provider_services = db.services.filter(el => el.service_provider_id == Number(req.params.provider_id));

        if(provider_services){
            var provider_evaluations:Array<Evaluation> = []

            provider_services.forEach(service => provider_evaluations.push(service.evaluation))

            res.send({
                "success": "Successfull evaluation listing",
                "evaluations": provider_evaluations
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
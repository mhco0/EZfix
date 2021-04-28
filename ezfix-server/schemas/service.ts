import {Evaluation} from "./evaluation"
import {Chat} from "./chat"

enum PaymentForm {
    Online = "online",
    Present = "present"
}

export class Service {
    id: number;
    client_id: number;
    service_provider_id: number;
    evaluation?: Evaluation;
    chat?: Chat;
    payment_status: Boolean = false;
    payment_form: PaymentForm = PaymentForm.Online;

    constructor(id:number, client_id:number, service_provider_id:number) {
        this.id = id;
        this.client_id = client_id;
        this.service_provider_id = service_provider_id;
    }

    evaluate(evaluation:Evaluation): Evaluation {
        if(this.evaluation) return null

        this.evaluation = evaluation

        return this.evaluation
    }
}
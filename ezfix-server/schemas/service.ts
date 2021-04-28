import { Evaluation } from "./evaluation"
import { Chat } from "./chat"

export class Service {
    id: number;
    client_id: number;
    service_provider_id: number;
    evaluation?: Evaluation;
    chat?: Chat;
    payment_status: Boolean = false;
    payment_online: Boolean = false;

    constructor(id: number, client_id: number, service_provider_id: number, payment_status: Boolean, payment_online: Boolean) {
        this.id = id;
        this.client_id = client_id;
        this.service_provider_id = service_provider_id;
        this.payment_status = payment_status;
        this.payment_online = payment_online;
    }

    evaluate(evaluation: Evaluation): Evaluation {
        if (this.evaluation) return null

        this.evaluation = evaluation

        return this.evaluation
    }
}
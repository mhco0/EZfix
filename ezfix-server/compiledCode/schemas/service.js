"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(id, client_id, service_provider_id, payment_status, payment_online) {
        this.payment_status = false;
        this.payment_online = false;
        this.id = id;
        this.client_id = client_id;
        this.service_provider_id = service_provider_id;
        this.payment_status = payment_status;
        this.payment_online = payment_online;
    }
    evaluate(evaluation) {
        if (this.evaluation)
            return null;
        this.evaluation = evaluation;
        return this.evaluation;
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map
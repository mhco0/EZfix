"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var PaymentForm;
(function (PaymentForm) {
    PaymentForm["Online"] = "online";
    PaymentForm["Present"] = "present";
})(PaymentForm || (PaymentForm = {}));
class Service {
    constructor(id, client_id, service_provider_id) {
        this.payment_status = false;
        this.payment_form = PaymentForm.Online;
        this.id = id;
        this.client_id = client_id;
        this.service_provider_id = service_provider_id;
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
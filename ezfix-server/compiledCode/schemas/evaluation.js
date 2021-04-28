"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluation = void 0;
class Evaluation {
    constructor(evaluator_id, attendance_rating, punctuality_rating, service_quality_rating, ezfix_rating, coment) {
        this.evaluator_id = evaluator_id,
            this.attendance_rating = attendance_rating;
        this.punctuality_rating = punctuality_rating;
        this.service_quality_rating = service_quality_rating;
        this.ezfix_rating = ezfix_rating;
        if (coment)
            this.coment = coment;
    }
}
exports.Evaluation = Evaluation;
//# sourceMappingURL=evaluation.js.map
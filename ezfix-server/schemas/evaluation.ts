export class Evaluation {
    evaluator_id: number;
    attendance_rating: number;
    punctuality_rating: number;
    service_quality_rating: number;
    ezfix_rating: number;
    coment?: string

    constructor(
        evaluator_id: number,
        attendance_rating: number, 
        punctuality_rating: number, 
        service_quality_rating: number, 
        ezfix_rating: number,
        coment?: string
    ) {
        this.evaluator_id = evaluator_id,
        this.attendance_rating = attendance_rating;
        this.punctuality_rating = punctuality_rating;
        this.service_quality_rating = service_quality_rating;
        this.ezfix_rating = ezfix_rating;
        if(coment) this.coment = coment;
    }
}
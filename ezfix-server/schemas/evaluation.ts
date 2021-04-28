export class Evaluation {
    attendance_rating: number;
    punctuality_rating: number;
    service_quality_rating: number;
    ezfix_rating: number;

    constructor(
        attendance_rating: number, 
        punctuality_rating: number, 
        service_quality_rating: number, 
        ezfix_rating: number
    ) {
        this.attendance_rating = attendance_rating;
        this.punctuality_rating = punctuality_rating;
        this.service_quality_rating = service_quality_rating;
        this.ezfix_rating = ezfix_rating;
    }
}
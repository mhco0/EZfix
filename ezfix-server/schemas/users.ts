export class Client {
    id: number;
    first_name: string;

    constructor(id: number, first_name: string) {
        this.id = id;
        this.first_name = first_name;
    }
}

export class ServiceProvider {
    id: number
    first_name: string;
    last_name: string;
    avatar_url?: string;
    description: string;
    evaluations_average: number;
    jobs_number: number;
    category: string;

    constructor(id: number, first_name: string, last_name: string, description: string, category: string, avatar_url?: string,) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.description = description;
        this.category = category;
        if(avatar_url) this.avatar_url = avatar_url;

        this.evaluations_average = 5.0;
        this.jobs_number = 0;
    }

    update_evaluation_average(new_grade: number){
        this.evaluations_average = (this.evaluations_average + new_grade)/2;
    }

    increase_jobs_number(){
        this.jobs_number++;
    }
}
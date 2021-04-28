export class Client {
    id: number;
    first_name: string;

    constructor(id: number, first_name: string){
        this.id = id;
        this.first_name = first_name;
    }
}

export class ServiceProvider {
    id: number

    constructor(id: number) {
        this.id = id;
    }
}
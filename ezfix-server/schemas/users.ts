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
    name: string;
    category: string;
    avatar_url: string;

    constructor(id: number, name: string, category: string, avatar_url: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.avatar_url = avatar_url;
    }
}
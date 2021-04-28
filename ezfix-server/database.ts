import {Client, ServiceProvider} from "./schemas/users"
import {Service} from "./schemas/service";

class Database {
    clients: Array<Client> = [];

    service_providers: Array<ServiceProvider> = [];

    services: Array<Service> = [];
}

export var db = new Database();
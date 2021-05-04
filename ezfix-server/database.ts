import { Client, ServiceProvider } from "./schemas/users"
import { Service } from "./schemas/service";
import { Card } from "./schemas/card";

class Database {
    clients: Array<Client> = [];

    service_providers: Array<ServiceProvider> = [];

    services: Array<Service> = [];

    cards: Array<Card> = [];
}

export var db = new Database();
import { Client, ServiceProvider } from "./schemas/users"
import { Service } from "./schemas/service";
import { Card } from "./schemas/card";

class Database {
    private clients: Array<Client> = [];

    private service_providers: Array<ServiceProvider> = [];

    private services: Array<Service> = [];

    private cards: Array<Card> = [];

    create (type: "clients" | "service_providers" | "services" | "cards", value: any) {
        try{
            if (type == "clients"){
                this.clients.push(value);
            }
            else if (type == "service_providers"){
                this.service_providers.push(value);
            }
            else if (type == "services"){
                this.services.push(value);
            }
            else if(type == "cards"){
                this.cards.push(value);
            }
        }
        catch(e) {
            return;
        }
    }

    select (type: "clients" | "service_providers" | "services" | "cards", key: string, val: any, opt: "single" | "multiple" = "single"): any {
        try{
            if (type == "clients"){
                if(opt == "single") return this.clients.find(el => el[key] == val);
                else if(opt == "multiple") return this.clients.filter(el => el[key] == val);
            }
            else if (type == "service_providers"){
                if(opt == "single") return this.service_providers.find(el => el[key] == val);
                else if(opt == "multiple") return this.service_providers.filter(el => el[key] == val);
            }
            else if (type == "services"){
                if(opt == "single") return this.services.find(el => el[key] == val);
                else if(opt == "multiple") return this.services.filter(el => el[key] == val);
            }
            else if(type == "cards"){
                if(opt == "single") return this.cards.find(el => el[key] == val);
                else if(opt == "multiple") return this.cards.filter(el => el[key] == val);
            }
        }
        catch(e) {
            return null;
        }
        
        return null;
    }

    get_size(type: "clients" | "service_providers" | "services" | "cards"): number {
        try{
            if (type == "clients"){
                return this.clients.length;
            }
            else if (type == "service_providers"){
                return this.service_providers.length;
            }
            else if (type == "services"){
                return this.services.length;
            }
            else if(type == "cards"){
                return this.cards.length;
            }
        }
        catch(e) {
            return null;
        }
        
        return null;
    }
}

export var db = new Database();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = exports.Client = void 0;
class Client {
    constructor(id, first_name) {
        this.id = id;
        this.first_name = first_name;
    }
}
exports.Client = Client;
class ServiceProvider {
    constructor(id, first_name, last_name, description, avatar_url) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.description = description;
        if (avatar_url)
            this.avatar_url = avatar_url;
        this.evaluations_average = 5.0;
        this.jobs_number = 0;
    }
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=users.js.map
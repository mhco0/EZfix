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
    constructor(id) {
        this.id = id;
    }
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=users.js.map
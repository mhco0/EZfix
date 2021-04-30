import session from "./session"

export default {
    async create_service(client_id, service_provider_id, payment_status, payment_online) {
        const body = {
            "client_id": client_id,
            "service_provider_id": service_provider_id,
            "payment_status": payment_status,
            "payment_online": payment_online
        }

        return session.post("/service/" + service_provider_id, body);
    },

    async update_service(service_id, payment_status, payment_online) {
        const body = {
            "payment_status": payment_status,
            "payment_online": payment_online
        }

        return session.post("/updateservice/" + service_id, body);
    },

    async get_contracts_list(client_id) {
        return session.get("/listcontracts/" + client_id.toString());
    }
};
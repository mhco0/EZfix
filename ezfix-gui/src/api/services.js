import session from "./session"

export default {
    async create_service(client_id, service_provider_id, payment_status, payment_online) {
        const body = {
            "client_id": client_id,
            "service_provider_id": service_provider_id,
            "payment_status": payment_status,
            "payment_online": payment_online
        }

        return session.post("/service/" + service_provider_id, body).then((res) => console.log(res.data));
    },

    async get_services_list() {
        return session.get("/listservices/");
    }
};
import session from "./session"

export default {
    async get_provider(provider_id) {
        return session.get("/provider/"+provider_id.toString());
    }
}
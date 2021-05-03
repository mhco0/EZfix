import session from "./session"

export default {

    async getProviders(category) {
        return session.get("/search/" + category);
    }
};
import session from "./session";

export  default {
    async fetchMessageLists(service_id){
        return session.get("/chat/" + service_id.toString())
    },

    async sendMessage(service_id, json_obj){
        let objData = {
            bytes : json_obj
        }
        return session.post("/chat/" + service_id.toString(), objData);
    }
}
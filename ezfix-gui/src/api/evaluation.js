import session from "./session"

export default {
  async evaluate(service_id, attendance_rating, punctuality_rating, service_quality_rating, ezfix_rating, coment) {
    const body = {
      "evaluator_id": 1,
      "attendance_rating": attendance_rating,
      "punctuality_rating": punctuality_rating,
      "service_quality_rating": service_quality_rating,
      "ezfix_rating": ezfix_rating,
      "coment": coment
    }
    

    return session.post("/evaluate/" + service_id.toString(), body);
  },

  async get_reviews_list(provider_id) {
    return session.get("/listcoments/" + provider_id.toString());
  }
};
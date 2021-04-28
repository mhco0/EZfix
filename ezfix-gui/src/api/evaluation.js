import session from "./session"

export default {
  async evaluate(service_id, attendance_rating, punctuality_rating, service_quality_rating, ezfix_rating) {
    const body = {
      "attendance_rating": attendance_rating,
      "punctuality_rating": punctuality_rating,
      "service_quality_rating": service_quality_rating,
      "ezfix_rating": ezfix_rating
    };
    
    return session.post("/evaluate/"+service_id, body);
  }
};
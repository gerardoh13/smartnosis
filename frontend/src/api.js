import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "http://" + window.location.hostname + ":3001";

class SmartnosisApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SmartnosisApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ------------------PROVIDERS---------------------------

  static async registerProvider(data) {
    let res = await this.request("providers/register", data, "post");
    return res.provider;
  }

  static async registerUser(data) {
    const route = data.role === "hcp" ? "hcps" : "staff"
    let res = await this.request(`${route}/register`, data, "post");
    return res.token;
  }

  static async checkDupe(type, email) {
    if (type === "hcp") type += "s"
    let res = await this.request(`${type}/checkduplicate/${email}`);
    return res.validEmail;
  }

  static async login(data) {
    let res = await this.request("providers/token", data, "post");
    return res.token;
  }

  static async getCurrUser(providerId, id, role) {
    let res = await this.request(`providers/${providerId}/${id}/${role}`);
    return res.user;
  }

  static async getInvitations(providerId) {
    let res = await this.request(`providers/admin/${providerId}`);
    return res.invitations;
  }

  static async sendInvite(providerId, type, email) {
    let res = await this.request(`${type}/invite/${providerId}/${email}`);
    return res.success;
  }

  static async resendInvite(providerId, type, email) {
    let res = await this.request(`${type}/reinvite/${providerId}/${email}`);
    return res.success;
  }

  static async resetPwd(token, data) {
    let res = await this.request(
      `providers/new-password?token=${token}`,
      data,
      "post",
    );
    return res;
  }

  static async requestPwdReset(data) {
    let res = await this.request("providers/reset", data, "post");
    return res;
  }
  // ------------------INTAKES---------------------------
  static async addIntake(data) {
    let res = await this.request("intakes", data, "post");
    return res;
  }

  static async getIntake(providerId, intakeId) {
    let res = await this.request(`intakes/${providerId}/${intakeId}`);
    return res.intake;
  }

  // ------------------APPTS---------------------------

  static async addAppt(data) {
    let res = await this.request("appointments", data, "post");
    return res.appointment;
  }

  static async updateAppt(data) {
    let res = await this.request("appointments", data, "patch");
    return res.appointment;
  }

  static async getAppt(providerId, apptId) {
    try {
      let res = await this.request(`appointments/${providerId}/${apptId}`);
      return res.appt;
    } catch (e) {
      console.log(e);
      return e[0];
    }
  }

  static async getByDate(providerId, start, end, type) {
    let res = await this.request(
      `${type}/by-date/${providerId}/${start}/${end}`
    );
    return res;
  }

  static async search(query, providerId) {
    let res = await this.request(
      `providers/search/${providerId}?query=${query}`
    );
    return res;
  }

  static async deleteAppt(apptId, providerId) {
    let res = await this.request(
      `appointments/${apptId}/${providerId}`,
      {},
      "delete"
    );
    return res;
  }

  // ------------------STRIPE CHECKOUT ---------------------------
  static async createCheckoutSession(){
    let res = await this.request(
      `/stripe/create-checkout-session`, {}, "post"
    );
    return res;
  }

  static async createPortalSession(session_id){
    let res = await this.request(
      `/stripe/create-portal-session`, {session_id}, "post"
    );
    return res;
  }

}



export default SmartnosisApi;

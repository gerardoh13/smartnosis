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
    return res.token;
  }

  static async login(data) {
    let res = await this.request("providers/token", data, "post");
    return res.token;
  }

  static async getCurrProvider(email) {
    let res = await this.request(`providers/${email}`);
    return res.provider;
  }
  // ------------------INTAKES---------------------------
  static async addIntake(data) {
    let res = await this.request("intakes", data, "post");
    return res;
  }

  static async generatePDF(providerId, intakeId) {
    let res = await axios.get(
      `${BASE_URL}/intakes/generate-pdf/${providerId}/${intakeId}`,
      {
        responseType: "arraybuffer", // Treat response as binary data
        headers: { Authorization: `Bearer ${SmartnosisApi.token}` },
      }
    );
    return res;
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
      return e[0]
    }
  }

  static async getByDate(providerId, start, end, type) {
    let res = await this.request(
      `${type}/by-date/${providerId}/${start}/${end}`
    );
    return res;
  }

  static async searchAppts(query, providerId) {
    let res = await this.request(
      `appointments/search/${providerId}?query=${query}`
    );
    return res.results;
  }

  static async deleteAppt(apptId, providerId) {
    let res = await this.request(
      `appointments/${apptId}/${providerId}`,
      {},
      "delete"
    );
    return res;
  }
}

export default SmartnosisApi;

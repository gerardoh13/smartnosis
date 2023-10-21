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

  // Individual API routes

  // static async generatePDF(data) {
  //   let res = await axios.post(`${BASE_URL}/pdf`, data, {
  //     responseType: "arraybuffer", // Treat response as binary data
  //   });
  //   return res;
  // }
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

  static async emailAppt(data) {
    let res = await this.request("appointments/email", data, "post");
    return res.appointment;
  }

  static async textAppt(data) {
    let res = await this.request("appointments/sms", data, "post");
    return res.appointment;
  }
  
  static async getAppt(providerId, apptId) {
    let res = await this.request(`appointments/${providerId}/${apptId}`);
    return res.appt;
  }

  static async getByDate(providerId, start, end, type) {

    let res = await this.request(
      `${type}/by-date/${providerId}/${start}/${end}`
    );
    return res;
  }
}

export default SmartnosisApi;

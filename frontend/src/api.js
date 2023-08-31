import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "http://" + window.location.hostname + ":3001";

class SmartnosisApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

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

  static async generatePDF(data) {
    let res = await axios.post(`${BASE_URL}/pdf`, data, {
      responseType: "arraybuffer", // Treat response as binary data
    });
    return res;
  }
  // ------------------PROVIDERS---------------------------

  static async registerProvider(data) {
    let res = await this.request("providers/register", data, "post");
    console.log(res);
    return res.token;
  }
  static async getCurrProvider(email) {
    let res = await this.request(`providers/${email}`);
    return res.provider;
  }
}

export default SmartnosisApi;

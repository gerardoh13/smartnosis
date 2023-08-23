import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://" + window.location.hostname + ":3001";


class SmartnosisApi {

  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SmartnosisApi.token}` };
    const params = method === "get" ? data : {};
    const responseType = "arraybuffer"

    try {
      return (await axios({ url, method, data, params, headers, responseType })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // ------------------USERS---------------------------
  static async generatePDF(data) {
    let res = await axios.post(`${BASE_URL}/pdf`, data, {
        responseType: 'arraybuffer', // Treat response as binary data
    });
    return res;
  }

//   static async registerUser(data) {
//     let res = await this.request("users/register", data, "post");
//     return res.token;
//   }

}

export default SmartnosisApi;

import axios from "axios";

type METHODS = "GET" | "POST" | "HEAD" | "PUT" | "DELETE";

export default class HttpClient {
  static async call(method: METHODS, url: string, data: any = null) {
    const response = await axios({
      method,
      url,
      data,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}

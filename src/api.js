import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API routes:

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async getUserProfile(username) {
    let res = await this.request(`users/${username}`);
    console.log(res);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async updateUserProfile(formData, username) {
    let res = await this.request(`users/${username}`, formData, "patch");
    return res;
  }

  //  wanna deleteUser, wasn't do yet
  static async deleteUser(username) {
    try {
      let res = await this.request(`users/${username}`, {}, "delete");
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /** Get companies (filtered by name if not undefined) */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */
  static async getJobs(title) {
    let res = await this.request("jobs/", { title });
    return res.jobs;
  }

  /** Get list of jobs (filtered by title if not undefined) */
  static async getJobsByIds(ids) {
    const requests = ids.map((id) => {
      return this.request(`jobs/${id}`);
    });

    return await Promise.all(requests);
  }

  // /** Get details on a job with given ID */
  // static async getJob(id){
  //   try {
  //     let res = await this.request(`jobs/${id}`);
  //     return res.data.job;
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }
}

export default JoblyApi;

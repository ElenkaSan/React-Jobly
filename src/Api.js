import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:3001";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

/** Get details on a company by handle. */ 
//   As you work on features in the front end that need to use backend APIs, 
// add to this class.

  static async getCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }

  // static async getFilteredCompanies(formData) {
  //   let res = await this.request(`companies/`, formData);
  //   return res.companies;
  // }

  // static async getCurrentUser(username) {
  //   let res = await this.request(`users/${username}`);
  //   return res.user;
  // }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

   /** Get jobs */
   static async getJobs() {
    let res = await this.request(`jobs/`);
    return res.jobs;
  }

    // static async getFilteredJobs(formData) {
    //   let res = await this.request(`jobs/`, formData);
    //   return res.jobs;
    // }

  // Log user in Get token for login from username, password. 
  static async login(formData) {
    let res = await this.request(`auth/token`, formData, 'post');
    this.setToken(res.token);
    return res.data;
  }

  static async register(formData) {
    let res = await this.request(`auth/register`, formData, 'post');
    this.setToken(res.token);
    return res.data;
  }


  static async getUserProfile(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUserProfile(formData, username) {
    let res = await this.request(`users/${username}`, formData, 'patch');
    return res;
  }

  static async applyToJob(username, id) {
    let formData = { username: username, id: id };
    let res = await this.request(`users/${username}/jobs/${id}`, formData, 'post');
    return res;
  }

  static async setToken(token) {
    this.token = token;
  }


}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
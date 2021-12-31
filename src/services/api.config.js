import axios from "axios";
import { API_BASE_URL } from "../constants";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  get(resource, headers) {
    return axios.get(resource, { headers: headers });
  },

  post(resource, data, headers) {
    return axios.post(resource, data, { headers: headers });
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },
};
ApiService.init(API_BASE_URL);

export default ApiService;
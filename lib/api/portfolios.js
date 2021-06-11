import BaseApi from './BaseApi';
import axios from 'axios';

class PortfolioApi extends BaseApi {

  constructor(accessToken) {
    super(accessToken, process.env.PORTFOLIO_API_URL);
  }

  delete(id) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config);
  }
}

export default PortfolioApi;
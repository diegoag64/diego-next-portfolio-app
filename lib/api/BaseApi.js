import axios from 'axios';

class BaseApi {

    constructor(accessToken, apiUrl) {
        this.config = {}

        if (accessToken) {
            this.config.headers = {
            authorization: `Bearer ${accessToken}`
            }
        }
        this.apiUrl = apiUrl;
    }

    create(data) {
        return axios.post(this.apiUrl, data, this.config);
    }

    getById(id) {
        return axios.get(`${this.apiUrl}/${id}`);
    }

    getBySlug(slug){
        console.log(`testing on ${this.apiUrl}/s/${slug}`);
        return axios.get(`${this.apiUrl}/s/${slug}`);
    }

    update(id, data) {
        return axios.patch(`${this.apiUrl}/${id}`, data, this.config);
    }

    getByUser(){
        return axios.get(`${this.apiUrl}/me`, this.config);
    }

    getAll() {
        return axios.get(this.apiUrl)
    }

}

export default BaseApi;
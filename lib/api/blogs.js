import BaseApi from './BaseApi';
import axios from 'axios';

class BlogApi extends BaseApi {

    constructor(accessToken) {
        super(accessToken, process.env.BLOG_API_URL);
    }

}

export default BlogApi;
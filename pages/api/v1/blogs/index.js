import { getAccessToken } from '@auth0/nextjs-auth0';

import BlogApi from '@/lib/api/blogs';


export default async function createBlog(req, res){

    try {
        const { accessToken } = await getAccessToken(req, res);
        const json = await new BlogApi(accessToken).create(req.body);
        return res.json(json.data)
    } catch (error) {
        return res.status(error.status || 422).json(error.message);
    }

}
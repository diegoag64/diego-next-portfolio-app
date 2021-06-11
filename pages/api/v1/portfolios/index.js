import { getAccessToken } from '@auth0/nextjs-auth0';

import PortfolioApi from '@/lib/api/portfolios';


export default async function createPortfolio(req, res){

    try {
        const { accessToken } = await getAccessToken(req, res);
        await new PortfolioApi(accessToken).create(req.body);
        return res.json({message: 'Created, token: ' + accessToken})
    } catch (error) {
        return res.status(error.status || 422).json(error.message);
    }

}
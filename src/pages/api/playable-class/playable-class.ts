import { NextApiRequest, NextApiResponse } from 'next';
import { BizzardAPI } from '@src/utils/BlizzardApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const playableClassesResponse = await BizzardAPI(
            'GET',
            `/data/wow/playable-class/index?namespace=static-10.2.0_51825-us`
        );
        res.json(playableClassesResponse);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

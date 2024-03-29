import { NextApiRequest, NextApiResponse } from 'next';
import { BizzardAPI } from '@src/utils/BlizzardApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { guildName } = req.query;

    try {
        const membersResponse = await BizzardAPI(
            'GET',
            `/data/wow/guild/area-52/${guildName}/roster?region=us&namespace=profile-us`
        );
        res.json(membersResponse);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

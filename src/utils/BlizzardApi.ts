import { NextApiRequest, NextApiResponse } from 'next';
import { getBlizzardAccessToken } from '@src/utils/auth';
import axios, { AxiosResponse } from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { guildName } = req.query;

    try {
        const response: AxiosResponse = await axios.get(
            `https://us.api.blizzard.com/data/wow/guild/area-52/${guildName}/roster?region=us&namespace=profile-us`,
            {
                headers: {
                    Authorization: `Bearer ${(await getBlizzardAccessToken()).token}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`Failed to fetch. Status: ${response.status}, ${response.statusText}`);
        }

        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching', error.message);
        throw error;
    }
};

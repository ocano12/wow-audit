import { NextApiRequest, NextApiResponse } from 'next';
import { Member } from '@src/types/roster/member';
import { getBlizzardAccessToken } from '@src/utils/auth';
import axios, { AxiosResponse } from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { guildName } = req.query;

    try {
        const membersResponse: AxiosResponse = await axios.get(
            `https://us.api.blizzard.com/data/wow/guild/area-52/${guildName}/roster?region=us&namespace=profile-us`,
            {
                headers: {
                    Authorization: `Bearer ${(await getBlizzardAccessToken()).token}`,
                },
            }
        );

        if (membersResponse.status !== 200) {
            throw new Error(
                `Failed to fetch guild members. Status: ${membersResponse.status}, ${membersResponse.statusText}`
            );
        }

        res.json(membersResponse.data);
    } catch (error: any) {
        console.error('Error fetching guild members:', error.message);
        throw error;
    }
};

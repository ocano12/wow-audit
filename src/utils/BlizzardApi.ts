import { NextApiRequest, NextApiResponse } from 'next';
import { getBlizzardAccessToken } from '@src/utils/auth';
import axios, { AxiosResponse, Method } from 'axios';

//TODO: process.env remove to correct way
//TODO: better status handle like 401 or 404

export const BizzardAPI = async (method: Method = 'GET', endpoint: string, data?: Request): Promise<Response> => {
    try {
        const response = await axios({
            method,
            url: process.env.BLIZZARD_API_HOST + endpoint,
            data: data,
            headers: {
                Authorization: `Bearer ${(await getBlizzardAccessToken()).token}`,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${endpoint} Status: ${response.status}, ${response.statusText}`);
        }

        return response.data as any;
    } catch (error: any) {
        throw new Error(`Blizzard Api failed because ${error.response.status} ${error.response.statusText}`);
    }
};

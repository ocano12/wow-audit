import { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@src/utils/DyanmoUtils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { roster } = req.body;

    try {
        await put('roster', roster);
        console.log('roster saved');
        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
    //bring in dynamo utils
    //save roster to dynamo table.
};

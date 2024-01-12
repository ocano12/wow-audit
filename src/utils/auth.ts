import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';

interface BlizzardTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    sub: string;
}

type BlizzardAccessToken = {
    token: string;
    expires: DateTime;
};

let blizzardAccessToken: BlizzardAccessToken;

export const getBlizzardAccessToken = async (): Promise<BlizzardAccessToken> => {
    if (!blizzardAccessToken || blizzardAccessToken.expires.diffNow().toMillis() < 30000) {
        try {
            const response: AxiosResponse<BlizzardTokenResponse> = await axios.post(
                `${process.env.BLIZZARD_OAUTH_HOST}/token`,
                null,
                {
                    params: {
                        client_id: process.env.client_id,
                        client_secret: process.env.secret,
                        grant_type: 'client_credentials',
                    },
                }
            );

            // Calculate the expiration time
            const expirationTime = DateTime.now().plus({
                seconds: response.data.expires_in,
            });

            // Set the new access token
            blizzardAccessToken = {
                token: response.data.access_token,
                expires: expirationTime,
            };

            return blizzardAccessToken;
        } catch (error) {
            console.error('Failed to get Blizzard Access Token:', error);
            throw error;
        }
    } else {
        return blizzardAccessToken;
    }
};

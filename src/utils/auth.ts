import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import { serialize, parse } from 'cookie';

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    sub: string;
}

const BLIZZARD_API_TOKEN_NAME = 'blizzard-api-token';

export const withTokenValidation =
    (handler: GetServerSideProps): GetServerSideProps =>
    async (context: any) => {
        const { req, res } = context;

        const createToken = async (): Promise<string> => {
            try {
                const response: AxiosResponse<TokenResponse> = await axios.post(
                    `${process.env.BLIZZARD_OAUTH_HOST}/token?client_id=${process.env.client_id}&client_secret=${process.env.secret}&grant_type=client_credentials`
                );

                return response.data.access_token;
            } catch (e) {
                console.error('Create Token Failed');
                //@ts-ignore
                throw e;
            }
        };

        const newToken = await createToken();

        if (newToken) {
            console.log('setting token', newToken);

            context.token = newToken;
            return handler(context);
        }
        return {
            notFound: true,
        };
    };

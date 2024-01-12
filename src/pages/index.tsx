import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { getBlizzardAccessToken } from '@src/utils/auth';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const response = await axios.get(
//         'https://us.api.blizzard.com/data/wow/guild/area-52/i-miss-my-wife/roster?region=us&namespace=profile-us',
//         {
//             headers: {
//                 Authorization: `Bearer ${(await getBlizzardAccessToken()).token}`,
//             },
//         }
//     );

//     return {
//         props: {
//             data: response.data,
//         },
//     };
// };

const IndexPage = (props: any) => {
    const { data } = props;
    return (
        <div>
            <h1>ORLANDO TESTING 3000</h1>
            {/* <h2>{data.members[0].rank}</h2> */}
        </div>
    );
};

export default IndexPage;

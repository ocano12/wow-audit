import React from 'react';
import { GetServerSideProps } from 'next';
import { withTokenValidation } from '@components/utils/auth';

export const getServerSideProps: GetServerSideProps = withTokenValidation( async (context) => {

    //@ts-ignore
   const {token} = context

   return {props:{ token,}}
})


const IndexPage = (props: any) => {
    const {token} = props
    return (
    <div>
        <h1>ORLANDO TESTING 3000</h1>
        <h2>{token}</h2>
    </div>
    )
}

export default IndexPage
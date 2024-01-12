import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { getBlizzardAccessToken } from '@src/utils/auth';
import { Member } from '@src/types/roster/member';
import { Class } from '@src/types/class';

//TODO: in the future the guild name needs to come from the context object being passed down through nextjs.
//TODO: convert all process.env to correct nextjs way to use env
export interface RosterPageProps {
    members: Member[];
}

export const getRoster = (members: Member[] = [], playableClasses: Class[] = []) => {
    return members.map((member: Member) => {
        const playableClass = playableClasses.find(
            (playableClass) => playableClass.id === member.character.playable_class.id
        );

        return {
            ...member,
            character: {
                ...member.character,
                playable_class: {
                    ...member.character.playable_class,
                    name: playableClass?.name?.en_US ?? 'Unknown', // Set a default value if playableClass is not found
                },
            },
        };
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const guildName = 'i-miss-my-wife';

    const getMembersResponse: AxiosResponse = await axios.get(
        `${process.env.CLIENT_DOMAIN}/api/roster/getMembers?guildName=${guildName}`
    );

    const getPlayableClassResponse: AxiosResponse = await axios.get(
        `${process.env.CLIENT_DOMAIN}/api/playable-class/playable-class?guildName=${guildName}`
    );

    const roster = getRoster(getMembersResponse.data.members, getPlayableClassResponse.data.classes);

    return {
        props: {
            members: roster,
        },
    };
};

const RosterPage = ({ members }: RosterPageProps) => {
    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl'>
                {members.map((member: Member, index: number) => (
                    <div key={index}>
                        <span>{member.character.name}</span>
                        <span>{member.character.playable_class.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RosterPage;

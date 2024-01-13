import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { Member } from '@src/types/roster/member';
import { Class } from '@src/types/class';
import { getClassFromID } from '@src/utils/getClassFromId';

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
                {members.map((member: Member, index: number) => {
                    const className = getClassFromID(member.character.playable_class.id);
                    return (
                        <div key={index} className='flex items-center p-3'>
                            <img
                                src={`/assets/classicon_${className}.jpg`}
                                alt={`${className} icon`}
                                className='w-8 h-8 mr-2'
                            />
                            <span className={`flex-1 ${className}`}>{member.character.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RosterPage;

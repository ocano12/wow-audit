import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { Member } from '@src/types/roster/member';
import { Class } from '@src/types/class';
import { getClassFromID } from '@src/utils/getClassFromId';
import { Container } from '@components/Container';

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
        <Container>
            <div className='flex flex-direction-row p-5'>
                <div className='w-1/5'>
                    {members.map((member: Member, index: number) => {
                        const className = getClassFromID(member.character.playable_class.id);
                        return (
                            <div key={index} className='flex items-center p-3'>
                                <img
                                    src={`/assets/classicon_${className}.jpg`}
                                    alt={`${className} icon`}
                                    className='w-7 h-7 rounded mr-2 border'
                                />
                                <span className={`flex-1  ${className}`}>{member.character.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className='w-4/5'>
                    <div className='flex flex-direction-row'>
                        <div className='w-1/2'>
                            {' '}
                            <div className='bg-gray-500'>
                                <div className='flex flex-col'>
                                    <div className='bg-gray-500 p-2'>
                                        <h2 className='text-white text-xl font-bold'>Tanks</h2>
                                    </div>
                                    {/* TODO: makes this to every tank put into the tank array same thing with the other 4 divs. */}
                                    <div className='bg-gray-400 p-2'>
                                        <p className='text-gray-800'>Tank Name 1</p>
                                    </div>
                                    <div className='bg-gray-500 p-2'>
                                        <p className='text-white'>Tank Name 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='bg-gray-500'>
                                <div className='flex flex-col'>
                                    <div className='bg-gray-500 p-2'>
                                        <h2 className='text-white text-xl font-bold'>Heals</h2>
                                    </div>
                                    <div className='bg-gray-400 p-2'>
                                        <p className='text-gray-800'>Tank Name 1</p>
                                    </div>
                                    <div className='bg-gray-500 p-2'>
                                        <p className='text-white'>Tank Name 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-direction-row'>
                        <div className='w-1/2'>
                            {' '}
                            <div className='bg-gray-500'>
                                <div className='flex flex-col'>
                                    <div className='bg-gray-500 p-2'>
                                        <h2 className='text-white text-xl font-bold'>Melee</h2>
                                    </div>
                                    <div className='bg-gray-400 p-2'>
                                        <p className='text-gray-800'>Tank Name 1</p>
                                    </div>
                                    <div className='bg-gray-500 p-2'>
                                        <p className='text-white'>Tank Name 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='bg-gray-500'>
                                <div className='flex flex-col'>
                                    <div className='bg-gray-500 p-2'>
                                        <h2 className='text-white text-xl font-bold'>Range</h2>
                                    </div>
                                    <div className='bg-gray-400 p-2'>
                                        <p className='text-gray-800'>Tank Name 1</p>
                                    </div>
                                    <div className='bg-gray-500 p-2'>
                                        <p className='text-white'>Tank Name 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RosterPage;

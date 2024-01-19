import React, { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { Member } from '@src/types/roster/member';
import { Class } from '@src/types/class';
import { Container } from '@components/Container';
import { RoleTable } from '@components/RoleTable';
import { RosterCard } from '@components/RosterCard/';
import { Roster } from '@src/types/roster/roster';

//TODO: in the future the guild name needs to come from the context object being passed down through nextjs.
//TODO: convert all process.env to correct nextjs way to use env
//TODO: check db to see if a roster is already set. if not call blizzard api. if it is fill in the roster slots
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
                    name: playableClass?.name?.en_US ?? 'Unknown',
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
    const [tanks, setTanks] = useState<Member[]>([]);
    const [healers, setHealers] = useState<Member[]>([]);

    //TODO: usecall back for these function do a test to see how many renders before and after!
    const handleTanks = (member: Member) => {
        if (tanks.length < 2) {
            setTanks([...tanks, member]);
        } else {
            alert('Max Tanks have been selected!');
        }
    };
    const handleHealer = (member: Member) => {
        if (healers.length < 4) {
            setHealers([...healers, member]);
        } else {
            alert('Max Healers have been selected');
        }
    };
    const checkIfMemberSelected = (member: Member): boolean => {
        return [...tanks, ...healers].some((selectedMember) => selectedMember.character.id === member.character.id);
    };

    const handleUnSelectMember = useCallback(
        (memberToRemove: Member) => {
            const updatedTanks = tanks.filter((member) => member.character.id !== memberToRemove.character.id);
            const updatedHealers = healers.filter((member) => member.character.id !== memberToRemove.character.id);

            setTanks(updatedTanks);
            setHealers(updatedHealers);
        },
        [tanks, healers]
    );

    const handleSave = async (roster: Roster) => {
        try {
            const repsonse = await axios.post(`/api/roster/saveRoster`, {
                roster: JSON.stringify(roster),
            });
            alert(JSON.stringify(repsonse));
        } catch (error) {
            console.log('fucked');
            alert('Not saved');
        }
    };

    return (
        <Container>
            <div className='flex flex-direction-row p-5'>
                <div className='w-1/5'>
                    <div className='rounded' style={{ backgroundColor: '#374963' }}>
                        <p className='text-3xl text-white p-3'>Roster</p>
                        {members.map((member: Member, index: number) => {
                            return (
                                // TODO: make this drag and drop so theres no buttons
                                <div
                                    key={index}
                                    className={`m-3 ${
                                        index % 2 === 0 ? 'bg-gray-800 rounded ' : 'bg-gray-600 rounded'
                                    }`}
                                >
                                    <RosterCard member={member} index={index} selected={checkIfMemberSelected(member)}>
                                        <div>
                                            <button
                                                onClick={() => handleTanks(member)}
                                                className='text-white border'
                                                disabled={checkIfMemberSelected(member)}
                                            >
                                                Tanks
                                            </button>
                                            <button
                                                onClick={() => handleHealer(member)}
                                                className='text-white border'
                                                disabled={checkIfMemberSelected(member)}
                                            >
                                                Healer
                                            </button>
                                        </div>
                                    </RosterCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='w-3/5'>
                    <button onClick={() => handleSave({ tanks: tanks, healers: healers })}>Save</button>
                    <div className='tanks-heals flex justify-around '>
                        <RoleTable
                            title='Tanks'
                            imgUrl='/assets/classicon_paladin.jpg'
                            slots={2}
                            members={tanks}
                            onClose={handleUnSelectMember}
                        />
                        <RoleTable
                            title='Healers'
                            imgUrl='/assets/classicon_priest.jpg'
                            slots={4}
                            members={healers}
                            onClose={handleUnSelectMember}
                        />
                    </div>
                    <div className='melee-range flex'></div>
                    <div className='subs flex'></div>
                </div>
                <div className='w-1/5'>
                    <div className=' bg-white shadow-xl flex-grow rounded'>
                        <div className='w-11/12 mx-auto'>
                            <div className='bg-white my-6'>
                                <table className='text-left w-full border-collapse'>
                                    <thead>
                                        <tr>
                                            <th className='py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light'>
                                                Composition
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='hover:bg-grey-lighter'>
                                            <td className='py-2 px-3 border-b border-grey-light'>Bible</td>
                                            <td className='py-2 px-3 text-center border-b border-grey-light'>11980</td>
                                        </tr>
                                        <tr className='hover:bg-grey-lighter'>
                                            <td className='py-2 px-3 border-b border-grey-light'>Blah</td>
                                            <td className='py-2 px-3 text-center border-b border-grey-light'>340</td>
                                        </tr>
                                        <tr className='hover:bg-grey-lighter'>
                                            <td className='py-2 px-3 border-b border-grey-light'>Blah</td>
                                            <td className='py-2 px-3 text-center border-b border-grey-light'>901</td>
                                        </tr>
                                        <tr className='hover:bg-grey-lighter'>
                                            <td className='py-2 px-3 border-b border-grey-light'>Blah</td>
                                            <td className='py-2 px-3 text-center border-b border-grey-light'>11950</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RosterPage;

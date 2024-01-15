import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { Member } from '@src/types/roster/member';
import { Class } from '@src/types/class';
import { getClassFromID } from '@src/utils/getClassFromId';
import { Container } from '@components/Container';
import { RoleTable } from '@components/RoleTable';
import { RosterCard } from '@components/RosterCard/';

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

    const handleTanks = (member: Member) => {
        setTanks([...tanks, member]);
    };
    const handleHealer = (member: Member) => {
        setHealers([...healers, member]);
    };
    const checkIfMemberSelected = (member: Member): boolean => {
        return [...tanks, ...healers].some((selectedMember) => selectedMember.character.id === member.character.id);
    };

    const handleUnSelectMember = (memberToRemove: Member) => {
        const updatedTanks = tanks.filter((member) => member.character.id !== memberToRemove.character.id);
        const updatedHealers = healers.filter((member) => member.character.id !== memberToRemove.character.id);

        setTanks(updatedTanks);
        setHealers(updatedHealers);
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
                            );
                        })}
                    </div>
                </div>
                <div className='w-4/5'>
                    <div className='tanks-heals flex justify-around '>
                        <RoleTable
                            title='Tanks'
                            imgUrl='/assets/classicon_paladin.jpg'
                            slots={tanks}
                            onClose={handleUnSelectMember}
                        />
                        <RoleTable
                            title='Healers'
                            imgUrl='/assets/classicon_priest.jpg'
                            slots={healers}
                            onClose={handleUnSelectMember}
                        />
                    </div>
                    <div className='melee-range flex'></div>
                    <div className='subs flex'></div>
                </div>
            </div>
        </Container>
    );
};

export default RosterPage;

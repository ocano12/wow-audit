import { Member } from '@src/types/roster/member';
import React, { ReactNode } from 'react';
import { getClassFromID } from '@src/utils/getClassFromId';
import { RosterCard } from '@components/RosterCard';

export interface RoleTableProps {
    title: string;
    imgUrl: string;
    slots?: Member[];
    onClose: (member: Member) => void;
}

export const RoleTable = (props: RoleTableProps) => {
    const { title, imgUrl, slots, onClose } = props;

    const handleClose = (member: Member) => {
        onClose(member);
    };
    return (
        <>
            <div className='w-1/4 rounded' style={{ backgroundColor: '#374963 ' }}>
                <div className=' flex justify-center items-center '>
                    <div className='px-2 flex items-center p-3'>
                        <img className='w-8 h-8 rounded mr-2' src={imgUrl} />
                        <h2 className='text-white text-xl font-bold text-center'>{title}</h2>
                    </div>
                </div>
                <div>
                    {slots &&
                        slots.map((member, index) => {
                            const className = getClassFromID(member.character.playable_class.id);
                            return (
                                <RosterCard member={member} index={index}>
                                    <button className='text-white' onClick={() => handleClose(member)}>
                                        Close
                                    </button>
                                </RosterCard>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

import { Member } from '@src/types/roster/member';
import React, { ReactNode } from 'react';
import { getClassFromID } from '@src/utils/getClassFromId';
import { RosterCard } from '@components/RosterCard';

export interface RoleTableProps {
    title: string;
    imgUrl: string;
    members?: Member[];
    slots?: number;
    onClose: (member: Member) => void;
}

export const RoleTable = (props: RoleTableProps) => {
    const { title, imgUrl, slots = 1, onClose, members = [] } = props;

    const handleClose = (member: Member) => {
        onClose(member);
    };

    const tableRows = [...Array(slots)];

    return (
        <div className='w-1/4 roundedflex-grow'>
            <div className='p-2' style={{ backgroundColor: '#374963 ' }}>
                <div className=' flex justify-center items-center '>
                    <div className='px-2 flex items-center p-3'>
                        <img className='w-8 h-8 rounded mr-2' src={imgUrl} />
                        <h2 className='text-white text-xl font-bold text-center'>{title}</h2>
                    </div>
                </div>
                <div>
                    {tableRows.map((member, index) => {
                        return (
                            <div
                                key={index}
                                className={`m-3 ${index % 2 === 0 ? 'bg-gray-800 rounded ' : 'bg-gray-600 rounded'} ${
                                    members[index] ? '' : 'min-h-12 p-3'
                                }`}
                            >
                                {members[index] && (
                                    <RosterCard member={members[index]} index={index}>
                                        <button className='text-white' onClick={() => handleClose(members[index])}>
                                            Close
                                        </button>
                                    </RosterCard>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

import React, { ReactNode } from 'react';
import { Member } from '@src/types/roster/member';
import { getClassFromID } from '@src/utils/getClassFromId';

export interface RosterCardProps {
    member: Member;
    index?: number;
    children?: ReactNode;
    selected?: boolean;
}

export const RosterCard = ({ member, index = 1, children, selected = false }: RosterCardProps) => {
    const className = getClassFromID(member.character.playable_class.id);
    return (
        <div>
            <div
                key={index}
                className={`flex items-center p-3 m-3 ${index % 2 === 0 ? 'bg-gray-800 rounded ' : ''}`}
                style={selected ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
                <img
                    src={`/assets/classicon_${className}.jpg`}
                    alt={`${className} icon`}
                    className='w-7 h-7 rounded mr-2 border'
                />
                <span className={`flex-1  ${className}`}>{member.character.name}</span>
                {children}
            </div>
        </div>
    );
};

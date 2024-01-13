import React, { ReactNode } from 'react';

export interface ContainerProps {
    children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
    return <div className='bg-gray-800'>{children}</div>;
};

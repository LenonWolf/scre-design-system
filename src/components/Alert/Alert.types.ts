import type { ReactNode, HTMLAttributes } from 'react';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant: 'error' | 'success' | 'info';
    title?: string;
    children: ReactNode;
}
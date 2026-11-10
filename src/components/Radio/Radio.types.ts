import type { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
}
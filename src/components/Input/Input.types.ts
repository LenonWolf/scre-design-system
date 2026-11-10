import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'error'> {
    label?: string;
    error?: string | boolean;
    icon?: ReactNode;
    fullWidth?: boolean;
}
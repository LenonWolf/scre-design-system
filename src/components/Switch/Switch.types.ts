import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
}
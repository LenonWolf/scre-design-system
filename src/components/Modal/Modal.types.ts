import type { ReactNode } from 'react';

export interface ModalProps {
    isOpen: boolean;
    isConfirmed?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    children?: ReactNode;
    confirmText?: string;
    cancelText?: string;
}
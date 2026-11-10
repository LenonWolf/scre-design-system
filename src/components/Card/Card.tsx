import { useState } from 'react';
import type { CardProps } from './Card.types';
import { colors, spacing, radii, motion } from '../../tokens';

export const Card = ({
    children,
    selected = false,
    disabled = false,
    onClick,
    style,
    ...props
}: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isInteractive = Boolean(onClick) && !disabled;

    const getBorder = () => {
        if (disabled) return `1px solid ${colors.disabled}`;
        if (selected) return `3px solid ${colors.primary}`;
        if (isHovered && isInteractive) return `1px solid ${colors.primaryHover}`;
        
        return `1px solid ${colors.border}`;
    };

    return (
        <div
            onClick={isInteractive ? onClick : undefined}
            onMouseEnter={() => isInteractive && setIsHovered(true)}
            onMouseLeave={() => isInteractive && setIsHovered(false)}
            style={{
                backgroundColor: disabled ? colors.background : colors.white,
                border: getBorder(),
                borderRadius: radii.md,
                padding: spacing.lg,
                cursor: isInteractive ? 'pointer' : (disabled ? 'not-allowed' : 'default'),
                transition: `all ${motion.hover}`,
                opacity: disabled ? 0.6 : 1,
                boxShadow: 'none', 
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.md,
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};
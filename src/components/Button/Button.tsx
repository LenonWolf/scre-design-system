import { useState } from 'react';
import type { ButtonProps } from './Button.types';
import { colors, typography, spacing, radii, motion } from '../../tokens';

export const Button = ({
    children,
    variant = 'primary',
    disabled = false,
    loading = false,
    success = false,
    onClick,
    ...props
}: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInteractive = !disabled && !loading && !success;

    const getBackgroundColor = () => {
        if (variant === 'secondary') return colors.white;
        
        if (disabled) return colors.disabled;
        if (success) return colors.success; 
        if (loading) return colors.primary; 
        if (isPressed) return colors.forest; 
        if (isHovered) return colors.primaryHover;
        return colors.primary; 
    };

    const getTextColor = () => {
        if (variant === 'primary') {
            if (success) return colors.forest; 
            return colors.white;
        }
    
        if (disabled) return colors.disabled;
        if (success) return colors.success;
        if (isPressed || isHovered) return colors.primaryHover;
        return colors.primary; 
    };

    const getBorder = () => {
        const borderWidth = isFocused ? '3px solid' : '1px solid';
        
        if (variant === 'secondary') {
            const borderColor = getTextColor(); 
            return `${borderWidth} ${borderColor}`;
        }
        
        if (isFocused) return `${borderWidth} ${colors.primaryHover}`;
        return `${borderWidth} transparent`; 
    };

    return (
        <button
            onClick={isInteractive ? onClick : undefined}
            disabled={disabled || loading || success}
            onMouseEnter={() => isInteractive && setIsHovered(true)}
            onMouseLeave={() => isInteractive && setIsHovered(false)}
            onMouseDown={() => isInteractive && setIsPressed(true)}
            onMouseUp={() => isInteractive && setIsPressed(false)}
            onFocus={() => isInteractive && setIsFocused(true)}
            onBlur={() => isInteractive && setIsFocused(false)}
            style={{
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
                border: getBorder(),
                borderRadius: radii.md,
                padding: `${spacing.md} ${spacing.xl}`,
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.accion,
                fontWeight: typography.weights.bold,
                cursor: isInteractive ? 'pointer' : (disabled ? 'not-allowed' : 'default'),
                transition: `all ${motion.hover}`, 
                opacity: loading ? 0.7 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.sm,
                outline: 'none', 
                transform: isPressed && isInteractive ? 'scale(0.98)' : 'scale(1)', 
            }}
            {...props}
        >
        {loading && <span>⏳</span>}
        {success && <span>✓</span>}
        {children}
        </button>
    );
};
import { useState } from 'react';
import type { InputProps } from './Input.types';
import { colors, typography, spacing, radii, motion } from '../../tokens';

export const Input = ({
    label,
    error,
    icon,
    fullWidth = true,
    disabled = false,
    value,
    onFocus,
    onBlur,
    ...props
}: InputProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isCompleted = value !== undefined && value !== '';
    const hasError = Boolean(error);

    const getBorder = () => {
        if (disabled) return `1px solid ${colors.disabled}`;
        
        if (hasError) return `3px solid ${colors.error}`; 
        
        if (isFocused) return `3px solid ${colors.primaryHover}`;
        
        if (isHovered || isCompleted) return `1px solid ${colors.primary}`;
        
        return `1px solid ${colors.border}`;
    };

    return (
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: spacing.xs,
                width: fullWidth ? '100%' : 'auto',
                fontFamily: typography.fontFamily,
            }}
        >
            {/* Etiqueta (Label) */}
            {label && (
                <label 
                style={{ 
                    fontSize: typography.sizes.apoyo, 
                    fontWeight: typography.weights.bold,
                    color: disabled ? colors.disabled : colors.text 
                }}
                >
                {label}
                </label>
            )}

            {/* Contenedor del Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {icon && (
                <span style={{ position: 'absolute', left: spacing.md, color: colors.text }}>
                    {icon}
                </span>
                )}
                
                <input
                    value={value}
                    disabled={disabled}
                    onMouseEnter={() => !disabled && setIsHovered(true)}
                    onMouseLeave={() => !disabled && setIsHovered(false)}
                    onFocus={(e) => {
                        if (!disabled) setIsFocused(true);
                        if (onFocus) onFocus(e);
                    }}
                    onBlur={(e) => {
                        if (!disabled) setIsFocused(false);
                        if (onBlur) onBlur(e);
                    }}
                    style={{
                        width: '100%',
                        backgroundColor: disabled ? colors.background : colors.white,
                        color: colors.text,
                        border: getBorder(),
                        borderRadius: radii.md,
                        padding: `${spacing.md}`,
                        paddingLeft: icon ? spacing.xl : spacing.md,
                        fontSize: typography.sizes.texto,
                        outline: 'none',
                        transition: `all ${motion.focus}`, // Transición suave
                        cursor: disabled ? 'not-allowed' : 'text',
                        opacity: disabled ? 0.6 : 1,
                    }}
                    {...props}
                />
                
                {/* Icono de error */}
                {hasError && (
                <span style={{ position: 'absolute', right: spacing.md, color: colors.error, fontWeight: 'bold' }}>
                    !
                </span>
                )}
            </div>

            {/* Mensaje de error o apoyo */}
            {typeof error === 'string' && (
                <span 
                    style={{ 
                        fontSize: typography.sizes.apoyo, 
                        color: colors.error, // Usamos tu color oscuro, no rojo
                        fontWeight: typography.weights.regular 
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
};
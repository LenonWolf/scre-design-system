import { useState } from 'react';
import type { RadioProps } from './Radio.types';
import { colors, typography, spacing, motion } from '../../tokens';

export const Radio = ({
    checked = false,
    disabled = false,
    label,
    onChange,
    ...props
}: RadioProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getBorder = () => {
        if (disabled) return `1px solid ${colors.disabled}`;
        if (isFocused) return `3px solid ${colors.primaryHover}`;
        if (checked) return `1px solid ${colors.primary}`;
        if (isHovered) return `1px solid ${colors.primaryHover}`;
        return `1px solid ${colors.border}`;
    };

    return (
        <label
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => !disabled && setIsHovered(false)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.sm,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                fontFamily: typography.fontFamily,
            }}
        >
            {/* Input nativo ocultos */}
            <input
                type="radio"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                    position: 'absolute',
                }}
                {...props}
            />

            {/* Círculo exterior */}
            <div
                style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: disabled ? colors.background : colors.white,
                    border: getBorder(),
                    borderRadius: '50%', // Circular
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: `all ${motion.hover}`,
                    boxSizing: 'border-box',
                }}
            >
                {/* Círculo interior */}
                {checked && (
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: disabled ? colors.disabled : colors.primary,
                            borderRadius: '50%',
                            transition: `all ${motion.hover}`,
                        }}
                    />
                )}
            </div>

            {/* Etiqueta */}
            {label && (
                <span style={{ fontSize: typography.sizes.texto, color: colors.text }}>
                    {label}
                </span>
            )}
        </label>
    );
};
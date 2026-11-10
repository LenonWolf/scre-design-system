import { useState } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import { colors, typography, spacing, radii, motion } from '../../tokens';

export const Checkbox = ({
    checked = false,
    disabled = false,
    label,
    onChange,
    ...props
}: CheckboxProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getBackgroundColor = () => {
        if (disabled) return colors.background;
        return checked ? colors.primary : colors.white;
    };

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
            {/* Input nativo */}
            <input
                type="checkbox"
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

            {/* Caja visual */}
            <div
                style={{
                width: '20px',
                height: '20px',
                backgroundColor: getBackgroundColor(),
                border: getBorder(),
                borderRadius: radii.sm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all ${motion.hover}`,
                boxSizing: 'border-box',
                }}
            >
                {/* Icono de check */}
                {checked && (
                    <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke={colors.white}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
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
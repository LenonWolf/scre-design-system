import { useState } from 'react';
import type { SwitchProps } from './Switch.types';
import { colors, typography, spacing, radii, motion } from '../../tokens';

export const Switch = ({
    checked = false,
    disabled = false,
    label,
    onChange,
    ...props
}: SwitchProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const getTrackColor = () => {
        if (disabled) return colors.disabled;
        return checked ? colors.primary : colors.border;
    };

    const getBorder = () => {
        if (isFocused) return `3px solid ${colors.primaryHover}`;
        return `3px solid transparent`; // Transparente para mantener el tamaño intacto
    };

    return (
        <label 
            style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: spacing.sm, 
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                fontFamily: typography.fontFamily
            }}
        >
            {/* Input nativo oculto para accesibilidad y manejo de eventos */}
            <input
                type="checkbox"
                role="switch"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ 
                    opacity: 0, 
                    width: 0, 
                    height: 0, 
                    position: 'absolute'
                }}
                {...props}
            />
            
            {/* La "pista" del interruptor */}
            <div 
                style={{
                    width: '48px',
                    height: '24px',
                    backgroundColor: getTrackColor(),
                    borderRadius: radii.xl,
                    position: 'relative',
                    transition: `all ${motion.hover}`,
                    border: getBorder(),
                    boxSizing: 'content-box',
                }}
            >
                {/* El "círculo" del interruptor */}
                <div 
                    style={{
                        width: '18px',
                        height: '18px',
                        backgroundColor: colors.white,
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '3px',
                        left: checked ? '27px' : '3px',
                        transition: `all ${motion.hover}`,
                    }}
                />
            </div>
            
            {/* Etiqueta opcional */}
            {label && (
                <span style={{ fontSize: typography.sizes.texto, color: colors.text }}>
                {label}
                </span>
            )}
        </label>
    );
};
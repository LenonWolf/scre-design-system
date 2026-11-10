import { useState, useRef, useEffect } from 'react';
import type { DropdownProps } from './Dropdown.types';
import { colors, typography, spacing, radii, motion } from '../../tokens';

export const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = 'Selecciona una opción',
    disabled = false,
    label,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getBorder = () => {
        if (disabled) return `1px solid ${colors.disabled}`;
        if (isOpen) return `3px solid ${colors.primaryHover}`;
        if (selectedOption) return `1px solid ${colors.primary}`;
        return `1px solid ${colors.border}`;
    };

    return (
        <div 
            ref={dropdownRef} 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: spacing.xs, 
                position: 'relative',
                fontFamily: typography.fontFamily,
                width: '100%'
            }}
        >
            {/* Etiqueta superior */}
            {label && (
                <span style={{ fontSize: typography.sizes.apoyo, fontWeight: typography.weights.bold, color: disabled ? colors.disabled : colors.text }}>
                    {label}
                </span>
            )}

            {/* Botón */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: disabled ? colors.background : colors.white,
                    border: getBorder(),
                    borderRadius: radii.md,
                    padding: spacing.md,
                    fontSize: typography.sizes.texto,
                    color: selectedOption ? colors.text : colors.disabled,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    transition: `all ${motion.hover}`,
                    opacity: disabled ? 0.6 : 1,
                    textAlign: 'left',
                    outline: 'none',
                }}
            >
                {selectedOption ? selectedOption.label : placeholder}
                
                {/* Icono de flecha */}
                <svg 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none" 
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: `transform ${motion.hover}`
                    }}
                >
                    <path d="M1 1.5L6 6.5L11 1.5" stroke={disabled ? colors.disabled : colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* Menú flotante */}
            {isOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: spacing.xs,
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.border}`,
                        borderRadius: radii.md,
                        padding: `${spacing.xs} 0`,
                        listStyle: 'none',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 10,
                    }}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false); // Cierra tras seleccionar
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.background)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            style={{
                                padding: `${spacing.sm} ${spacing.md}`,
                                cursor: 'pointer',
                                fontSize: typography.sizes.texto,
                                color: option.value === value ? colors.primary : colors.text,
                                fontWeight: option.value === value ? typography.weights.bold : typography.weights.regular,
                                transition: `background-color ${motion.hover}`,
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
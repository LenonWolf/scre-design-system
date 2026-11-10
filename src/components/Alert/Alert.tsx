import type { AlertProps } from './Alert.types';
import { colors, typography, spacing, radii } from '../../tokens';

export const Alert = ({
    variant,
    title,
    children,
    style,
    ...props
}: AlertProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'error':
                return {
                    bg: colors.white,
                    border: `3px solid ${colors.error}`,
                    text: colors.error,
                    icon: '!',
                };
            case 'success':
                return {
                    bg: colors.success,
                    border: `1px solid ${colors.success}`,
                    text: colors.forest,
                    icon: '✓',
                };
            case 'info':
            default:
                return {
                    bg: colors.info,
                    border: `1px solid ${colors.info}`,
                    text: colors.forest,
                    icon: 'i',
                };
        }
    };

    const theme = getVariantStyles();

    return (
        <div
            style={{
                backgroundColor: theme.bg,
                border: theme.border,
                borderRadius: radii.md,
                padding: spacing.md,
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing.md,
                fontFamily: typography.fontFamily,
                color: theme.text,
                ...style,
            }}
            {...props}
        >
            {/* Icono de la alerta */}
            <div 
                style={{
                    fontWeight: typography.weights.bold,
                    fontSize: typography.sizes.subtitulo,
                    lineHeight: 1,
                }}
            >
                {theme.icon}
            </div>

            {/* Contenido */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs, paddingTop: '4px' }}>
                {title && (
                    <span style={{ fontSize: typography.sizes.texto, fontWeight: typography.weights.bold }}>
                        {title}
                    </span>
                )}
                <span style={{ fontSize: typography.sizes.apoyo, fontWeight: typography.weights.regular }}>
                    {children}
                </span>
            </div>
        </div>
    );
};
import type { ModalProps } from './Modal.types';
import { colors, typography, spacing, radii, elevation } from '../../tokens';
import { Button } from '../Button';

export const Modal = ({
    isOpen,
    isConfirmed = false,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(17, 51, 35, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            {/* Contenedor del Modal */}
            <div
                style={{
                    backgroundColor: colors.white,
                    borderRadius: radii.lg,
                    padding: spacing.xl,
                    width: '100%',
                    maxWidth: '480px',
                    boxShadow: elevation.modal,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.lg,
                    fontFamily: typography.fontFamily,
                    cursor: 'default',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera */}
                {title && (
                    <h2 style={{ margin: 0, fontSize: typography.sizes.subtitulo, color: colors.text }}>
                        {title}
                    </h2>
                )}

                {/* Maneja el estado "Confirmado" */}
                <div style={{ fontSize: typography.sizes.texto, color: colors.text }}>
                    {isConfirmed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, color: colors.success }}>
                            <span style={{ fontSize: typography.sizes.titulo, fontWeight: typography.weights.bold }}>✓</span>
                            <span>Acción confirmada correctamente.</span>
                        </div>
                    ) : (
                        children
                    )}
                </div>

                {/* Botones de acción */}
                {!isConfirmed && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: spacing.md, marginTop: spacing.md }}>
                    <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                    {confirmText}
                    </Button>
                </div>
                )}
            </div>
        </div>
    );
};
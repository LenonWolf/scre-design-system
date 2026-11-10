import { useState } from 'react';
import type { TabsProps, TabItem } from './Tabs.types';
import { colors, typography, spacing, motion } from '../../tokens';

const TabButton = ({ 
    tab, 
    isActive, 
    onClick 
}: { 
    tab: TabItem; 
    isActive: boolean; 
    onClick: () => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getBorderBottom = () => {
        if (isActive) return `3px solid ${colors.primary}`;
        if (isHovered || isFocused) return `3px solid ${colors.primaryHover}`;
        return `3px solid transparent`;
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
                padding: `${spacing.md} ${spacing.lg}`,
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: getBorderBottom(),
                color: isActive ? colors.primary : colors.text,
                fontWeight: isActive ? typography.weights.bold : typography.weights.regular,
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.texto,
                transition: `all ${motion.hover}`,
                outline: 'none',
                flex: 1,
                textAlign: 'center',
            }}
        >
            {tab.label}
        </button>
    );
};

export const Tabs = ({
    tabs,
    activeTab,
    onChange,
    fullWidth = false,
}: TabsProps) => {
    return (
        <div
            style={{
                display: 'flex',
                borderBottom: `1px solid ${colors.border}`,
                width: fullWidth ? '100%' : 'max-content',
                fontFamily: typography.fontFamily,
            }}
        >
            {tabs.map((tab) => (
                <TabButton
                    key={tab.value}
                    tab={tab}
                    isActive={activeTab === tab.value}
                    onClick={() => onChange(tab.value)}
                />
            ))}
        </div>
    );
};
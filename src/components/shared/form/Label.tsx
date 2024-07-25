import { Typography } from 'antd';
import React from 'react';
const { Text } = Typography;

export interface LabelProps {
    disabled?: boolean;
    label: React.ReactNode;
}

function Label({ label, disabled }: LabelProps) {
    return label ? <Text disabled={disabled}>{label}</Text> : undefined;
}

export default Label;

import { formatNumber, isNumber } from '@/utils';
import { Typography } from 'antd';
const { Text } = Typography;

export interface INumberFormatProps {
    value: any;
}

function NumberFormat(props: INumberFormatProps) {
    const { value } = props;
    return <Text>{isNumber(value) ? formatNumber(value, '### ### ### ##0.00') : null}</Text>;
}

export default NumberFormat;

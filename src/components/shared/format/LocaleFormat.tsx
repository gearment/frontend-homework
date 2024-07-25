import { LOCALE_EN, LOCALE_VI, TLocales } from '@/data';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

type TLocaleFormatProps = {
    value: TLocales;
};
function LocaleFormat(props: TLocaleFormatProps) {
    const { value } = props;
    const t = useTranslations('Common.locale');
    return <Text>{value === LOCALE_EN ? t('en') : t('vi')}</Text>;
}

export default LocaleFormat;

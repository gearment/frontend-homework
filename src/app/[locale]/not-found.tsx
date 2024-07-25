import { HOME_PATH } from '@/data';
import { Button, Result } from 'antd';

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you are looking for does not exist!"
            extra={
                <Button type="primary" href={HOME_PATH}>
                    Back to Home
                </Button>
            }
        />
    );
}

export default NotFound;

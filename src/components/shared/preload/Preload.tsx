'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './style.css';

function Preload() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        const preloader = document.querySelector('.preload');

        if (!preloader) {
            return;
        }

        if (!loading) {
            const onTransitionEnd = (event: Event) => {
                if (event instanceof TransitionEvent && event.propertyName === 'opacity' && preloader.parentNode) {
                    preloader.parentNode?.removeChild(preloader);
                }
            };
            preloader.addEventListener('transitionend', onTransitionEnd);
            preloader.classList.add('preload__fade');

            if (getComputedStyle(preloader).opacity === '0' && preloader.parentNode) {
                preloader.parentNode?.removeChild(preloader);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    return (
        <div id="preload" className="preload">
            <LoadingOutlined spin />
        </div>
    );
}

export default Preload;

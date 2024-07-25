'use client';
import { ModalContext } from '@/contexts';
import React from 'react';

export const useModal = <M extends string[] = string[]>() => {
    const { data, setData } = React.useContext(ModalContext);

    const open = (name: M[number]) => {
        if (!name) return;
        if (data.opens.includes(name)) return;
        setData((prev) => ({
            ...prev,
            opens: [...prev.opens, name],
        }));
    };

    const close = (name: M[number], shouldCallback: boolean = true) => {
        if (!name) return;
        if (!data.opens.includes(name)) return;
        setData((prev) => ({
            ...prev,
            opens: prev.opens.filter((open) => open !== name),
        }));
        if (shouldCallback) {
            const cb = data.callbacks[name];
            if (cb instanceof Function) cb();
        }
    };

    const closeAll = (shouldCallback: boolean = true) => {
        setData((prev) => ({
            ...prev,
            opens: [],
        }));
        if (shouldCallback) {
            const callbacks = data.opens.map((open) => {
                const cb = data.callbacks[open];
                if (cb instanceof Function) return cb();
            });
            Promise.allSettled(callbacks);
        }
    };

    const check = (name: M[number]) => !!data.opens.includes(name);

    return {
        opens: data.opens as M,
        open,
        close,
        closeAll,
        check,
    };
};

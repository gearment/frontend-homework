import React, { createContext, useState, PropsWithChildren, useMemo } from 'react';
import { TModalContext, TModalContextData } from '@/types';

export const ModalContext = createContext<TModalContext>({
    data: { opens: [], callbacks: {} },
    setData: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<TModalContextData>({
        opens: [],
        callbacks: {},
    });

    const contextValue = useMemo(
        () => ({
            data,
            setData,
        }),
        [data],
    );

    return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

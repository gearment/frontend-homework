export type TModalContextData<T extends string[] = string[]> = {
    opens: T;
    callbacks: {
        [key in T[number]]: (() => void) | undefined;
    };
};

export type TModalContext<T extends string[] = string[]> = {
    data: TModalContextData<T>;
    setData: React.Dispatch<React.SetStateAction<TModalContextData<T>>>;
};

export type TWithModalProps = {
    open?: boolean;
    onClose?: () => void;
    closeCallback?: () => void;
};

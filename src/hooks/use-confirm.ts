import { App, ModalFuncProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const useConfirmModal = () => {
    const tC = useTranslations('Common');
    const { modal } = App.useApp();

    const customConfirmModal = useMemo(
        () => ({
            error: (props?: ModalFuncProps) => {
                modal.error({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            info: (props?: ModalFuncProps) => {
                modal.info({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            success: (props?: ModalFuncProps) => {
                modal.success({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('notify.save_success') });
            },
            confirmClose: (props?: ModalFuncProps) => {
                modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('modal.confirm') });
            },
            confirmSave: (props?: ModalFuncProps) => {
                modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('form.confirm.save') });
            },
            confirm: (props?: ModalFuncProps) => {
                modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            waring: (props?: ModalFuncProps) => {
                modal.warning({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
        }),

        [modal, tC],
    );

    return customConfirmModal;
};

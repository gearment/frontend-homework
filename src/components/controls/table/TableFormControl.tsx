import DraggableRow from '@/components/controls/table/DraggableRow';
import NumberFormat from '@/components/shared/format/NumberFormat';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Row, Table, TableColumnType, TableProps, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { Fragment, Key, useEffect, useRef } from 'react';
import { FieldValues, UseFieldArrayReturn, useFieldArray, useFormContext } from 'react-hook-form';

const { Text } = Typography;

export const defaultKeys = ['ArrowDown', 'ArrowUp'];

export type ITableFormControlKeyEvent = 'ArrowDown' | 'ArrowUp';

export interface CustomMyKeyDownEvent extends globalThis.KeyboardEvent {
    target: Element;
}

export interface ITableFormControlProps<T> {
    disabled?: boolean;
    name: string;
    label?: React.ReactNode;
    defaultValue: T;
    columns: TableColumnType<T>[];
    keys?: ITableFormControlKeyEvent[];
    tableProps: TableProps;
    focusFieldAfterAdd?: string;
    addable?: boolean;
    indexable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    onChangeSelection?: (method: UseFieldArrayReturn<FieldValues, string, 'id'>, selectedRowKeys: Key[], selectRows: any[]) => void;
}

function TableFormControl<T>(props: ITableFormControlProps<T>) {
    const {
        disabled,
        name,
        label,
        defaultValue = {},
        keys = defaultKeys,
        columns,
        tableProps,
        focusFieldAfterAdd,
        addable = true,
        indexable = true,
        deletable = true,
        draggable = true,
        onChangeSelection,
    } = props;

    const tableRef = useRef<HTMLDivElement>(null);

    const tC = useTranslations('Common');
    const tT = useTranslations('Common.table');

    const {
        control,
        formState: { errors },
        setFocus,
    } = useFormContext();

    const methodArray = useFieldArray({
        control,
        name,
    });

    const { fields, remove, append, swap } = methodArray;

    const onAdd = () => {
        append(defaultValue);
        setTimeout(() => {
            if (focusFieldAfterAdd) {
                setFocus(`${name}[${fields.length}]${focusFieldAfterAdd}`);
            }
        }, 200);
    };

    const onRemove = (index: number) => {
        remove(index);
    };

    const indexColumn: TableColumnType<T> = {
        fixed: 'left',
        title: tT('columns.index'),
        dataIndex: 'id',
        key: 'id',
        width: 80,
        align: 'center',
        render: (_, __, index) => <NumberFormat value={index + 1} />,
    };

    const operateColumn: TableColumnType<T> = {
        title: tT('columns.operation.label'),
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: (_, __, index) => {
            return <Button size="middle" icon={<DeleteOutlined />} type="link" onClick={() => onRemove(index)} disabled={disabled} />;
        },
    };

    const dragColumn: TableColumnType<T> = {
        key: 'sort',
        fixed: 'right',
        width: 60,
    };

    const columnsWithOperation: TableColumnType<T>[] = [...(indexable ? [indexColumn] : []), ...columns, ...(deletable ? [operateColumn] : []), ...(draggable ? [dragColumn] : [])];

    const getNewTarget = (key: string, id: string, index: number) => {
        if (key === 'ArrowDown') {
            return id.replace(/\[(\d+)\]/, `[${index + 1}]`);
        }
        if (key === 'ArrowUp') {
            return id.replace(/\[(\d+)\]/, `[${index - 1}]`);
        }
        return '';
    };

    const onDragStart = () => {
        const elementContent = tableRef.current?.getElementsByClassName('ant-table-content')[0] as HTMLElement;
        if (elementContent) elementContent.style.overflow = 'hidden hidden';
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        const elementContent = tableRef.current?.getElementsByClassName('ant-table-content')[0] as HTMLElement;
        if (elementContent) elementContent.style.overflow = 'auto hidden';

        if (active.id && over?.id && active.id !== over.id) {
            const indexActive = fields.findIndex((item) => item.id === active.id);
            const indexOver = fields.findIndex((item) => item.id === over.id);
            swap(indexActive, indexOver);
        }
    };

    useEffect(() => {
        const ref_ = tableRef;
        const handleKeyPress = (event: globalThis.KeyboardEvent) => {
            const a = event as CustomMyKeyDownEvent;
            if (a && keys.includes(event.key)) {
                a.preventDefault();
                const id = a.target.id;
                const match = id.match(/\[(\d+)\]/);

                const index = parseFloat(match ? match[1] : '0');
                const target = getNewTarget(event.key, id, index);

                setFocus(target);
            }
        };
        if (ref_.current) {
            ref_.current.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (ref_.current) {
                ref_.current.removeEventListener('keydown', handleKeyPress);
            }
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys]);

    return (
        <Fragment>
            <Row gutter={[12, 12]} align="middle" justify="space-between" style={label || addable ? { marginBottom: 8 } : {}}>
                <Text strong className="margin-right">
                    {label}
                    {` `}
                    <Text type="danger">
                        <ErrorMessage errors={errors} name={name} />
                    </Text>
                </Text>
                {addable ? (
                    <Button title={tC('form.add')} type="primary" disabled={disabled} size="middle" icon={<PlusOutlined />} onClick={onAdd}>
                        {tC('form.add')}
                    </Button>
                ) : null}
            </Row>
            <Row gutter={[12, 12]}>
                <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                    <SortableContext disabled={disabled || !draggable} items={fields.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <Table
                            dataSource={fields}
                            {...tableProps}
                            components={
                                draggable
                                    ? {
                                          body: {
                                              row: DraggableRow,
                                          },
                                      }
                                    : undefined
                            }
                            rowSelection={
                                tableProps?.rowSelection
                                    ? {
                                          selectedRowKeys: fields?.filter((item: any) => item?.__selected)?.map((item) => item.id as Key),
                                          onChange: (selectedRowKeys: Key[], selectedRows: T[]) => {
                                              if (onChangeSelection instanceof Function) {
                                                  onChangeSelection(methodArray, selectedRowKeys, selectedRows);
                                              }
                                          },
                                          ...tableProps?.rowSelection,
                                      }
                                    : undefined
                            }
                            columns={columnsWithOperation}
                            rowKey={(record) => record.id}
                        />
                    </SortableContext>
                </DndContext>
            </Row>
        </Fragment>
    );
}

export default TableFormControl;

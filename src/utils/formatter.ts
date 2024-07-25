import { DATE_FORMAT_HM_DMY, DATE_FORMAT_UTC_ISO, locales } from '@/data';
import { getDefaultAdditional } from '@/data/common/additional-data';
import { KeyValueArray } from '@/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function get(object: any, path: string | string[], defaultValue?: any): any {
    // Convert path to array if it's a string
    const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key.length > 0);

    // Iterate through the path array to access nested properties
    let current = object;
    for (const key of pathArray) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            // Return default value if property is not found
            return defaultValue;
        }
    }

    return current;
}

export function cloneDeep<T>(value: T): T {
    if (value == null || typeof value !== 'object') {
        return value;
    }

    const clonedObject: any = Array.isArray(value) ? [] : {};
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            clonedObject[key] = cloneDeep(value[key]);
        }
    }
    return clonedObject;
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
}

export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}

export const debounce = (fn: Function, ms: number) => {
    let t: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(t);
        t = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};

export const throttle = (fn: Function, ms: number) => {
    let t: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        if (t !== null) return;
        t = setTimeout(() => {
            fn(...args);
            t = null;
        }, ms);
    };
};

export const scrollIntoView = ({ selector, scrollOptions, offset = 0 }: { selector: string; scrollOptions?: ScrollOptions; offset?: number }) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, ...scrollOptions });
};

export async function copyToClipboard(text: string): Promise<boolean> {
    if ('clipboard' in navigator) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            return false;
        }
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);

        textarea.select();
        const success = document.execCommand('copy');

        document.body.removeChild(textarea);

        return success;
    }
}

export function isEmptyObject(obj: Record<string, any>): boolean {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

export function snakeCase(str: string): string {
    return str
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .replace(/\s+/g, '_')
        .replace(/-/g, '_');
}

export const stringFormat = (input: string, ...replacer: any[]) => {
    for (let i = 0; i < replacer.length; i++) {
        input = input.replaceAll(`{${i}}`, replacer[i] + '');
    }
    return input;
};

export const phoneFormat = (phone: string, defaultValue = '--') => {
    if (phone?.length > 0) {
        const arr = phone.split('');
        arr.splice(-3, 0, ' ');
        arr.splice(-7, 0, ' ');
        return arr.join('');
    }
    return defaultValue;
};

export const isNumeric = (value: any) => {
    return value && typeof value === 'string' && !isNaN(parseFloat(value));
};

export const isStringBoolean = (value: any) => {
    return (value && typeof value === 'string' && value === 'true') || value === 'false' ? true : false;
};

export const getBoolean = (value: any) => {
    return value === 'true' || value === 1 || value === '1' || value == true || value != null || value != undefined;
};

export const getNumber = (value: any) => {
    return isNumeric(value) && parseFloat(value);
};

export const numberFormat = (value: number) => {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(value);
};

export const dateFormat = (value: Date | number | string | undefined, format: string = DATE_FORMAT_HM_DMY, utc = false, defaultValue = '--') => {
    const dayValue = value && dayjs(value);
    return dayValue ? (utc ? dayValue.utc().format(format) : dayValue.format(format)) : defaultValue;
};

export const dateMatchFormat = (str: any, format: string) => {
    return str && typeof str === 'string' && dayjs(str, format).valueOf() > 0;
};

export const arrayUnique = (arr: (string | number)[]) => {
    return arr?.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};

export const getUniqueObjectByKey = <T>(arr: T[], key: keyof T): T[] => {
    return arr.reduce((acc: T[], curr: any) => {
        const index = acc.findIndex((obj) => obj[key] === curr[key]);
        if (index === -1) {
            acc.push(curr);
        }
        return acc;
    }, []);
};

export const arrayToTree = (array: any[], id = 'id', parentId = 'pid', children = 'children') => {
    const result: any = [];
    const hash: any = {};
    const data = cloneDeep(array);

    data.forEach((_, index) => {
        const value: any = data?.[index]?.[id] ?? undefined;
        if (value) {
            hash[value as keyof typeof hash] = data[index];
        }
    });

    data.forEach((item) => {
        const hashParent = hash[item[parentId]];
        if (hashParent) {
            !hashParent[children] && (hashParent[children] = []);
            hashParent[children].push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

export function queryAncestors(array: any, current: any, parentId: string, id = 'id') {
    const result = [current];
    const hashMap = new Map();
    array.forEach((item: any) => hashMap.set(item[id], item));

    const getPath = (current: any) => {
        const currentParentId = hashMap.get(current?.[id])?.[parentId];
        if (currentParentId) {
            result.push(hashMap.get(currentParentId));
            getPath(hashMap.get(currentParentId));
        }
    };

    getPath(current);
    return result;
}

export const getAllChildrenById = <T>(nodes: T[], key: any, id: keyof T, parent_id: keyof T): T[] => {
    const results: T[] = [];

    const node = nodes.find((n) => n?.[id] === key);

    if (node) {
        const children = nodes.filter((n) => n?.[parent_id] === node?.[id]);
        for (let child of children) {
            results.push(child);
            const childResults = getAllChildrenById(nodes, child?.[id], id, parent_id);
            results.push(...childResults);
        }
    }

    return results;
};

export function formatDateToString(data: Date, type: 'start' | 'end' | 'original' = 'original', format = DATE_FORMAT_UTC_ISO) {
    const value = data && dayjs(data);
    if (!value) return undefined;
    if (type === 'start') return value.startOf('date').format(format);
    if (type === 'end') return value.endOf('date').format(format);
    return value.format(format);
}

export function getValueBooleanSelect(value: string) {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return undefined;
}

export function findAllBranches<T>(node: T, nodes: T[], id: keyof T, parent_id: keyof T, branch: any[] = []): any[][] {
    branch.push(node?.[id]); // add current node to branch path
    const children = nodes.filter((n) => n?.[parent_id] === node?.[id]); // find children of current node
    if (children.length === 0) {
        return [branch]; // if node has no children, return the current branch
    }
    const branches: number[][] = [];
    for (const child of children) {
        const childBranches = findAllBranches(child, nodes, id, parent_id, [...branch]); // recursively find child branches
        branches.push(...childBranches); // add child branches to result
    }
    return branches;
}

interface Node {
    menu_id: number;
    parent_menu_id: number;
    value: string;
}

export function updateTree(node: Node, tree: Node[]): void {
    // Find the parent node
    const parent = tree.find((n) => n.menu_id === node.parent_menu_id);
    if (parent) {
        // If the parent node's value does not start with "1" and the current node's value starts with "1",
        // update the parent node's value to start with "1"
        if (!parent.value.startsWith('1') && node.value.startsWith('1')) {
            parent.value = '1' + parent.value.slice(1);
        }
        // Recursively update the parent node's parent if it exists
        if (parent.parent_menu_id !== 0) {
            updateTree(parent, tree);
        }
    }
}

export const getFileExtension = (filename: string) => {
    return filename.split('.').pop() ?? '';
};

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function findAllLeafNodes<T>(treeData: T[], id: keyof T, parent_id: keyof T, children = 'children') {
    const leafNodes: T[] = [];

    function traverseNode(node: T) {
        const children_ = node?.[children as keyof typeof node] as T[];
        if (!children_ || children_?.length === 0) {
            leafNodes.push(node);
        } else {
            children_?.forEach((childNode: T) => {
                traverseNode(childNode);
            });
        }
    }

    treeData.forEach((node) => {
        if (!node?.[parent_id]) {
            traverseNode(node);
        }
    });

    return leafNodes;
}

export function formatNumber(number: number, format: string, decimalSeparator = '.', groupSeparator = ' '): string {
    let valueOf = Number(number);
    if (format === '') {
        if (Number.isNaN(valueOf)) return '';
        return number.toString();
    }

    let formatArray = format.split(decimalSeparator);
    let formatLeft = formatArray[0];

    if (valueOf === 0 || Number.isNaN(valueOf)) {
        if (formatArray[0].includes('0')) return '0';
        else return '';
    }

    let stringNumber = number.toString();
    let numberArray = stringNumber.split(decimalSeparator);

    let left = Math.floor(number).toString();
    for (let i = formatLeft.length - 1, j = 0; i >= 0; i--, j++) {
        if (formatLeft[i] === groupSeparator && j < left.length) {
            left = left.slice(0, left.length - j) + groupSeparator + left.slice(left.length - j);
        }
    }

    if (formatArray.length === 1 || numberArray.length === 1) return left;

    let rightFormat = formatArray[1];
    let rightNumber = Number.parseFloat(stringNumber.split(decimalSeparator)[1]);

    let right = formatNumber(rightNumber, rightFormat);
    if (right.length > formatArray[1].length) right = right.slice(0, formatArray[1].length);
    else if (right.length < formatArray[1].length) {
        for (let i = right.length; i < formatArray[1].length; i++) right += formatArray[1][i];
    }

    return `${left}${decimalSeparator}${right}`;
}

export function removeVietnameseAccents(sentence: string = ''): string {
    if (typeof sentence !== 'string' || sentence === null || sentence === undefined) {
        return sentence;
    }
    const accents = [
        /[\u0110]/g, // Đ
        /[\u0111]/g, // đ
    ];

    const letters = ['D', 'd'];

    let result = sentence;

    for (let i = 0; i < accents.length; i++) {
        result = result.replace(accents[i], letters[i]);
    }
    // diacritical marks
    return result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function compareIgnoreCase(str1: string, str2: string): boolean {
    return str1.toLowerCase() === str2.toLowerCase();
}

export function compareIgnoreCaseVietnamese(str1: string = '', str2: string = ''): boolean {
    if (!str1 || !str2) return false;
    const convertStr1 = removeVietnameseAccents(str1) ?? '';
    const convertStr2 = removeVietnameseAccents(str2) ?? '';
    if (!convertStr1 || !convertStr2) return false;
    return convertStr1.toLowerCase() === convertStr2.toLowerCase();
}

export function recordToArray<T>(record?: Record<string, T>): KeyValueArray<T> {
    return record ? Object.entries(record).map(([key, value]) => ({ key, value })) : [];
}

export function arrayToRecord<T>(array?: KeyValueArray<T>): Record<string, T | undefined> | undefined {
    const record: Record<string, T | undefined> = {};
    array?.forEach((item) => {
        record[item.key] = item.value;
    });
    return array ? record : undefined;
}

export const recordToArrayWithDefaultTranslation = <T>(
    record?: Record<string, T | undefined>,
    config?: {
        key?: string;
        defaultValue?: Record<string, KeyValueArray<T>[number]>;
    },
): KeyValueArray<T> | undefined => {
    const { key, defaultValue } = config || {};
    const value = record ? Object.entries(record).map(([key, value]) => ({ key, value })) : [];

    locales.forEach((locale) => {
        const isContain = record && Object.keys(record).includes(locale);

        if (!isContain) value.unshift(defaultValue?.[locale] || (getDefaultAdditional(key || '') as any));
    });

    return value;
};

export const formatNumberV2 = (amount: number, options?: Intl.NumberFormatOptions): string => {
    const formatter = new Intl.NumberFormat('vi-VN', options);
    return formatter.format(amount);
};

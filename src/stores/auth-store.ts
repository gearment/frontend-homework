import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { AUTH, STATE } from '@/data';
import { getCookieJson, setCookieJson } from '@/utils';

type AuthData = {
    initializing: boolean;
    logged: boolean;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    tokenType: string | undefined;
    user: any;
};

type AuthStore = {
    actions: {
        init: () => void;
        clearTokens: () => void;
        setToken: (data: { accessToken: string }) => void;
        login: (data: { accessToken: string; refreshToken: string; tokenType: string }) => void;
        logout: () => void;
        setUser: (user: any) => void;
    };
} & AuthData;

const setAuthCookies = (data: Omit<AuthData, 'user' | 'isAutoLogin' | 'initializing'>) => {
    setCookieJson(STATE, {
        [AUTH]: data,
    });
};

const authStore = createStore<AuthStore>()((set, get) => ({
    initializing: true,
    isAutoLogin: true,
    logged: false,
    accessToken: undefined,
    refreshToken: undefined,
    tokenType: undefined,
    user: undefined,
    actions: {
        init: () => {
            const state = getCookieJson(STATE);
            const value = state?.[AUTH];
            if (!value) {
                set({
                    initializing: false,
                });
                return;
            }
            set({
                ...value,
                initializing: false,
            });
        },
        login: ({ accessToken, refreshToken, tokenType }) => {
            set({
                logged: true,
                accessToken,
                refreshToken,
            });
            setAuthCookies({
                logged: true,
                accessToken,
                refreshToken,
                tokenType,
            });
        },
        logout: () => {
            set({
                logged: false,
                accessToken: undefined,
                refreshToken: undefined,
                tokenType: undefined,
            });
            setAuthCookies({
                logged: false,
                accessToken: undefined,
                refreshToken: undefined,
                tokenType: undefined,
            });
        },

        setToken: ({ accessToken }) => {
            set({
                accessToken,
            });
            setAuthCookies({
                logged: get().logged,
                refreshToken: get().refreshToken,
                accessToken,
                tokenType: get().tokenType,
            });
        },

        clearTokens: () => {
            set({
                accessToken: undefined,
                refreshToken: undefined,
                tokenType: undefined,
            });
            setAuthCookies({
                logged: get().logged,
                accessToken: undefined,
                refreshToken: undefined,
                tokenType: undefined,
            });
        },
        setUser: (user) => {
            set({
                user,
            });
        },
    },
}));

export type ExtractState<S> = S extends {
    getState: () => infer T;
}
    ? T
    : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const initializingSelector = (state: ExtractState<typeof authStore>) => state.initializing;
const tokenTypeSelector = (state: ExtractState<typeof authStore>) => state.tokenType;
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
const loggedSelector = (state: ExtractState<typeof authStore>) => state.logged;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;
const userSelector = (state: ExtractState<typeof authStore>) => state.user;

// getters
export const getInitializing = () => initializingSelector(authStore.getState());
export const getTokenType = () => tokenTypeSelector(authStore.getState());
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getLogged = () => loggedSelector(authStore.getState());
export const getAuthActions = () => actionsSelector(authStore.getState());
export const getUser = () => userSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1]) {
    return useStore(authStore, selector);
}

// Hooks
export const useTokenType = () => useAuthStore(tokenTypeSelector);
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useLogged = () => useAuthStore(loggedSelector);
export const useAuthActions = () => useAuthStore(actionsSelector);
export const useUser = () => useAuthStore(userSelector);
export const useInitializing = () => useAuthStore(initializingSelector);

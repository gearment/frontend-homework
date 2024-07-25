import { ILoginPayload, TLoginResponse, TRefreshTokenResponse } from '@/types';
import { getBeURL, getLocalRefreshToken, networkHandler } from '@/utils';
import axios, { AxiosResponse } from 'axios';

function login(payload: ILoginPayload) {
    return networkHandler.post<unknown, AxiosResponse<TLoginResponse>, unknown>(getBeURL('authSignIn'), { ...payload })?.then((rp) => rp?.data);
}

function refreshToken(token?: string, tokenType = 'Bearer') {
    return axios.post<unknown, AxiosResponse<TRefreshTokenResponse>, unknown>(getBeURL('authRefreshToken'), {
        headers: { Authorization: tokenType + ' ' + (token ?? getLocalRefreshToken()) },
    });
}

function getUserByToken() {
    return networkHandler.get<unknown, AxiosResponse<any>, unknown>(getBeURL('authGetMe')).then((rp) => rp.data);
}

const authApi = { login, refreshToken, getUserByToken };

export default authApi;

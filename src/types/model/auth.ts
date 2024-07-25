export type TLoginFormValues = {
    username: string;
    password: string;
};

export type ILoginPayload = {
    username: string;
    password: string;
};

export type TLoginResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
        tokenType: string;
    };
};

export type TRefreshTokenResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
        tokenType: string;
    };
};

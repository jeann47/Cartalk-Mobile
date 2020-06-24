export function PhoneVerifyReq(phone) {
    return {
        type: '@auth/PHONE_VERFIY',
        payload: { phone },
    };
}
export function UserExist(data) {
    return {
        type: '@auth/USER_EXIST',
        payload: { data },
    };
}
export function PhoneVerifyOk(phone) {
    return {
        type: '@auth/PHONE_VERFIY_OK',
        payload: { phone },
    };
}
export function PhoneCheckReq(code, phone) {
    return {
        type: '@auth/PHONE_CHECK_REQ',
        payload: { code, phone },
    };
}
export function PhoneCheckOk() {
    return {
        type: '@auth/PHONE_CHECK_OK',
    };
}
export function PhoneFailed() {
    return {
        type: '@auth/PHONE_FAILED',
    };
}

export function signInReq(phone, password) {
    return {
        type: '@auth/SIGN_IN_REQ',
        payload: { phone, password },
    };
}

export function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token, user },
    };
}

export function signUpReq(phone, name, password) {
    return {
        type: '@auth/SIGN_UP_REQ',
        payload: { phone, name, password },
    };
}

export function signUpSuccess(phone, password) {
    return {
        type: '@auth/SIGN_UP_SUCCESS',
        payload: { phone, password },
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}

export function refreshToken(token) {
    return {
        type: '@token/REFRESH',
        payload: { token },
    };
}

export function refreshFailed() {
    return {
        type: '@token/REFRESH_FAILURE',
    };
}

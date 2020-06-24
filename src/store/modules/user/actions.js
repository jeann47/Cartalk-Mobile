export function updateProfileReq(data) {
    return {
        type: '@user/UPDATE_PROFILE_REQ',
        payload: { data },
    };
}
export function updateProfileSuccess(profile) {
    return {
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { profile },
    };
}
export function updateProfileFailure() {
    return {
        type: '@user/UPDATE_PROFILE_FAILURE',
    };
}

export function deleteProfile(password) {
    return {
        type: '@user/DELETE',
        payload: { password },
    };
}

export function deleted() {
    return {
        type: '@auth/SIGN_OUT',
    };
}

export function deleteFailed() {
    return {
        type: '@user/DELETE_FAILED',
    };
}

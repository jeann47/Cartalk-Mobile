import produce from 'immer';

const INITIAL_STATE = {
    oldToken: null,
    token: null,
    signed: false,
    loading: false,
    phone: '',
    verified: false,
    code: '',
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@auth/PHONE_VERFIY': {
                draft.loading = true;
                break;
            }
            case '@auth/PHONE_VERFIY_OK': {
                draft.phone = action.payload.phone;
                draft.loading = false;
                break;
            }
            case '@auth/PHONE_CHECK_REQ': {
                draft.loading = true;
                draft.code = action.payload.code;
                draft.phone = action.payload.phone;
                break;
            }
            case '@auth/USER_EXIST': {
                draft.loading = false;
                draft.verified = true;
                draft.code = '';
                break;
            }
            case '@auth/PHONE_CHECK_OK': {
                draft.loading = false;
                draft.code = '';
                draft.verified = true;
                break;
            }
            case '@auth/PHONE_FAILED': {
                draft.loading = false;
                draft.code = '';
                draft.phone = '';
                break;
            }
            case '@auth/SIGN_UP_REQ': {
                draft.phone = action.payload.phone;
                draft.name = action.payload.name;
                draft.password = action.payload.password;
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_REQ': {
                draft.phone = action.payload.phone;
                draft.password = action.payload.password;
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                draft.phone = '';
                draft.name = null;
                draft.password = null;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_UP_SUCCESS': {
                draft.phone = action.payload.phone;
                draft.password = action.payload.password;
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.token = null;
                draft.signed = false;
                draft.verified = false;
                break;
            }
            case '@token/REFRESH': {
                draft.oldToken = draft.token;
                draft.token = action.payload.token;
                break;
            }
            case '@token/REFRESH_FAILURE': {
                draft.token = draft.oldToken;
                draft.oldToken = null;
                break;
            }
            default:
        }
    });
}

import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import {
    signInSuccess,
    signFailure,
    PhoneVerifyOk,
    UserExist,
    signUpSuccess,
    PhoneCheckOk,
    PhoneFailed,
    refreshFailed,
} from './actions';

export function* VerifyPhone({ payload }) {
    try {
        const { phone } = payload;

        const res = yield call(api.post, 'phone/send', { phone });

        yield put(PhoneVerifyOk(res.data.phone));
    } catch (err) {
        Alert.alert('Erro na verificação', 'Verifique seu número');
        yield put(PhoneFailed());
    }
}
export function* CheckPhone({ payload }) {
    try {
        const { code, phone } = payload;
        const res = yield call(api.post, 'phone/check', { code, phone });
        if (!res.data) {
            yield put(PhoneCheckOk());
        } else if (res.data.token) {
            yield put(UserExist(res.data));
        }
    } catch (err) {
        Alert.alert('Erro na verificação', 'Confira o código!');
        yield put(PhoneFailed());
    }
}
export function* signIn({ payload }) {
    try {
        const { phone, password } = payload;
        const res = yield call(api.post, 'sessions', { phone, password });
        const { token, user } = res.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
    } catch (err) {
        Alert.alert('Falha na autenticação', 'verifique seus dados!');
        yield put(signFailure());
    }
}
export function* autoSignIn({ payload }) {
    try {
        const { user, token } = payload.data;
        api.defaults.headers.authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
    } catch (err) {
        Alert.alert('Falha na autenticação', 'verifique seus dados!');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { phone, name, password } = payload;
        yield call(api.post, 'users', { phone, name, password });
        yield put(signUpSuccess(phone, password));
    } catch (err) {
        Alert.alert('Falha ao cadastrar', 'verifique seus dados!');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
    }
}

export function* newToken({ payload }) {
    const backupHeader = api.defaults.headers.authorization;
    try {
        const { token } = payload;
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
    } catch (error) {
        yield put(refreshFailed());
        api.defaults.headers.authorization = backupHeader;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/PHONE_VERFIY', VerifyPhone),
    takeLatest('@auth/PHONE_CHECK_REQ', CheckPhone),
    takeLatest('@auth/USER_EXIST', autoSignIn),
    takeLatest('@auth/SIGN_IN_REQ', signIn),
    takeLatest('@auth/SIGN_UP_REQ', signUp),
    takeLatest('@auth/SIGN_UP_SUCCESS', signIn),
    // takeLatest('@token/REFRESH', newToken),
]);

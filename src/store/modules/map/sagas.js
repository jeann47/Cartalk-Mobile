import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ToastAndroid } from 'react-native';

import api from '~/services/api';

import { gotUsers } from './actions';
import { refreshToken } from '../auth/actions';

export function* findUsers({ payload }) {
    try {
        const { near } = payload;
        if (near.length > 0) {
            const users = yield call(api.get, `users/near`, {
                params: { near },
            });
            if (users.data.newToken) {
                yield put(refreshToken(users.data.newToken));
            }
            if (users.data.user) yield put(gotUsers(users.data.user));
            else throw new Error();
        }
    } catch (error) {
        ToastAndroid.showWithGravity(
            `Ocorreu um erro, tente novamente mais tarde!`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    }
}

export default all([takeLatest('@map/GET', findUsers)]);

import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import {
    updateProfileSuccess,
    updateProfileFailure,
    deleteFailed,
    deleted,
} from './actions';
import { refreshToken } from '../auth/actions';

export function* updateProfile({ payload }) {
    try {
        const res = yield call(api.put, 'users', payload);
        Alert.alert('Sucesso!', 'Perfil atualizado!');

        if (res.data.newToken) {
            yield put(refreshToken(res.data.newToken));
        }
        yield put(updateProfileSuccess(res.data.user));
    } catch (err) {
        Alert.alert('Erro ao atualizar o perfil!', 'verifique seus dados!');
        yield put(updateProfileFailure());
    }
}

export function* deleteProfile({ payload }) {
    try {
        const { password } = payload;
        const res = yield call(api.delete, `users/${password}`);
        if (res.data.newToken) {
            yield put(refreshToken(res.data.newToken));
        }
        if (!res) {
            Alert.alert(
                'Erro ao deletar o perfil!',
                'tente novamente mais tarde!'
            );
            yield put(deleteFailed());
        } else yield put(deleted());
    } catch (err) {
        Alert.alert('Erro ao deletar o perfil!', 'tente novamente mais tarde!');
        yield put(deleteFailed());
    }
}

export default all([
    takeLatest('@user/UPDATE_PROFILE_REQ', updateProfile),
    takeLatest('@user/DELETE', deleteProfile),
]);

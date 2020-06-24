import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
    const persistedReducer = persistReducer(
        {
            key: 'cartalk',
            storage: AsyncStorage,
            whitelist: ['auth', 'user', 'settings'],
        },
        reducers
    );
    return persistedReducer;
};

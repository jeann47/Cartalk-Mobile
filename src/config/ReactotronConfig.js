import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { REACTOTRON_HOST as host } from 'react-native-dotenv';

if (__DEV__) {
    const tron = Reactotron.configure({ host })
        .setAsyncStorageHandler(AsyncStorage)
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}

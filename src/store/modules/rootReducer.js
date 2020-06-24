import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import map from './map/reducer';
import settings from './Settings/reducer';

export default combineReducers({ auth, user, map, settings });

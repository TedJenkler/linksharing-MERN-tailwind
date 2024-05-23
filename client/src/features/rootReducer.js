import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import linksSlice from './links/linksSlice';

const rootReducer = combineReducers({
    user: userSlice,
    links: linksSlice
  });

  export default rootReducer;
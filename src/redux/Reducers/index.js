import { combineReducers } from 'redux';

import Auth from './Auth.reducer';
import DataReducer from './Data.reducer';
import Welcome from './Welcome.reducer';
import RefreshReducer from './Refresh.reducer';
import PurchaseReducer from './Purchase.reducer';
import PointsReducer from './Points.reducers';

export default combineReducers({
  welcome: Welcome,
  auth: Auth,
  data: DataReducer,
  refresh: RefreshReducer,
  purchase: PurchaseReducer,
  points: PointsReducer,
});
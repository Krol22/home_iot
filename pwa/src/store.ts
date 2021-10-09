import { combineReducers, configureStore } from '@reduxjs/toolkit';
import deviceSlice, { DeviceSliceType } from './features/device/deviceSlice';

export type AppState = {
  device: DeviceSliceType,
};

const store = configureStore({
  reducer: combineReducers<AppState>({
    device: deviceSlice, 
  })
})

export default store;

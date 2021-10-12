import { Selector, createSelector } from '@reduxjs/toolkit';

import { AppState } from '../../store';
import { Device, Room } from '../../types';

// get all devices that are on,
// calculate how many devices are on,

export const roomsSelector: Selector<AppState, Room[]> = (state: AppState) => state.device.rooms;
export const devicesSelector: Selector<AppState, Device[]> = (state: AppState) => state.device.devices;

export const getNumberOfOnDevices = createSelector<AppState, Device[], Room[], number>(
  devicesSelector,
  roomsSelector,
  (devices, rooms) => {
    return 10;
  },
)




import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, get, update } from 'firebase/database';

import { AppState } from '../../store';
import { database } from '../../firebase';
import { Room, Device } from '../../types';

export type DeviceSliceType = {
  isLoading: boolean;
  rooms: Room[];
  devices: Device[];
};

const initialState: DeviceSliceType = {
  isLoading: true,
  rooms: [],
  devices: [],
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setLoading: (state: DeviceSliceType, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    onFirebaseDataFetch: (state: DeviceSliceType, action: PayloadAction<{ rooms: Room[], devices: Device[] }>) => {
      const { rooms, devices } = action.payload;
      state.rooms = rooms;
      state.devices = devices;
    },
    setDeviceOn: (state: DeviceSliceType, action: PayloadAction<{ deviceName: string, value: boolean }>) => {
      const { deviceName, value } = action.payload;
      const device = state.devices.find(({ name }) => deviceName === name);

      if (!device) {
        return;
      }

      device.on = value;
    }
  },
});

export const {
  setLoading,
  onFirebaseDataFetch,
  setDeviceOn,
} = deviceSlice.actions;

export default deviceSlice.reducer;

export const fetchFirebaseState = createAsyncThunk(
  'device/fetchFirebase',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    const devicesRef = ref(database, 'devices');
    const devicesSnapshot = await get(devicesRef);

    const devicesValue: Record<string, Device> = devicesSnapshot.val();

    const roomsRef = ref(database, 'rooms');
    const roomsSnapshot = await get(roomsRef);

    const roomsValue: Record<string, Room> = roomsSnapshot.val();

    dispatch(onFirebaseDataFetch({
      rooms: Object.values(roomsValue),
      devices: Object.values(devicesValue),
    }));

    dispatch(setLoading(false));
  },
)

export const toggleDevice = createAsyncThunk<void, { deviceName: string, value: boolean }>(
  'device/toggle',
  async ({ deviceName, value }, { dispatch }) => {
    const updates: Record<string, any> = {};
    
    updates[`/devices/${deviceName}/on`] = value;

    await update(ref(database), updates);

    dispatch(setDeviceOn({ deviceName, value }));
  }
)

export const toggleRoom = createAsyncThunk<
  void,
  { roomName: string, value: boolean },
  { state: AppState }
  >(
  'device/toggleRoom',
  async ({ roomName, value }, { dispatch, getState }) => {
    const updates: Record<string, boolean> = {}; 

    const state = getState();
    const room = state.device.rooms.find(({ name }) => roomName === name);

    if (!room) {
      return;
    }

    room.devices.forEach((deviceName) => {
      updates[`/devices/${deviceName}/on`] = value;
    });

    await update(ref(database), updates);

    room.devices.forEach((deviceName) => {
      dispatch(setDeviceOn({ deviceName, value }));
    });
  },
)

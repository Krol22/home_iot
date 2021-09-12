import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get, update } from "firebase/database";

const initialState = {
  devices: [],
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevices: (state, { payload }) => {
      state.devices = payload;
    },
    setDeviceOn: (state, { payload }) => {
      const { deviceName, status } = payload;

      const device = state.devices.find(({ name }) => name === deviceName);
      device.on = status;
    },
    setDeviceColor: (state, { payload }) => {
      const { deviceName, color } = payload;

      const device = state.devices.find(({ name }) => name === deviceName);
      device.animation.color = color;
    },
  },
});

export const {
  setDevices,
  setDeviceOn,
  setDeviceColor,
} = deviceSlice.actions;

export const getAllDevices = createAsyncThunk(
  "devices/getAllDevices",
  async (_, { dispatch }) => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `devices`));

    if (snapshot.exists()) {
      dispatch(
        setDevices(Object.values(snapshot.val())),
      );
    }
  },
);

export const changeLedColor = createAsyncThunk(
  "devices/changeLedColor",
  async ({ deviceName, color }, { dispatch }) => {
    const db = getDatabase();  
    dispatch(setDeviceColor({ deviceName, color }));
    update(ref(db, `devices/${deviceName}/animation/color`), color);
  },
);

export const offDevice = createAsyncThunk(
  "devices/off",
  async (device, { dispatch }) => {
    const db = getDatabase();
    update(ref(db, 'devices/' + device), {
      on: 0,
    });

    dispatch(setDeviceOn({ deviceName: device, status: 0 }));
  },
);

export const onDevice = createAsyncThunk(
  "devices/on",
  async (device, { dispatch }) => {
    const db = getDatabase();
    update(ref(db, 'devices/' + device), {
      on: 1,
    });

    dispatch(setDeviceOn({ deviceName: device, status: 1 }));
  },
);

export default deviceSlice.reducer;

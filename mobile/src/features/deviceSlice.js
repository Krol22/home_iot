import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get, update } from "firebase/database";

const initialState = {
  isLoading: false,
  devices: [],
  rooms: [],
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevices: (state, { payload }) => {
      state.devices = payload;
    },
    setRooms: (state, { payload }) => {
      state.rooms = payload;
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
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  setDevices,
  setRooms,
  setDeviceOn,
  setDeviceColor,
  setLoading,
} = deviceSlice.actions;

export const getDevices = createAsyncThunk(
  "devices/getAllDevices",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `devices`));

    if (snapshot.exists()) {
      dispatch(
        setDevices(Object.values(snapshot.val())),
      );
    }

    const roomSnapshot = await get(child(dbRef, 'rooms'));

    if (roomSnapshot.exists()) {
      dispatch(
        setRooms(Object.values(roomSnapshot.val())),
      );
    }

    dispatch(setLoading(false));
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

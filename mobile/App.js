import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { Scene, Router, Stack } from 'react-native-router-flux';

import store from "./src/store";

import "./src/firebase";

import Main from "./src/scenes/Main";
import Device from "./src/scenes/Device";

console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Stack key="root">
          <Scene
            key="main"
            initial
            hideNavBar
            component={Main}
          />
          <Scene
            key="device"
            back
            component={Device}
          />
        </Stack>
      </Router>
    </Provider>
  );
};

export default App;

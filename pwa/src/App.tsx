import { Provider } from 'react-redux';

import Rooms from './features/device/components/Rooms.container';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Rooms />
    </Provider>
  );
}

export default App;

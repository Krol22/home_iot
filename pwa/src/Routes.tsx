import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppState } from './store';

import { fetchFirebaseState } from './features/device/deviceSlice';

import Home from './views/home/Home.container';
import Room from './views/room/Room.container';

export default function Routes() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: AppState) => state.device.isLoading);

  useEffect(() => {
    dispatch(fetchFirebaseState());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/room/:roomName">
          <Room />
        </Route>
      </Switch>
    </BrowserRouter>
  );  
}

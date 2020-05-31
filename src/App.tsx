import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Search from './pages/search';
import Login from './pages/login';
import Registration from './pages/registration';
import LostPassword from './pages/lost-password';
import Menu from './components/common/menu';
import config from './config';
import OppeningText from './modules/oppennig-text/container';

const App = () => <Router>
  {config.MODULES.MENU && <Menu />}
  <OppeningText />
  <Switch>
    <Route exact path="/">
      <Search />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/registration">
      <Registration />
    </Route>
    <Route path="/lost-pasword">
      <LostPassword />
    </Route>
  </Switch>
</Router>

export default App;
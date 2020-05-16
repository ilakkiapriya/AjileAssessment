import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home'
import TrainContainer from './TrainContainer'
import './MainContainer.css'
import Telecom from './Telecom'


function MainContainer() {
 
  return (
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/trains" component={TrainContainer} />
            <Route path="/telecom" component={Telecom}/>
        </Switch>

  );
}

export default MainContainer;
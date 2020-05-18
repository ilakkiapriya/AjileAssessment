import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TrainContainer from './TrainContainer'
import './MainContainer.css'
import Telecom from './Telecom'
import SurveyQc from '../Sidebar/Questionnaire/SurveyQc'
import Add from "../Sidebar/Questionnaire/Add";


function MainContainer() {
 
  return (
      <div className="maincontent" >
        <Switch>
            <Route exact path="/" component={TrainContainer} />
            <Route path="/trains" component={TrainContainer} />
            <Route path="/telecom" component={Telecom}/>
            <Route path="/questionnaire" component={SurveyQc}/>
            <Route path="/add" component={Add}/>
        </Switch>
      </div>

  );
}

export default MainContainer;
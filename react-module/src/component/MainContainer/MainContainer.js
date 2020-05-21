import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TrainContainer from './TrainContainer'
import './MainContainer.css'
import Telecom from './Telecom'
import SurveyQc from '../Sidebar/Questionnaire/SurveyQc'
import AddQues from "../Sidebar/Questionnaire/AddQues";


function MainContainer({items, onChange}) {
 
  return (
      <div className="maincontent" >
        <Switch>
            <Route exact path="/" component={ props => (<TrainContainer propitems={items} onChange={onChange}/>)} />
            <Route path="/trains" component={ props => (<TrainContainer propitems={items}  onChange={onChange}/>)} />
            <Route path="/telecom" component={Telecom}/>
            <Route path="/questionnaire" component={SurveyQc}/>
            <Route path="/add" component={AddQues}/>
        </Switch>
      </div>

  );
}

export default MainContainer;
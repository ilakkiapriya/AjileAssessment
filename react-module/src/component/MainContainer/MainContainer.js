import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TrainContainer from './TrainContainer'
import TeamContainer from './TeamContainer'
import './MainContainer.css'
import SurveyQc from '../Sidebar/Questionnaire/SurveyQc'
import AddQues from "../Sidebar/Questionnaire/AddQues";


function MainContainer({items, onAdd, onChange}) {
  /*
  */
  return (
      <div className="maincontent" >
        <Switch>
            <Route path="/trains/:trainName"  component={ props => (<TeamContainer propitems={items} onAdd={onAdd} onChange={onChange}/>)} />
            <Route path="/trains" component={ props => (<TrainContainer propitems={items} onAdd={onAdd} onChange={onChange}/>)} />           
            <Route path="/questionnaire" component={SurveyQc}/>
            <Route path="/add" component={AddQues}/>
            <Route exact path="/" component={ props => (<TrainContainer propitems={items}  onAdd={onAdd} onChange={onChange}/>)} />
        </Switch>
      </div>

  );
}

export default MainContainer;
import React from "react";
import { Route, Switch } from 'react-router-dom';
import NestedTrainContainer from './NestedTrainContainer'
import AssociateContainer from './AssociateContainer'
import './MainContainer.css'
import AllQuestions from "../Questionnaire/AllQuestions";
import SurveyMainContainer from '../Survey/SurveyMainContainer';
import AllTeamContainer from './AllTeamContainer'
import SurveyEventAssessment from '../Survey/SurveyEventAssessment';
import SpiderGraphContainer from '../Survey/SpiderGraphContainer';
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        trainitems: [],
        associates: []
    }
    this.updateTrainStateOnChange = this.updateTrainStateOnChange.bind(this);
    this.addTrainStateOnChange = this.addTrainStateOnChange.bind(this);
    this.transformModelToUI = this.transformModelToUI.bind(this);
}

updateTrainStateOnChange (fullTrainData, changedTrainData)  {
    console.log("Going to update new train " , fullTrainData);
    console.log("Changed train data",changedTrainData);
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(changedTrainData)
    };

    console.log("Train id is " , fullTrainData._id);
    const patchurl = 'http://localhost:3001/trains/' +fullTrainData._id; 
    fetch(patchurl, requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Patch is successfully sent and response is received ", data);
       var newTrainItems = this.state.trainitems;
       for (const i in this.state.trainitems) {
        if ( this.state.trainitems[i]._id === fullTrainData._id ) {
            this.state.trainitems[i] = fullTrainData;
             }
        }
        this.setState({ trainitems: newTrainItems });
    })
    .catch(console.log)
}

addTrainStateOnChange (newTrainModelItem)  {
    console.log("Going to update new train " , newTrainModelItem);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainModelItem)
    };
    fetch('http://localhost:3001/trains', requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Post is successfully sent and response is received ", data);
       var newTrainItems = this.state.trainitems;
       newTrainItems.push(data);
       this.setState({ trainitems: newTrainItems });
    })
    .catch(console.log)
}

componentDidMount() {
fetch('http://localhost:3001/trains')
    .then(res => res.json())
    .then((data) => {
      this.setState({ trainitems: data })
    })
    .catch(console.log)
}

 
transformModelToUI() {
    var ttrows = [];
    var propItems = this.state.trainitems;
    for ( const i in propItems ) {
      var trainrow = {};
      trainrow.id = propItems[i]._id;
      trainrow.name = propItems[i].trainName;
      trainrow.desc = propItems[i].trainDesc;
      trainrow.owner = propItems[i].trainOwner;
      ttrows.push(trainrow);
      for ( const j in propItems[i].teams ) {
        var teamrow = {};
        teamrow.id = propItems[i].teams[j]._id;
        teamrow.name = propItems[i].teams[j].teamName;
        teamrow.desc = propItems[i].teams[j].teamDesc;
        teamrow.owner = propItems[i].teams[j].teamOwner;
        teamrow.parent_id = trainrow.id;
        teamrow.parentName = trainrow.name;
        ttrows.push(teamrow);
      }
    }
    return ttrows;
}

render() {
    
  var ttrows = this.transformModelToUI();
  console.log("ttrows",ttrows);
  return (
      <div className="maincontent" >
        
        <Switch>
            <Route path="/trains/:trainName/:teamName"  component={ props => (<AssociateContainer/>)} />
            <Route path="/trains/:trainName"  component={ props => (<AllTeamContainer propitems={this.state.trainitems} onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
            <Route path="/trains" component={ props => (<NestedTrainContainer propitems={ttrows} onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
            <Route path="/questions" component={ props => (<AllQuestions/>)} />
            <Route path="/survey/:eventName" component={ props => (<SurveyEventAssessment/>)} />
            <Route path="/survey" component={ props => (<SurveyMainContainer/>)} />
            <Route path="/spidergraph" component={ props => (<SpiderGraphContainer/>)} />
            <Route exact path="/" component={ props => (<NestedTrainContainer propitems={ttrows}  onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
        </Switch>
      </div>

  );
}
}

export default MainContainer;
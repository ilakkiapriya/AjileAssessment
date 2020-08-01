import React from 'react';
import SurveyTabs from './SurveyTabs';
import EventContainer from './SurveyEventAssessment';
import { Route, Switch } from 'react-router-dom';


class SurveyMainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventitems: []
    }
    this.addEventsOnCreate = this.addEventsOnCreate.bind(this);
  }

  componentDidMount() {
    fetch( window.location.origin +  '/rest/events')
        .then(res => res.json())
        .then((data) => {
          console.log("Event data is " , data);
          this.setState({ eventitems: data })
        })
        .catch(console.log);
  }

  addEventsOnCreate (newEventModelItem)  {
    console.log("Going to update Events " , newEventModelItem);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(newEventModelItem)
    };
    fetch(window.location.origin + '/rest/events', requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Post is successfully sent and response is received ", data);
       var newEventItems = this.state.eventitems;
       newEventItems.push(data);
       this.setState({ eventitems: newEventItems });
    })
    .catch(console.log)
}
 
  render() {
        return (
          <div>
            <SurveyTabs eventItems={this.state.eventitems} onAdd={this.addEventsOnCreate}/>
           
            </div>
        );
  }
}

export default SurveyMainContainer;
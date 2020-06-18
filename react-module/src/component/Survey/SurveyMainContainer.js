import React from 'react';
import SurveyTabs from './SurveyTabs';


class SurveyMainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventitems: []
    }
    this.addEventsOnCreate = this.addEventsOnCreate.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/events')
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
    fetch('http://localhost:3001/events', requestOptions)
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
          <div><SurveyTabs eventItems={this.state.eventitems} onAdd={this.addEventsOnCreate}/></div>
        );
  }
}

export default SurveyMainContainer;
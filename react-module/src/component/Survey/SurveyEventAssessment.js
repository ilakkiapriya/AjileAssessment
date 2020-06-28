import React from 'react';
import { withRouter } from "react-router";

class SurveyEventAssessment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quesitems: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/survey/'+this.props.match.params.eventName)
        .then(res => res.json())
        .then((data) => {
          
          console.log("Ques data is " , data);
          this.setState({ quesitems: data })
        })
        .catch(console.log)
  }
    
  render(){
    return(
      <div>
        <p>
          This is event conatiner
        </p>
      </div>
    );

  }
}

export default withRouter(SurveyEventAssessment);
import React from 'react';
import SurveyTabs from './SurveyTabs';


class SurveyMainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
    
  }
 
  render() {
        return (
          <div><SurveyTabs /></div>
        );
  }
}

export default SurveyMainContainer;
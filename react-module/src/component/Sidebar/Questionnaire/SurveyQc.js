import React, { Component } from 'react';
import "survey-react/survey.css";
import * as Survey from 'survey-react';
import {surveyques} from './surveyques';

const $ = window.$;

Survey
    .StylesManager
    .applyTheme("winter");

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

class SurveyQc extends Component {
  
  onComplete(result) {
    console.log("Complete! " + result);
  }

  render() {
    var model = new Survey.Model(surveyques);
    return (
      <div>
			  <h1> EmployeeSurvey </h1>
        <Survey.Survey
            model={model}
            onComplete={this.onComplete}
            onAfterRenderQuestion={this.onAfterRenderQuestion}
            onAfterRenderPage={this.onAfterRenderPage}

        />
      </div>
    )
  }
}

export default SurveyQc;

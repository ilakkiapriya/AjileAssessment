import React from 'react';
import { withRouter } from "react-router";
import "survey-react/survey.css";
import * as Survey from 'survey-react';

const $ = window.$;

Survey
    .StylesManager
    .applyTheme("winter");

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";


class SurveyEventAssessment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quesitems: [],
      eventName : ""
    }
    this.onComplete = this.onComplete.bind(this);

  }


  componentDidMount() {
    fetch( window.location.origin +  '/rest/survey/'+this.props.match.params.eventName)
        .then(res => res.json())
        .then((data) => {
          
          console.log("Ques data is " , data);
          this.setState({ quesitems: data, eventName : this.props.match.params.eventName })
        })
        .catch(console.log)
  }
    
  onComplete(survey, options) {
    //Write survey results into database
    console.log("Survey options: " + options);
    var surveyresult = {eventName: this.state.eventName, qaArr: []};
    for (let [key, value] of Object.entries(survey.data)) {
      console.log("key : value is ", key,":", value);
      if ( key === "Please enter your employee id" )  surveyresult.empId = value;
      else  { 
        var qaitem = {};
        qaitem.question=key
        qaitem.answer=value;
        surveyresult.qaArr.push(qaitem);
      }
    }
    console.log("Survey results to be updated: " + JSON.stringify(surveyresult));
    const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(surveyresult)
      };
      fetch(window.location.origin + '/rest/survey/'+this.state.eventName, requestOptions)
      .then(res => res.json())
      .then((data) => {
          console.log("Survey post is successfully sent and response is received ", data);
      })
      .catch(console.log)
   }

  render() {
    var surveyques = getUISurveyQuestions(this.state.quesitems);
    var model = new Survey.Model(surveyques);
    return (
      <div>
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

export default withRouter(SurveyEventAssessment);

function getUISurveyQuestions(qarr) {
  var sq = { 
        showProgressBar: "top",
        goNextPageAutomatic: false,
        showNavigationButtons: true,
        pages:[]
      };

  for (let i = 0; i < qarr.length; i++) {
    var qtype = qarr[i].qtype;
    if(qtype === "Rating"){
     sq.pages.push(getRatingQuestion(qarr[i]));
    } else if (qtype === "Text") {
      sq.pages.push(getTextQuestion(qarr[i]));
    }
  }
  sq.pages.push ( {questions:[ { type: "text",  name: "Please enter your employee id"  }] });
  console.log("Sq" ,sq);
  return sq;
}

function getRatingQuestion(qmodelitem) {
  var item = {questions: []};
      var qitem = {isRequired: true,colCount: 1,choices: []};
      qitem.type = "radiogroup";
      qitem.name =qmodelitem.title;
      var rdarr = qmodelitem.rateDescription;
      for(let j=0; j < rdarr.length; j++){
        qitem.choices.push(rdarr[j]);
      }
      item.questions.push(qitem);
     
     return item;

}

function getTextQuestion (qmodelitem) {
  var item = {questions: []};
  var qitem = {isRequired: true,type: "text"};
  qitem.name = qmodelitem.title;
  item.questions.push(qitem);
  return item;
}


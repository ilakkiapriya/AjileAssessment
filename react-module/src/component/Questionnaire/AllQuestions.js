import React from 'react';
import QuestionsTabs from './QuestionsTabs';


class AllQuestions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        questionitems: []
    }
    this.addQuestionsOnSave = this.addQuestionsOnSave.bind(this);
  }

  componentDidMount() {
    fetch( window.location.origin +  '/rest/questions')
        .then(res => res.json())
        .then((data) => {
          console.log("question data is " , data);
          this.setState({ questionitems: data })
        })
        .catch(console.log);
  }

  addQuestionsOnSave (newQuestionModelItem)  {
    console.log("Going to update Questions " , newQuestionModelItem);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestionModelItem)
    };
    fetch(window.location.origin +   '/rest/questions', requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Post is successfully sent and response is received ", data);
       var newQuestionItems = this.state.questionitems;
       newQuestionItems.push(data);
       this.setState({ questionitems: newQuestionItems });
    })
    .catch(console.log)
}

  render() {
        return (
          <div><QuestionsTabs questionItems={this.state.questionitems} onAdd= {this.addQuestionsOnSave}/></div>
        );
  }
}

export default AllQuestions;
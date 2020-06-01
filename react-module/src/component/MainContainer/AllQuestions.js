import React from 'react';
import QuestionsTabs from './QuestionsTabs';


class AllQuestions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        questionitems: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/questions')
        .then(res => res.json())
        .then((data) => {
          console.log("question data is " , data);
          this.setState({ questionitems: data })
        })
        .catch(console.log);
  }

  render() {
        return (
          <div><QuestionsTabs questionItems={this.state.questionitems}/></div>
        );
  }
}

export default AllQuestions;
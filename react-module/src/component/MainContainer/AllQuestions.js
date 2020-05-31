import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

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
          console.log("roledata data is " , this.state.questionitems);

        })
        .catch(console.log);
    }

    render() {
      for ( const i in this.state.questionitems ) {
        var myRow = this.state.questionitems[i];
        console.log("myRow roleName is " , myRow.parentTag);
      }

        return (
          <div>Hi Senthil</div>
        );
    }
}

export default AllQuestions;
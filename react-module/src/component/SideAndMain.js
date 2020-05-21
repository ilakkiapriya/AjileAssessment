import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import MainContainer from './MainContainer/MainContainer'
import './Admin.css'


class SideAndMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainitems: []
        }
        this.updateTrainStateOnChange = this.updateTrainStateOnChange.bind(this);
    }

    updateTrainStateOnChange (newTrainModelItem)  {
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

    render() {
        
    console.log(this.state.trainitems);
    return (
        <div className="sideandmain"> 
            <Sidebar items={this.state.trainitems}/> 
            <MainContainer items={this.state.trainitems} onChange={this.updateTrainStateOnChange}/>
        </div>

    );
    }
}

export default SideAndMain
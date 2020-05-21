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

    updateTrainStateOnChange (inputtrainItems)  {
        this.setState({ trainitems: inputtrainItems });
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
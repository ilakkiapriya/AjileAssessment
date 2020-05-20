import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import MainContainer from './MainContainer/MainContainer'
import './Admin.css'


class SideAndMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebaritems: []
        }
    }

 componentDidMount() {
    fetch('http://localhost:3001/trains')
        .then(res => res.json())
        .then((data) => {
          this.setState({ sidebaritems: data })
        })
        .catch(console.log)
    }

    render() {
        
    console.log(this.state.sidebaritems);
    return (
        <div className="sideandmain"> 
            <Sidebar items={this.state.sidebaritems/*sidebaritems*/}/> 
            <MainContainer items={this.state.sidebaritems}/>
        </div>

    );
    }
}

export default SideAndMain
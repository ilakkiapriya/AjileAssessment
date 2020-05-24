import React from 'react'
import "./Admin.css"
import Toolbar from './Toolbar/Toolbar'
import MainContainer from './MainContainer/MainContainer'


class Admin extends React.Component {

    render() {
    return (  
        <div className="adminmain"> 
            <div className="toolbar"><Toolbar /></div>
            <div><MainContainer /></div>
        </div>

    );
    }
}

export default Admin
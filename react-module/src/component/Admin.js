import React from 'react'
import "./Admin.css"
import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import { sidebaritems } from '../json/sidebaritems'
import MainContainer from './MainContainer/MainContainer'


class Admin extends React.Component {

    render() {
    return (  
        <div className="adminmain"> 
            <div className="toolbar"><Toolbar/> </div>
            <div className="sidebar"><Sidebar items={sidebaritems}/> </div>
            <div className="maincontent"> <MainContainer/></div>
        </div>

    );
    }
}

export default Admin
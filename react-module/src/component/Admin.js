import React from 'react'
import "./Admin.css"
import Toolbar from './Toolbar/Toolbar'
import SideAndMain from './SideAndMain'


class Admin extends React.Component {

    render() {
    return (  
        <div className="adminmain"> 
            <div className="toolbar"><Toolbar/> </div>
            <SideAndMain/>
        </div>

    );
    }
}

export default Admin
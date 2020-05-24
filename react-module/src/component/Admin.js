import React from 'react'
import "./Admin.css"
import Toolbar from './Toolbar/Toolbar'
import MainContainer from './MainContainer/MainContainer'
import Scroll from './Scroll'


class Admin extends React.Component {

    render() {
    return (  
        <div className="adminmain"> 
            <Toolbar className="toolbar"/> 
            <Scroll>
                <MainContainer />
            </Scroll>
        </div>

    );
    }
}

export default Admin
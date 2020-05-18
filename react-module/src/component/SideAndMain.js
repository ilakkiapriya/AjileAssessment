import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { sidebaritems } from '../json/sidebaritems'
import MainContainer from './MainContainer/MainContainer'
import './Admin.css'


class SideAndMain extends React.Component {

    render() {
    return (  
        <div className="sideandmain"> 
            <Sidebar items={sidebaritems}/> 
            <MainContainer/>
        </div>

    );
    }
}

export default SideAndMain
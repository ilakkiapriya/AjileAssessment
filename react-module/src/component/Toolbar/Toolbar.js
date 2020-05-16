import React from 'react';

import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
      <nav className="toolbar_navigation">
          <div className="toolbar_logo">Employee Survey</div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
              <ul>
                  <li><a href="/">Logout</a></li>
              </ul>
          </div>
      </nav>
    </header>
);
  
  export default toolbar;
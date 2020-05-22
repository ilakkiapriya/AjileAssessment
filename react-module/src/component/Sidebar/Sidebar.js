import React, {Component} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import {Link}from 'react-router-dom';
import '../Sidebar/Sidebar.css'
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

function SidebarItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const {label, name, items, Icon, path, onClick: onClickProp } = item;
  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
      console.log(items);
    }
    if (onClickProp) {
      onClickProp(e, item);
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        className={
          "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
        }
      />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  return (
    <>
      <ListItem 
        onClick={onClick}
        button={true}
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
        >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text" >
          <Link to={`${path}`}>{label}
          </Link>
          </div>
        </div>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

function transformDataToUIModel(items) {
  var newitems = [];
  var trainitems = {
    name: "trains", label: "Trains",  path: "/trains", Icon: GroupIcon,  
    items: []
  };

  for (const i in items) {
    var trainitem = {};
    trainitem.name = items[i].trainName;
    trainitem.label = items[i].trainName;
    trainitem.path = '/trains/' + items[i].trainName;
    trainitem.Icon =  FiberManualRecordOutlinedIcon;
    trainitem.items = [];
    trainitems.items.push(trainitem);
    for ( const j in items[i].teams ) {
      var origteam = items[i].teams[j];
      var teamitem = {};
      teamitem.name = origteam.teamName;
      teamitem.label = origteam.teamName;
      teamitem.path = '/' + origteam.teamName;
      teamitem.Icon =  PersonIcon;
      trainitem.items.push(teamitem);
    }
  }

  var questionitems = {
    name: "questionnaire", label: "Questionnaire", path: "/Questionnaire",  Icon: QuestionAnswerIcon,
    items: [
      { name: "view", label: "View",Icon: VisibilityIcon},
      { name: "add", label: "Add",Icon: PlaylistAddIcon}
    ]
  };

  newitems.push(trainitems);
  newitems.push(questionitems);

  return newitems;
}

function Sidebar ({items, depthStep, depth, expanded}) {

  var newitems =transformDataToUIModel(items);

  return (
    
    <div className="sidebar">
      <List disablePadding dense >
        {newitems.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
  
}

export default Sidebar;
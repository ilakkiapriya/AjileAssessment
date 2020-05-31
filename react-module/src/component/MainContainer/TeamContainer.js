import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";
import AgileBreadCrumbs from './AgileBreadCrumbs'
import TrainIcon from '@material-ui/icons/Train';
import GroupIcon from '@material-ui/icons/Group';

export default function TeamContainer({propitems , match,  onAdd, onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Emp Name', field: 'empName' },
      { title: 'Emp Id ', field: 'empId' },
      { title: 'Emp EmailId', field: 'empEmailId'},
      { title: 'Role', field: 'empRole', render: rowData =>{
        return(<>
          <select>
            <option>Select a role</option>
            <option value="developer">Developer</option>
            <option value="srmanager">Sr. Manager</option>
            <option value="tester">Tester</option>
            <option value="s/warchitect">Software Architect</option>
          </select>
        </>
         ) }}
    ]
  });

  let params = useParams();
  console.log("Train name used in param is ", params)
  function transformDataToUIModel() {
    var trainRow = {};
    for (const i in propitems) {
      var keyval=params.trainName + "__" + params.teamName;
      if ( propitems[i].trainTeamVal === keyval ) {
        teamRow = propitems[i];
      }
    }
    console.log("Team data is " , teamRow)
    return teamRow;
  }
  function getBreadCrumbs() {
    var breadcrumbs = [];
    breadcrumbs.push({"name": params.trainName, "iconval": TrainIcon, "linkTo": '/trains'});
    breadcrumbs.push({"name": params.teamName, "iconval": GroupIcon});
    return breadcrumbs;
  }
  //var teamRow=transformDataToUIModel();
  var teamRow={};
  const bcprops = getBreadCrumbs();
  return (
    <div>
    <AgileBreadCrumbs bcprops={bcprops}/>
    <MaterialTable
      columns={state.columns}
      data={teamRow.allAssociates}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              teamRow.allAssociates.push(newData);
              onChange(teamRow, {"allAssociates":teamRow.allAssociates});
          }, 600);
        }),
        onRowUpdate: (newData) => {
          console.log(newData);
        },
        onRowDelete: (newData) => {
          console.log(newData);
        }
      }}
      options={{
        exportButton: true,
        showTitle: false
      }}
    />
        </div>
  );
}

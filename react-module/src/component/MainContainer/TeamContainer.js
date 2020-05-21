import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function TeamContainer({propitems ,  onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Team Name', field: 'teamName',render: rowData => <Link to={`/${rowData.teamName}`}>{rowData.teamName}</Link> },
      { title: 'Team Description', field: 'teamDesc' },
      { title: 'Team Owner', field: 'teamOwner'}
    ]
  });

  function transformDataToUIModel() {
    var teamRows = [];
    for (const i in propitems) {
      var teamRow = {};
      teamRow.trainName = propitems[i].teamName;
      teamRow.trainDesc = propitems[i].teamDesc;
      teamRow.trainOwner = propitems[i].teamOwner;
      teamRows.push(teamRow);
    }
    return teamRows;
  }  

  var teamRows=transformDataToUIModel();

  return (
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={teamRows}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              onChange(newData);
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
        exportButton: true
      }}
    />
  );
}

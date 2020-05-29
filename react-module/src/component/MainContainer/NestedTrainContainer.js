import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function NestedTrainContainer({propitems , onAdd, onChange}) {
  const [selectedRow,setSelectedRow] = React.useState(null);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name',render: rowData => getRowLink(rowData) },
      { title: 'Description', field: 'desc' },
      { title: 'Owner', field: 'owner'}
    ]
  });

  function getRowLink(rowData) {
    if (rowData.hasOwnProperty("parentName")) {
      return <Link to={`/trains/${rowData.parentName}/${rowData.name}`}>{rowData.name}</Link>;
    } else {
      return <Link to={`/trains/${rowData.name}`}>{rowData.name}</Link>;
    }
  }
  
  function transformModelToUI() {
      var ttrows = [];
      for ( const i in propitems ) {
        var trainrow = {};
        trainrow.id = propitems[i]._id;
        trainrow.name = propitems[i].trainName;
        trainrow.desc = propitems[i].trainDesc;
        trainrow.owner = propitems[i].trainOwner;
        ttrows.push(trainrow);
        for ( const j in propitems[i].teams ) {
          var teamrow = {};
          teamrow.id = propitems[i].teams[j]._id;
          teamrow.name = propitems[i].teams[j].teamName;
          teamrow.desc = propitems[i].teams[j].teamDesc;
          teamrow.owner = propitems[i].teams[j].teamOwner;
          teamrow.parent_id = trainrow.id;
          teamrow.parentName = trainrow.name;
          ttrows.push(teamrow);
        }
      }
      return ttrows;
  }

  var ttrows = transformModelToUI();

  return (
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={ttrows}
      parentChildData={(row, rows) => rows.find(a=> a.id===row.parent_id)}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              onAdd(newData);
          }, 600);
        }),
        onRowUpdate: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              onChange(newData);
          }, 600);
        }),
        onRowDelete: (newData) => {
          console.log(newData);
        }
      }}
      onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
      options={{
        exportButton: true, 
        actionsColumnIndex: -1,
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })
      }}
    />
  );
}

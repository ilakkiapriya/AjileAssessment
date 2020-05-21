import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function TrainContainer({propitems ,  onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Train Name', field: 'trainName',render: rowData => <Link to={`/${rowData.trainName}`}>{rowData.trainName}</Link> },
      { title: 'Train Description', field: 'trainDesc' },
      { title: 'Train Owner', field: 'trainOwner'}
    ]
  });

  function transformDataToUIModel() {
    var trainRows = [];
    for (const i in propitems) {
      var trainRow = {};
      trainRow.trainName = propitems[i].trainName;
      trainRow.trainDesc = propitems[i].trainDesc;
      trainRow.trainOwner = propitems[i].trainOwner;
      trainRows.push(trainRow);
    }
    return trainRows;
  }  

  function transformUIToDataModel(uitraindata) {
    propitems.push(uitraindata);
  }  

  console.log(onChange);
  var trainRows=transformDataToUIModel();

  return (
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={trainRows}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              transformUIToDataModel(newData);
              onChange(propitems);
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

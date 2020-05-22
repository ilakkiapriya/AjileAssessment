import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";


export default function TeamContainer({propitems , match,  onAdd, onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Team Name', field: 'teamName',render: rowData => <Link to={`/trains/${params.trainName}/${rowData.teamName}`}>{rowData.teamName}</Link> },
      { title: 'Team Description', field: 'teamDesc' },
      { title: 'Team Owner', field: 'teamOwner'}
    ]
  });

  let params = useParams();
  console.log("Train name used in param is ", params)
  function transformDataToUIModel() {
    var trainRow = {};
    for (const i in propitems) {
      if ( propitems[i].trainName === params.trainName ) {
        trainRow = propitems[i];
      }
    }
    console.log("Team data is " , trainRow)
    return trainRow;
  }

  var trainRow=transformDataToUIModel();

  return (
    <MaterialTable
      title="Teams"
      columns={state.columns}
      data={trainRow.teams}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              trainRow.teams.push(newData);
              onChange(trainRow, {"teams":trainRow.teams});
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

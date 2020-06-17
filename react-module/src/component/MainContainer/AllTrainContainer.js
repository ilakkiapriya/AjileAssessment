import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: 'none'
      },
    },
  },
});

export default function AllTrainContainer({propitems , onAdd, onChange}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Train Name', field: 'trainName',render: rowData => <Link to={`/trains/${rowData.trainName}`}>{rowData.trainName}</Link> },
      { title: 'Train Description', field: 'trainDesc' },
      { title: 'Train Owner', field: 'trainOwner'}
    ]
  });

  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={propitems}
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
      options={{
        exportButton: true,
        paging: false
      }}
    />
    </ThemeProvider>
  );
}

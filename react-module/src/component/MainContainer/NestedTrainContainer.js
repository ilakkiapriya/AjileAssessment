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

  function transformUIToModel(newData) {
    var ttrow = {};
    ttrow.trainName=newData.name;
    ttrow.trainDesc=newData.desc;
    ttrow.trainOwner=newData.owner;
    return ttrow;
}

 


  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={propitems}
      parentChildData={(row, rows) => rows.find(a=> a.id===row.parent_id)}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              var trow=transformUIToModel(newData);
              onAdd(trow);
          }, 600);
        }),
        onRowUpdate: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              var trow=transformUIToModel(newData);
              trow._id=newData.id;
              onChange(trow);
          }, 600);
        }),
        onRowDelete: (newData) => {
          console.log(newData);
        }
      }}
      onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
      options={{
        exportButton: true,
        paging: false,
        actionsColumnIndex: -1,
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })
      }}
    />
    </ThemeProvider>
  );
}

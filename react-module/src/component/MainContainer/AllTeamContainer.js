import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";
import AgileBreadCrumbs from './AgileBreadCrumbs'
import TrainIcon from '@material-ui/icons/Train';
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

export default function AllTeamContainer({propitems , match,  onAdd, onChange}) {
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
    console.log("Team data is " , trainRow);
    return trainRow;
  }

  function getBreadCrumbs() {
    var breadcrumbs = [];
    breadcrumbs.push({"name": params.trainName, "iconval": TrainIcon, "linkTo": '/trains'});
    return breadcrumbs;
  }

  var trainRow=transformDataToUIModel();
  const bcprops = getBreadCrumbs();

  return (
    <div>
    <AgileBreadCrumbs bcprops={bcprops}/>
    <ThemeProvider theme={theme}>
    <MaterialTable
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
        exportButton: true,
        showTitle: false,
        paging: false
      }}
    />
    </ThemeProvider>
    </div>
  );
}

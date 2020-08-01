import React from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";
import AgileBreadCrumbs from './AgileBreadCrumbs'
import TrainIcon from '@material-ui/icons/Train';
import GroupIcon from '@material-ui/icons/Group';


const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: 'none'
      },
    },
  },
});

export default function AssociateContainer() {
  let params = useParams();
  console.log("Train name used in param is ", params)

  const [state, setState] = React.useState({
    columns: [
      { title: 'Emp Name', field: 'empName' },
      { title: 'Emp Id ', field: 'empId' },
      { title: 'Emp EmailId', field: 'empEmailId'},
      { title: 'Role', field: 'roleName'}
    ],
    associaterows: []
  });

  React.useEffect(() => {
    fetch( window.location.origin + '/rest/associates')
    .then(res => res.json())
    .then((data) => {
      var valassociaterows = [];
      for (const i in data) {
        if ( data[i].trainName === params.trainName &&
          data[i].teamName === params.teamName ) {
            valassociaterows.push(data[i]);
        }
      }
      setState(prevState => {
        return { ...prevState, associaterows: valassociaterows }
      })
      console.log("State is  " , state);
    })
    .catch(console.log)
 }, []);
 
  function getBreadCrumbs() {
    var breadcrumbs = [];
    breadcrumbs.push({"name": params.trainName, "iconval": TrainIcon, "linkTo": '/trains'});
    breadcrumbs.push({"name": params.teamName, "iconval": GroupIcon});
    return breadcrumbs;
  }

  function addAssociateRow (newAssociateItem)  {
    console.log("Going to add new associate " , newAssociateItem);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(newAssociateItem)
    };
    fetch(window.location.origin + '/rest/associates', requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Post is successfully sent and response is received ", data);
        setState(prevState => {
          return { ...prevState, associaterows: [...prevState.associaterows, newAssociateItem] }
        })
        console.log("Updated state is ", state);
      })  
      .catch(console.log)
}

  const bcprops = getBreadCrumbs();
  return (
    <div>
    <AgileBreadCrumbs bcprops={bcprops}/>
    <ThemeProvider theme={theme}>
    <MaterialTable
      columns={state.columns}
      data={state.associaterows}
      editable = {{
        onRowAdd: (newData) => 
        new Promise((resolve) => {
          setTimeout( () => {
              resolve();
              newData.trainName=params.trainName;
              newData.teamName=params.teamName;
              addAssociateRow(newData);
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

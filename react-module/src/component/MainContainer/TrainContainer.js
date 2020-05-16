import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function TrainContainer() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Trains', field: 'trains' },
      { title: 'Teams', field: 'teams' },
      { title: 'TeamOwner', field: 'teamowner'},
      { title: 'No. Of Associates', field: 'noofassociates'}
    ],
    data: [
      { trains: 'Telecom', teams: 'Vodafone', teamowner: "A", noofassociates: 25 },
      { trains: 'Telecom', teams: 'Bell', teamowner: "B", noofassociates: 25 },
      { trains: 'Bank', teams: 'Bofa', teamowner: "C", noofassociates: 25 },
      { trains: 'Bank', teams: 'TD', teamowner: "D", noofassociates: 25 }
     ,
    ],
  });

  return (
    <MaterialTable
      title="Trains"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      onRowClick={<Link to={`/${state.data.trains}`}>{state.data.trains}</Link>}
    />
  );
}

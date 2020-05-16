import React from 'react';
import MaterialTable from 'material-table';

export default function Telecom() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Teams', field: 'teams' },
      { title: 'TeamOwner', field: 'teamowner'},
      { title: 'No. Of Associates', field: 'noofassociates'}
    ],
    data: [
      {teams: 'Vodafone', teamowner: "A", noofassociates: 25 },
      {teams: 'Bell', teamowner: "B", noofassociates: 25 }
     ,
    ],
  });

  return (
    <MaterialTable
      title="Telecom"
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
    />
  );
}

import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function TrainContainer({items}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Train Name', field: 'trainName',render: rowData => <Link to={`/${rowData.trainName}`}>{rowData.trainName}</Link> },
      { title: 'Train Description', field: 'trainDesc' },
      { title: 'Train Owner', field: 'trainOwner'}
    ],
    data: [],
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
      options={{
        exportButton: true
      }}
      onCellClick={<Link to={`/${state.data.trains}`}>{state.data.trains}</Link>}
    />
  );
}

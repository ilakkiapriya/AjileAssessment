import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const products = [
  { trains: 'Telecom', teams: 'Vodafone', teamowner: "A", noofassociates: 25 },
  { trains: 'Telecom', teams: 'Bell', teamowner: "B", noofassociates: 25 }
];

const Home = props => {
  const columns = [
    {
      dataField: "trains",
      text: "Trains"
    },
    {
      dataField: "teams",
      text: "Teams"
    },
    {
      dataField: "teamowner",
      text: "Team Owner"
    },
    {
      dataField: "noofassociates",
      text: "No. Of Associates"
    }
  ];
  const expandRow = {
    parentClassName: 'parent-expand-foo',
    renderer: row => (
      <div>
        <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    )
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="h2">Products</h1>
      <BootstrapTable keyField="trains" data={products} columns={columns} expandRow={ expandRow } />
    </div>
  );
};
export default Home;

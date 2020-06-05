import React from 'react';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        //borderBottomStyle: 'hidden'
      },
      head: {
       borderBottomStyle: 'hidden'

      }
    },
    MuiToolbar: {
      regular: {
        minHeight: '16px',
        '@media (min-width: 600px)': {
          minHeight: '0px'
        },
        '@media (min-width: 0px) and (orientation: landscape)': {
          minHeight: '0px'
        },
      }
    },
    MuiTableCell: {
      root: {
        padding: '10px'
      }
    }
    
  },
});

export default function RoleTab({rolequestion}) {
  const [state, setState] = React.useState({
    columns: ["S.no", "AppliedTo", "Question", "QuestionType"]
  });

  function transformModelToUI() {
    var roletbRows = [];
    console.log("roleQues",rolequestion);
    for ( const i in rolequestion ) {
      var rolebasedRow = [];
      rolebasedRow.sno = i;
      rolebasedRow.appliedTo = rolequestion[i].taggedTo;
      rolebasedRow.question = rolequestion[i].title;
      rolebasedRow.questionType = rolequestion[i].qtype;
      roletbRows.push(rolebasedRow);
    }
    console.log("roletbRows",roletbRows);
    return roletbRows;
    
  }
  const options = {
    filterType: "dropdown",
    responsive: "scroll"
  };

  var roletbRows = transformModelToUI();
  return (
    <MUIDataTable

      title="Role Based Questions"
      columns={state.columns}
      data={roletbRows}
      options={options}
    />
  );
}

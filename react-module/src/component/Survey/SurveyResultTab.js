import React from 'react';
import MaterialTable from 'material-table';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
      },
      MuiDialog: {
        paper: {
          width: '80%'
        }
      }
      
    },
  });

export default function SurveyResultTab(){
    const [state, setState] = React.useState({
        columns: [
          { width:100,title: 'S.No', field: 'sno' ,filtering: false},
          { width:200,title: 'Event Name', field: 'eventName' },
          { title: 'Status', field: 'status'},
          {width:200,title: 'Result', field: 'result'},
          {width:200,title: 'No. Of Submission', field: 'noOfSubmission'},
        ]
      });

    return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title="Survey Results" 
      columns={state.columns}
      options={{
        filtering: true,
        search:false
      }}
    />
    </ThemeProvider>
  );
}
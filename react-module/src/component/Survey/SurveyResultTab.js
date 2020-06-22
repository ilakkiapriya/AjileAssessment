import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Icon } from "@material-ui/core";
import Spider from './spider-chart.svg'

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

export default function SurveyResultTab({eventItems}){
    const [state, setState] = React.useState({
        columns: [
          { width:100,title: 'S.No', field: 'sno' ,filtering: false},
          { width:200,title: 'Event Name', field: 'eventName',render: rowData => <Link to={`/survey/${rowData.eventName}`}>{rowData.eventName}</Link>},
          { title: 'Status', field: 'status'},
          {width:200,title: 'Result', field: 'result',render: rowData => <Icon>
                        <img src={Spider} height={25} width={25}/></Icon>},
          {width:200,title: 'No. Of Submission', field: 'noOfSubmission'},
        ]
      });

      function transformModelToUI() {
        var eventRows = [];
        console.log("eventItems",eventItems);
        let j=0;
    
        for ( const i in eventItems ) {
          var eventbasedRow = {};
          eventbasedRow.sno = ++j;
          eventbasedRow.eventName = eventItems[i].eventName;
          eventbasedRow.status = "Open";
          eventbasedRow.noOfSubmission = "25";
          
          eventRows.push(eventbasedRow);
        }
        return eventRows;
      }

      var eventRows = transformModelToUI();
    return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title="Survey Results" 
      columns={state.columns}
      data={eventRows}
      options={{
        filtering: true,
        search:false
      }}
    />
    </ThemeProvider>
  );
}
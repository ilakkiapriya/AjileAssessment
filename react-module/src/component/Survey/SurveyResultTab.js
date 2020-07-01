import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Spider from './spider-chart.svg'

import { useParams} from "react-router";

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
          {title: 'Roles', field: 'targetRoles'},
          {width:200,title: 'Result', field: 'result',render: rowData => 
          <IconButton>
            <Link to="/spidergraph">
              <img src={Spider} height={25} width={25}/>
            </Link>
          </IconButton>},
          {width:200,title: 'No. Of Submission', field: 'noOfSubmission'},
        ]
      });

      let params = useParams();
      function transformModelToUI() {
        var eventRows = [];
        let j=0;
    
        for ( const i in eventItems ) {
          var eventbasedRow = {};
          eventbasedRow.sno = ++j;
          eventbasedRow.eventName = eventItems[i].eventName;
          eventbasedRow.targetRoles=eventItems[i].targetedRoles;
          if(eventbasedRow.targetRoles.length >1){
            eventbasedRow.targetRoles = eventbasedRow.targetRoles.join(" , ");
          }
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
        search:false,
        paging: false
      }}
    />
    </ThemeProvider>
  );
}
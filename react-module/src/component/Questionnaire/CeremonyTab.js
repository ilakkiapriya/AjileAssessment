import React from 'react';
import MaterialTable from 'material-table';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddQuesDialog from './AddQuesDialog';
import Button from '@material-ui/core/Button'



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


export default function CeremonyTab({ceremonyquestion, onAdd}) {

  const [state, setState] = React.useState({
    columns: [
      { width:100,title: 'S.No', field: 'sno' ,filtering: false},
      { width:200,title: 'Ceremony Type', field: 'ceremonyType' },
      { title: 'Question', field: 'question'},
      {width:200,title: 'QuestionType', field: 'questionType'}
    ]
  });

  const [open, setOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose= () =>  {
    setOpen(false);
  };


  function transformModelToUI() {
    var ceremonytbRows = [];
    console.log("CeremonyQues",ceremonyquestion);
    let j=0;

    for ( const i in ceremonyquestion ) {
      var ceremonybasedRow = {};
      ceremonybasedRow.sno = ++j;
      ceremonybasedRow.ceremonyType = ceremonyquestion[i].taggedTo;
      ceremonybasedRow.question = ceremonyquestion[i].title;
      ceremonybasedRow.questionType = ceremonyquestion[i].qtype;
      ceremonytbRows.push(ceremonybasedRow);
    }
    return ceremonytbRows;
  }

  
  var ceremonytbRows = transformModelToUI();
    return (
    <ThemeProvider theme={theme}>
    <MaterialTable
    components={{
      Actions: (props) => {
        return(
          <div>
          <Button color="primary" type="button"
          onClick={handleClickOpen}
          >Add Question</Button>
          <AddQuesDialog open={open} handleClose={handleClose} onAdd={onAdd}/>
          </div>
        );
      }
    }}
      title="Assessment Questions Based on Ceremony"
      
      columns={state.columns}
      data={ceremonytbRows}
      localization={{
        body: {addTooltip: "Add Questions"}
      }}
      options={{
        filtering: true,
        search:false
      }}
    />
    </ThemeProvider>
  );
}

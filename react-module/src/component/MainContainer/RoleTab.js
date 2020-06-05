import React from 'react';
import MaterialTable from 'material-table';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddQues from '../Sidebar/Questionnaire/AddQues';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';



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


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function RoleTab({rolequestion}) {

  const [state, setState] = React.useState({
    columns: [
      { width:100,title: 'S.No', field: 'sno' ,filtering: false},
      { width:200,title: 'Role', field: 'appliedTo' },
      { title: 'Question', field: 'question'},
      {width:200,title: 'QuestionType', field: 'questionType'}
    ]
  });

  const [open, setOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function transformModelToUI() {
    var roletbRows = [];
    console.log("roleQues",rolequestion);
    let j=0;

    for ( const i in rolequestion ) {
      var rolebasedRow = {};
      rolebasedRow.sno = ++j;
      rolebasedRow.appliedTo = rolequestion[i].taggedTo;
      rolebasedRow.question = rolequestion[i].title;
      rolebasedRow.questionType = rolequestion[i].qtype;
      roletbRows.push(rolebasedRow);
    }
    return roletbRows;
    //console.log("roletbRows",roletbRows);
  }

  
  var roletbRows = transformModelToUI();
    return (
    <ThemeProvider theme={theme}>
    <MaterialTable
    components={{
      Actions: (props) => {
        return(
          <div>
          <button color="primary" type="button"
          onClick={handleClickOpen}
          >Add Question</button>
          <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          contentStyle={{width: "100%", maxWidth: "none"}}
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Add Quetions</DialogTitle>
              <DialogContent >
                  <AddQues/>
              </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        );
      }
    }}
      title="Assessment Questions"
      
      columns={state.columns}
      data={roletbRows}
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

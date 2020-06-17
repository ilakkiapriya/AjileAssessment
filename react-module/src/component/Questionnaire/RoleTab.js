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


export default function RoleTab({rolequestion, onAdd}) {

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

  const handleClose= () =>  {
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
      if(rolebasedRow.appliedTo.length >1){
        rolebasedRow.appliedTo = rolebasedRow.appliedTo.join(" , ");
      }
      roletbRows.push(rolebasedRow);
    }
    return roletbRows;
  }

  
  var roletbRows = transformModelToUI();
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
      title="Assessment Questions Based on Roles"
      
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

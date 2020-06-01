import React from 'react';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';

export default function RoleTab({rolequestion}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'S.No', field: 'sno'},
      { title: 'AppliedTo', field: 'appliedTo' },
      { title: 'Question', field: 'question'},
      {title: 'QuestionType', field: 'questionType'}
    ]
  });

  function transformModelToUI() {
    var roletbRows = [];
    console.log("roleQues",rolequestion);
    for ( const i in rolequestion ) {
      var rolebasedRow = {};
      rolebasedRow.sno = i;
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
    <MaterialTable
      title="Role Based Questions"
      columns={state.columns}
      data={roletbRows}
    />
  );
}

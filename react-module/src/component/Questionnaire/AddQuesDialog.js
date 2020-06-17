import React, { useState, Component }  from 'react'
import {Form, Row, Col} from 'react-bootstrap'

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
};
  
class AddQuesDialog extends React.Component {

    /*
    parentTag: String,
    taggedTo:[String]
    category: String,
    title:String,
    qtype:String,
    rateMin:Number,
    rateMax: Number,
    rateDescription: [String],
    */
    constructor(props) {
        super(props);
        this.state = {
            questionitems: [
                {
                    controlId: "parentTag",
                    label: "Parent Tag",
                    type: "select",
                    options: ["Role/Level Based", "CeremonyBased"]
                },
                {
                    controlId: "taggedTo",
                    label: "Child Tag",
                    type: "select-multiple",
                    options: ["Developer", "Tester", "Manager"]
                },
                {
                    controlId: "category",
                    label: "Category",
                    type: "select",
                    options: ["Process", "Technical", "Security", "General"]
                },
                {
                    controlId: "title",
                    label: "Question",
                    type: "text",
                    pholder: "Enter the question"
                },
                {
                    controlId: "qtype",
                    label: "Question type",
                    type: "select",
                    options: ["Rating", "Text"]
                }
            ]
        }
        this.getFormItems = this.getFormItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
      }
    

    handleChange(e) {
        console.log("Event target value",e.target.value );
        if(e.target.value === "Rating") {
            var newitems = [];
            var i;
            for (i = 1; i < 6; i++) {
                newitems.push( {
                    controlId: "ratedesc"+i,
                    label: "Level "+i +" description",
                    type: "text",
                    pholder: "Description"
                })
            }
            this.setState(prevState => ({
                questionitems: prevState.questionitems.concat(newitems)
            }));    
        } else if (e.target.value === "Text") {
            var newitems = [];
            this.setState(prevState => ({
                questionitems: prevState.questionitems.concat(newitems)
            })); 
        }
    }
    getFormItems() {
        const items = this.state.questionitems.map((item) => {
            if ( item.type === "text") {
                return (<Form.Group as={Row} controlId={item.controlId}>
                        <Form.Label column sm={3}>{item.label}</Form.Label>
                        <Col sm={9}><Form.Control placeholder={item.pholder} /></Col>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>)
                } else if ( item.type === "select") {
                   return (<Form.Group as={Row} controlId={item.controlId}>
                    <Form.Label column sm={3}>{item.label}</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="select" onChange={this.handleChange}>
                            <option selected disabled hidden>Choose here</option>
                            {
                                item.options.map ( (optitem) => {
                                    return (
                                        <option>{optitem}</option>
                                         )
                                })
                            }
                        </Form.Control>
                        </Col>
                    </Form.Group>)
        
                }else if ( item.type === "select-multiple") {
                    return (<Form.Group as={Row} controlId={item.controlId}>
                     <Form.Label column sm={3}>{item.label}</Form.Label>
                     <Col sm={9}>
                         <Form.Control as="select" onChange={this.handleChange} multiple >
                             <option selected disabled hidden>Choose here</option>
                             {
                                 item.options.map ( (optitem) => {
                                     return (
                                         <option>{optitem}</option>
                                          )
                                 })
                             }
                         </Form.Control>
                         </Col>
                     </Form.Group>)
         
                 }
            });
            console.log("Items", items);
        return items;

    }

    handleCreate=(e)=>{
        var newQuestionItems = [];
        var updatedQItems = {};

        var taggedToValue = [];
        var taggedToOptions = e.target.taggedTo.options;
            for (var i = 0, l = taggedToOptions.length; i < l; i++) {
                if (taggedToOptions[i].selected) {
                    taggedToValue.push(taggedToOptions[i].value);
                }
            }

        var rateDescVal = [];
            var ratedesc1 = e.target.ratedesc1.value;
            var ratedesc2 = e.target.ratedesc2.value;
            var ratedesc3 = e.target.ratedesc3.value;
            var ratedesc4 = e.target.ratedesc4.value;
            var ratedesc5 = e.target.ratedesc5.value;
        
            rateDescVal.push(ratedesc1);
            rateDescVal.push(ratedesc2);
            rateDescVal.push(ratedesc3);
            rateDescVal.push(ratedesc4);
            rateDescVal.push(ratedesc5);
            
        updatedQItems.category = e.target.category.value;
        updatedQItems.parentTag = e.target.parentTag.value;
        updatedQItems.qtype = e.target.qtype.value;
        updatedQItems.taggedTo = taggedToValue;
        updatedQItems.rateDescription = rateDescVal;
        updatedQItems.title = e.target.title.value;
        //newQuestionItems.push(updatedQItems);
        console.log("NewQuesItems", newQuestionItems);
        this.props.onAdd(updatedQItems);
        console.log("Successfully updated from Addques")
        this.props.handleClose(true);
    }
     
    
    render() {
        var items = this.getFormItems();
        return ( 
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          contentStyle={{width: "100%", maxWidth: "none"}}
          > <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Add Quetions</DialogTitle>
          <DialogContent >
            <Form id={"myform"} onSubmit = {this.handleCreate}>
                {items}
            </Form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type={"submit"} Form={"myform"}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        );   
    }
}

export default AddQuesDialog;


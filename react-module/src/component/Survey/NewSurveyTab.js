import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import './Survey.css';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        contained: {
          color: 'white',
          backgroundColor:'#3f4d67'
        },
      },
    },
  });

class NewSurveyTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            surveyItems: [
                {
                    controlId: "surveyType",
                    label: "Survey Type",
                    type: "select",
                    options: ["Role/Level Based", "CeremonyBased"]
                },
                {
                    controlId: "targetedRoles",
                    label: "Targeted Roles",
                    type: "select-multiple",
                    options: ["Developer", "Tester", "Manager", "ALL"]
                },
                {
                    controlId: "eventName",
                    label: "Event Name",
                    type: "text",
                    pholder: "Enter the event name"
                },

            ]
        }
        this.getSurveyFormItems = this.getSurveyFormItems.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    getSurveyFormItems() {
        const items = this.state.surveyItems.map((item) => {
            if ( item.type === "text") {
                return (<Form.Group as={Row} controlId={item.controlId}>
                        <Form.Label column sm={2}>{item.label}</Form.Label>
                        <Col sm={4}><Form.Control placeholder={item.pholder} /></Col>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>)
                } else if ( item.type === "select") {
                   return (<Form.Group as={Row} controlId={item.controlId}>
                    <Form.Label column sm={2}>{item.label}</Form.Label>
                    <Col sm={4}>
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
                     <Form.Label column sm={2}>{item.label}</Form.Label>
                     <Col sm={4}>
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
        return items;

    }

    handleCreate=(e)=>{
        var updatedEventItems = {};
        var targetedRolesValue = [];
        var targetedRolesOptions = e.target.targetedRoles.options;
            for (var i = 0, l = targetedRolesOptions.length; i < l; i++) {
                if (targetedRolesOptions[i].selected) {
                    targetedRolesValue.push(targetedRolesOptions[i].value);
                }
            }
        
        updatedEventItems.eventName = e.target.eventName.value;
        updatedEventItems.surveyType = e.target.surveyType.value;
        updatedEventItems.targetedRoles = targetedRolesValue;

        
        this.props.onAdd(updatedEventItems);
        console.log("Successfully updated from NewSurvey")
    }

    render() {
        
        var items = this.getSurveyFormItems();
        return(
            <ThemeProvider theme={theme}>
                <div className = "mysurveyform">
                    <Form id={"myform"} onSubmit={this.handleCreate}>
                        {items}
                        <Box display="flex" justifyContent="center" >
                            <Button variant="contained" type={"submit"} startIcon={<CreateIcon/>} Form={"myform"} >
                                Create
                            </Button>
                        </Box>
                    </Form>  
                </div>
                
            </ThemeProvider>
        )
    }
}

export default NewSurveyTab;
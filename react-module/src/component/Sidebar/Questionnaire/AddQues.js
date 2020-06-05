import React, { useState, Component }  from 'react'
import {Form} from 'react-bootstrap'

class AddQues extends React.Component {

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
                    options: ["RoleBased", "CeremonyBased"]
                },
                {
                    controlId: "taggedTo",
                    label: "Child Tag",
                    type: "select",
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
                    options: ["Rating", "Text"],
                    onchgfun : "<FunctionToBeCalled>"
                }
            ]
        }
        this.getFormItems = this.getFormItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange(e) {
        console.log("handleChange",e.target.value);
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
            }  
    }
    getFormItems() {
        const items = this.state.questionitems.map((item) => {
            if ( item.type === "text") {
                return (<Form.Group controlId={item.controlId}>
                        <Form.Label>{item.label}</Form.Label>
                        <Form.Control placeholder={item.pholder} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>)
                } else if ( item.type === "select") {
                   return (<Form.Group controlId={item.controlId}>
                    <Form.Label>{item.label}</Form.Label>
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
                    </Form.Group>)
        
                }
            });
        return items;
    }
     
    
    render() {
        var items = this.getFormItems();
        return ( 
            <Form>
                {items}
            </Form>
        );   
    }
}

export default AddQues;


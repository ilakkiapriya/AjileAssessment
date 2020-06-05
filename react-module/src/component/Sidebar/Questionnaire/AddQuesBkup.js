import React, { useState, Component }  from 'react'
import './AddQues.css'

class AddQues extends Component {
    state= {
        questions:[]
    }

    addQuestion() {
        this.setState({questions:[...this.state.questions,""]})
    }

    handleChange(e,index){
        this.state.questions[index]=e.target.value
        this.setState({questions:this.state.questions})
    }

    handleRemove(index){
        this.state.questions.splice(index,1)
        console.log(this.state.questions,"Removed")
        this.setState({questions:this.state.questions})
    }

    handleSave(e){
        console.log(this.state)
    }
    render() {
        return(
            <div className="container">
                <h2>Questions Adder</h2>
                <div className="addcontainer">
                <button className="addbutton" type="button" onClick={(e)=>this.addQuestion(e)}>
                    + Add Questions
                </button>
                </div>
                {
                    this.state.questions.map((question,index)=>{
                        return(
                            <div key={index}> Question:
                                <input onChange={(e)=>this.handleChange(e,index)}value={question}/>
                                <div>
                                    <button onClick={(e)=>this.handleSave(e)}>Save Question</button>
                                    <button onClick={()=>this.handleRemove(index)}>Remove Question</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        );
    }
}

export default AddQues;

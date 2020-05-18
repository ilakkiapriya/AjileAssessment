import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import InputLabel from '@material-ui/core/InputLabel';
import { render } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  
const handleClick = () => (
    <div classes="questextbox">
         <input type="text" />
    </div>
)


const AddingNewQues = () => {
    const classes = useStyles();
    return(
        <div className="quesAdder">
            <h2>Questions Adder</h2>
            <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                
            >
            Add Questions
            </Button>
        </div>

    );
}

export default AddingNewQues;
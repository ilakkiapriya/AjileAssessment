import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RoleTab from './RoleTab';
import CeremonyTab from './CeremonyTab';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    variant:"fullWidth",
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'black',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'black',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabs: {
    backgroundColor: 'aliceblue',
  },
}));

export default function QuestionsTabs({questionItems, onAdd}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("roledata data is " , questionItems);

function transformDataToUIModelForRoleQues() {
  var rolequestion =[];
  for (const i in questionItems) {
    var roleparentag = "Role/Level Based";
    if ( questionItems[i].parentTag === roleparentag ) {
      rolequestion.push(questionItems[i]);
    }
  }
  return rolequestion;
}

function transformDataToUIModelForCeremonyQues() {
  var ceremonyquestion =[];
  for (const i in questionItems) {
    var ceremonyparentag = "Ceremony Based";
    if ( questionItems[i].parentTag === ceremonyparentag ) {
      ceremonyquestion.push(questionItems[i]);
    }
  }
  return ceremonyquestion;
}

var rolequestions = transformDataToUIModelForRoleQues();
var ceremonyquestions = transformDataToUIModelForCeremonyQues();

  return (
    <div className={classes.root}>
      
      <div className={classes.tabs}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="RoleBased" />
          <StyledTab label="CeremonyBased" />
        </StyledTabs>
      </div>
      <TabPanel value={value} index={0}>
           <RoleTab rolequestion={rolequestions} onAdd={onAdd}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <CeremonyTab ceremonyquestion={ceremonyquestions}/>
        </TabPanel>
    </div>
  );
}

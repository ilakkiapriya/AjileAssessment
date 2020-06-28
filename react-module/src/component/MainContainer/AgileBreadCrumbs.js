import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';
import GrainIcon from '@material-ui/icons/Grain';

const theme = createMuiTheme({
  overrides: {
    MuiBreadcrumbs: {
      ol: {
        margin: '20px',
        padding:'5px',
        backgroundColor:'aliceblue'
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function AgileBreadCrumbs({bcprops}) {
  const classes = useStyles();

  function getBreadCrumbs(bc) {
    const Bciconval = bc["iconval"];
    if (bc.hasOwnProperty("linkTo")) {
        return(
        <Link to={`${bc.linkTo}`} >
          <Bciconval className={classes.icon} />
          {bc.name}
        </Link>);
    }else {
      return(
      <Typography component="span" color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        {bc.name}
      </Typography>
      )

     }  
  }

  return (
    <ThemeProvider theme={theme}>
    <Breadcrumbs aria-label="breadcrumb">
       {
       bcprops.map((bc)=>{ 
          console.log("Bc is",bc);
        return getBreadCrumbs(bc);
       })}
    </Breadcrumbs>
    </ThemeProvider>
  );
}

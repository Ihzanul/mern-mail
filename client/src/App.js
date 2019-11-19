import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddMail from './components/AddMail'
import EditMail from './components/EditMail'
import ListMail from './components/ListMail'
import PrintMail from './components/Print'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PrintIcon from '@material-ui/icons/Print';
// import GrainIcon from '@material-ui/icons/Grain';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 50
  },
  root: {
    padding: theme.spacing(1, 2),
  },
  link: {
    display: 'flex',
    color: 'black',
    textDecoration: 'none'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.container}>
        <Paper elevation={0} className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className={classes.link}>
              <HomeIcon className={classes.icon} />
              Tambah Surat
            </Link>
            <Link
              to="/list"
              className={classes.link}
            >
              <WhatshotIcon className={classes.icon} />
              Lihat Surat
            </Link>
            <Link to="/print" className={classes.link}>
              <PrintIcon className={classes.icon} />
              Cetak Daftar Surat
            </Link>
          </Breadcrumbs>
        </Paper>
        <Route path='/' exact component={AddMail} />
        <Route path='/edit/:id' exact component={EditMail} />
        <Route path='/list' exact component={ListMail} />
        <Route path='/print' exact component={PrintMail} />
      </div>
    </Router>
  );
}

export default App;

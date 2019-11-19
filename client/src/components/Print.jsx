import React, { useRef } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ReactToPrint from 'react-to-print'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
      marginLeft: 10,
      marginTop: 10
  },
  onPrint: {
    display: 'none'
  }
});

export default function Print() {
  const [mails, setMails] = React.useState(null)

  const classes = useStyles();
  const componentRef = useRef();

  const [onPrint, setOnPrint] = React.useState(false)

  React.useEffect(() => {
    axios.get('http://localhost:4000/list')
      .then(res => {
        setMails(res.data)
        // console.log(res.data[0])
      })
  }, [])

  class ComponentToPrint extends React.Component{
    render() {
      return (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nomor Surat</TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">Stambuk</TableCell>
              <TableCell align="center">Semester</TableCell>
              <TableCell className={onPrint ? classes.onPrint : ''} align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails.map(mail => {
              return (
                <TableRow key={mail.number}>
                  <TableCell align="center" component="th" scope="mail">
                    {mail.number}
                  </TableCell>
                  <TableCell align="center">{mail.name}</TableCell>
                  <TableCell align="center">{mail.nim}</TableCell>
                  <TableCell align="center">{mail.semester}</TableCell>
                  <TableCell  align="center">
                    <Link className={classes.link}>
                      Ubah
                    </Link>
                    |
                    <a href='#' >Hapus</a>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )
    }
  }
  
  return mails !== null ? (
    <div id='table1'>
      <Paper className={classes.root}>
      <ReactToPrint
        trigger={() => <Button onClick={console.log('asw')} variant="contained" color="primary" className={classes.button}>Cetak</Button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
      </Paper>
    </div>
  ) : (
    <div>Loading</div>
  )
}
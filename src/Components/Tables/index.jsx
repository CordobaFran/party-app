import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../Firebase/config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getDataFirebase = async () => {
  // Query the first page of docs
  const first = query(collection(db, "tables"));
  const documentSnapshots = await getDocs(first);

  // Get the last visible document
  const lastTable = documentSnapshots.docs[documentSnapshots.docs.length-1];
  // console.log("last", await documentSnapshots.docs[0].data().people);
  return documentSnapshots.docs.map((data)=>{
    data.data().people.map((e)=>{console.log(e.num, e.name, e.lastName)})
  })
}

getDataFirebase()

function createData(chairNum, name, lastName) {
  return { chairNum, name, lastName };
}

const rows = [
  createData("01", "Franco", "Cordoba")
]

export default function Tables() {
  return (
    <TableContainer component={Paper} sx={{width: 350}}>
      <Table sx={{ minwidth: 300 }} aria-label="customized table">
        {/* <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.chairNum}>
              <StyledTableCell component="th" scope="row">
                {row.chairNum}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../Firebase/config';
import MenuBtnAddGuest from '../MenuBtnAddGuest';

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

function createData(chairNum, name, lastName) {
  return { chairNum, name, lastName };
}


export default function Tables(data) {
  const rows = [

  ]
  // console.log(data.data.people)
  data.data.people.forEach(element => {
    // console.log(element);
    rows.push(createData(element.num, element.name, element.lastName))
  })
  


  return (
    <TableContainer component={Paper} sx={{width: 350}}>
      <Table sx={{ minwidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={4} sx={{fontSize: 24}}>
              Mesa {data.data.id}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>N°</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.chairNum}>
              <StyledTableCell component="th" scope="row">
                {row.chairNum}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align='right'>
                <MenuBtnAddGuest tableData={{tableNum: data.data.id, chairNum: row.chairNum}}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

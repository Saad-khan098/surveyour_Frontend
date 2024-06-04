import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import styles from './viewForm.module.css'
import { useRouter } from 'next/navigation';


export default function BasicTable({responses,pagination}) {

  const router = useRouter();

    if(responses.length == 0){

        return (
            <div className={styles.noForms}>
                <p>No Recorded Responses Yet</p>
            </div>       
        )
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Response Number</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses.map((response,index) => (
            <TableRow
              key={response._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{(pagination.page - 1)*pagination.perPage + index + 1}</TableCell>
              <TableCell>{response.createdAt}</TableCell>
              <TableCell>{<Button variant='contained' onClick={()=>{router.push(`/response?responseId=${response._id}`)}}>Open</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

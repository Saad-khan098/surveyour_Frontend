import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import styles from '../viewForm/viewForm.module.css'
import { useRouter } from 'next/navigation';


export default function BasicTable({elements,pagination}) {

  const router = useRouter();

    if(elements.length == 0){

        return (
            <div className={styles.noForms}>
                <p>No Elements</p>
            </div>       
        )
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Element Number</TableCell>
            <TableCell>Question</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.map((element,index) => (
            <TableRow
              key={element._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index}</TableCell>
              <TableCell>{element.question}</TableCell>
              <TableCell>{<Button variant='contained' onClick={()=>{router.push(`/elementStats?elementId=${element._id}`)}}>View</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

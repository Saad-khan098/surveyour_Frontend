import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import styles from './dashboard.module.css'
import { useRouter } from 'next/navigation';


export default function BasicTable({forms}) {

  const router = useRouter();

    if(forms.length == 0){

        return (
            <div className={styles.noForms}>
                <p>You have not created any forms yet</p>
            </div>       
        )
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Form Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((form) => (
            <TableRow
              key={form._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{form.name}</TableCell>
              <TableCell>{form.createdAt}</TableCell>
              <TableCell>{<Button variant='contained' onClick={()=>{router.push(`/viewForm?formId=${form._id}`)}}>Open</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

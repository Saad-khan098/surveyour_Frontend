import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Mail } from '@mui/icons-material';

const columns = [
  { id: 'sr', label: 'Response No.', minWidth: 170, format: (value) => value.toLocaleString('en-US'), },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'date',
    label: 'Response Date',
    minWidth: 170,
    align: 'right',
  },
 
];

function createData(sr, name, email, date) {
  return { sr, name, email, date };
}

const rows = [
  createData(1, 'Musab Iqbal', 'Sample@mail.com', '11/03/24'),
  createData(2, 'Saad Ahmed Khan', 'Sample@mail.com','15/03/24'),
  createData(3, 'N/A', 'Sample@mail.com','11/03/24'),
  createData(4, 'Musab Iqbal', 'N/A','11/03/24'),
  createData(5, 'Musab Iqbal', 'Sample@mail.com','15/03/24'),
  createData(6, 'Musab Iqbal', 'Sample@mail.com','11/03/24'),
  createData(7, 'Saad Ahmed Khan', 'Sample@mail.com','15/03/24'),
  createData(8, 'Musab Iqbal', 'Sample@mail.com','11/03/24'),
  createData(9, 'Musab Iqbal', 'Sample@mail.com','11/03/24'),
  createData(10, 'Saad Ahmed Khan', 'Sample@mail.com','15/03/24'),
  createData(11, 'Saad Ahmed Khan', 'N/A','11/03/24'),
  createData(12, 'N/A', 'Sample@mail.com','11/03/24'),
  createData(13, 'Saad Ahmed Khan', 'Sample@mail.com','15/03/24'),
  createData(14, 'Musab Iqbal', 'N/A','11/03/24'),
  createData(15, 'Musab Iqbal', 'Sample@mail.com','11/03/24'),
];

export default function tableCard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}> 
      <Paper sx={{ width: '95%', overflow: 'hidden', borderRadius: '18px' }}>
        <TableContainer sx={{ height: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ fontWeight: 'bold'}}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: "#444444", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === 'viewResponse') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button variant="contained" color="primary" onClick={() => console.log('View response clicked')}>
                                View Response
                              </Button>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}> 
//     <Paper sx={{ width: '95%', overflow: 'hidden' , borderRadius: '18px'}}>
//       <TableContainer sx={{ height: '100%' }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead sx={{ fontWeight: 'bold'}}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: "#444444", color: "white" }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </div>
//   );
// }
import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TextField, TablePagination, TableSortLabel, Fade 
} from '@mui/material';
import notesData from '../data/data.json'; // Notez le ../ pour remonter d'un dossier

// --- FONCTION UTILITAIRE : APPRÉCIATION ---
const getAppreciation = (grade) => {
  if (grade >= 16) return { label: "Excellent", class: "excellent" };
  if (grade >= 14) return { label: "Très Bien", class: "tres" };
  if (grade >= 12) return { label: "Bien", class: "bien" };
  if (grade >= 10) return { label: "Passable", class: "passable" };
  return { label: "Insuffisant", class: "insuffisant" };
};

function NotesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('desc');

  const filteredData = notesData.filter((row) =>
    row.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.student.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      return order === 'asc' ? a.grade - b.grade : b.grade - a.grade;
    });
  }, [filteredData, order]);

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Fade in={true} timeout={600}>
      <TableContainer component={Paper} sx={{ maxWidth: 950, margin: '20px auto', p: 2 }}>
        <TextField 
          label="Rechercher un étudiant ou une matière..." 
          fullWidth margin="normal"
          variant="outlined"
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
        />
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Cours</TableCell>
              <TableCell>Étudiant</TableCell>
              <TableCell align="right">
                <TableSortLabel active direction={order} onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                  Note / 20
                </TableSortLabel>
              </TableCell>
              <TableCell>Appréciation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const app = getAppreciation(row.grade);
              return (
                <TableRow key={row.unique_id} hover>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{row.student.firstname} {row.student.lastname}</TableCell>
                  <TableCell align="right">{row.grade}/20</TableCell>
                  <TableCell>
                    <span className={`badge ${app.class}`}>{app.label}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </TableContainer>
    </Fade>
  );
}

export default NotesList;
 import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, TextField, TablePagination, TableSortLabel, Fade, Box 
} from '@mui/material';
import './App.css';
import notesData from './data/data.json';

// --- FONCTION UTILITAIRE : APPRÉCIATION ---
const getAppreciation = (grade) => {
  if (grade >= 16) return { label: "Excellent", class: "excellent" };
  if (grade >= 14) return { label: "Très Bien", class: "tres" };
  if (grade >= 12) return { label: "Bien", class: "bien" };
  if (grade >= 10) return { label: "Passable", class: "passable" };
  return { label: "Insuffisant", class: "insuffisant" };
};

// --- COMPOSANT : HEADER ---
function Header({ onMenuClick, activeMenu }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
  return (
    <header className="header-container">
      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item}>
              <button 
                className={activeMenu === item ? 'active' : ''} 
                onClick={() => onMenuClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>Introduction à React</Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>A la découverte des premières notions de React</Typography>
      </Box>
    </header>
  );
}

// --- COMPOSANT : LISTE DES NOTES ---
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

// --- COMPOSANT : FOOTER ---
function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px' }}>
      <Typography variant="body2" sx={{ color: 'white' }}>
        © 2025 - Réalisé par <strong>Sarhani Aya</strong> - EMSI. Tous droits réservés.
      </Typography>
    </footer>
  );
}

// --- COMPOSANT PRINCIPAL : APP ---
function App() {
  const [activeMenu, setActiveMenu] = useState('Notes');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Notes': 
        return <NotesList />;
      case 'Etudiants': 
        return <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}><h3>Gestion des {notesData.length} Étudiants</h3></Box>;
      case 'Matières': 
        return <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}><h3>Liste des Matières</h3></Box>;
      case 'A propos': 
        return (
          <Fade in timeout={600}>
            <Paper sx={{ p: 4, maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
              <Typography variant="h5" color="primary" gutterBottom>Informations</Typography>
              <Typography variant="body1">Projet : Gestion de Notes React</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                Développeur : Sarhani Aya
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>Université EMSI - 2025</Typography>
            </Paper>
          </Fade>
        );
      default: return <NotesList />;
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', background: '#1a0033' }}>
      <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
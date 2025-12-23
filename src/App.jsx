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
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>Session 02 : Gestion dynamique et Optimisation</Typography>
      </Box>
    </header>
  );
}

// --- COMPOSANT : LISTE DES NOTES (Onglet principal) ---
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
        // Extraction des noms uniques
        const uniqueStudents = [...new Set(notesData.map(item => `${item.student.firstname} ${item.student.lastname}`))];
        return (
          <Fade in timeout={600}>
            <Box sx={{ p: 4, color: 'white', maxWidth: 600, margin: '0 auto' }}>
              <Typography variant="h5" gutterBottom>Liste des {uniqueStudents.length} Étudiants</Typography>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid #444' }}>
                {uniqueStudents.sort().map((name, index) => (
                  <Typography key={index} sx={{ borderBottom: '1px solid #333', py: 1.5, px: 2 }}>
                    👤 {name}
                  </Typography>
                ))}
              </Paper>
            </Box>
          </Fade>
        );

      case 'Matières': 
        // Extraction des matières uniques
        const uniqueCourses = [...new Set(notesData.map(item => item.course))];
        return (
          <Fade in timeout={600}>
            <Box sx={{ p: 4, color: 'white', maxWidth: 600, margin: '0 auto' }}>
              <Typography variant="h5" gutterBottom>Modules de formation</Typography>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid #444' }}>
                {uniqueCourses.sort().map((course, index) => (
                  <Typography key={index} sx={{ borderBottom: '1px solid #333', py: 1.5, px: 2 }}>
                    📚 {course}
                  </Typography>
                ))}
              </Paper>
            </Box>
          </Fade>
        );

      case 'A propos': 
        return (
          <Fade in timeout={600}>
            <Paper sx={{ p: 4, maxWidth: 500, margin: '40px auto', textAlign: 'center', bgcolor: '#fff' }}>
              <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>Informations Projet</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}><strong>Titre :</strong> Gestion de Notes avec React</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}><strong>Développeur :</strong> Sarhani Aya</Typography>
              <Typography variant="body1"><strong>Établissement :</strong> EMSI</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>Version 1.0 - Année Universitaire 2025</Typography>
            </Paper>
          </Fade>
        );

      default: return <NotesList />;
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', background: '#1a0033', paddingBottom: '20px' }}>
      <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
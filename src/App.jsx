import { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, TextField, TablePagination, TableSortLabel, Fade 
} from '@mui/material';
import './App.css';
import Todo from './components/Todo';
import notesData from './data/data.json';

// --- COMPOSANT HEADER ---
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
      <div style={{ textAlign: 'center' }}>
        <h1>Introduction à React</h1>
        <h3>Session 02 : Optimisation et Listes Dynamiques</h3>
      </div>
    </header>
  );
}

// --- COMPOSANT LISTE DES NOTES (Optimisé) ---
function NotesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');

  // Filtrage
  const filteredNotes = notesData.filter((item) =>
    item.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri
  const sortedNotes = useMemo(() => {
    return [...filteredNotes].sort((a, b) => {
      if (order === 'asc') return a.note - b.note;
      return b.note - a.note;
    });
  }, [filteredNotes, order]);

  // Pagination
  const paginatedNotes = sortedNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Fade in={true} timeout={1000}>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '20px auto', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Gestion des Notes</Typography>
        
        <TextField 
          label="Rechercher une matière..." 
          variant="outlined"
          fullWidth 
          margin="normal"
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Matière</strong></TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                >
                  <strong>Note / 20</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell><strong>Appréciation</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedNotes.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.matiere}</TableCell>
                <TableCell align="right">{row.note}</TableCell>
                <TableCell>{row.appreciation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredNotes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </TableContainer>
    </Fade>
  );
}

// --- COMPOSANT FOOTER ---
function Footer() {
  return (
    <footer className="footer" style={{ textAlign: 'center', padding: '20px' }}>
      <p>© {new Date().getFullYear()} - [Votre Nom], Tous droits réservés.</p>
    </footer>
  );
}

// --- COMPOSANT PRINCIPAL APP ---
function App() {
  const [activeMenu, setActiveMenu] = useState('Notes');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Notes': return <NotesList />;
      case 'Etudiants': return <div className="placeholder">Liste des Étudiants</div>;
      case 'Matières': return <div className="placeholder">Liste des Matières</div>;
      case 'A propos': return <div className="placeholder">Projet React - Session 02</div>;
      default: return <NotesList />;
    }
  };

  return (
    <div className="app-container">
      <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
      <main>{renderContent()}</main>
      <Footer />
    </div>
  );
}

export default App;
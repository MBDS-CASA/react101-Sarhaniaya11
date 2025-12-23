import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import notesData from './data/data.json';
import { TextField } from '@mui/material';

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
      <h1>Introduction à React</h1>
      <h3>A la découverte des premières notions de React</h3>
    </header>
  );
}

// Composant pour afficher les Notes sous forme de tableau MUI
function NotesList() {
  function NotesList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrage des données en fonction de la recherche
  const filteredNotes = notesData.filter((item) =>
    item.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto', p: 2 }}>
      <Typography variant="h6">Liste des Notes</Typography>
      
      {/* Barre de recherche */}
      <TextField 
        label="Rechercher une matière..." 
        variant="outlined" 
        fullWidth 
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Matière</strong></TableCell>
            <TableCell align="right"><strong>Note</strong></TableCell>
            <TableCell><strong>Appréciation</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredNotes.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.matiere}</TableCell>
              <TableCell align="right">{row.note}/20</TableCell>
              <TableCell>{row.appreciation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto' }}>
//       <Typography variant="h6" sx={{ p: 2 }}>Liste des Notes</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Matière</strong></TableCell>
//             <TableCell align="right"><strong>Note</strong></TableCell>
//             <TableCell><strong>Appréciation</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {notesData.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.matiere}</TableCell>
//               <TableCell align="right">{row.note}/20</TableCell>
//               <TableCell>{row.appreciation}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

function App() {
  const [activeMenu, setActiveMenu] = useState('Notes');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Notes': return <NotesList />;
      case 'Etudiants': return <div className="placeholder">Contenu Étudiants</div>;
      case 'Matières': return <div className="placeholder">Contenu Matières</div>;
      case 'A propos': return <div className="placeholder">Ce projet est réalisé par [Votre Nom]</div>;
      default: return <NotesList />;
    }
  };

  return (
    <div className="app-container">
      <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
      <main>{renderContent()}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
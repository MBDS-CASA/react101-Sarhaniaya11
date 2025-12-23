// // import { useState, useMemo } from 'react';
// // import { 
// //   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
// //   Paper, Typography, TextField, TablePagination, TableSortLabel, Fade 
// // } from '@mui/material';
// // import './App.css';
// // import Todo from './components/Todo';
// // import notesData from './data/data.json';

// // // --- COMPOSANT HEADER ---
// // function Header({ onMenuClick, activeMenu }) {
// //   const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
// //   return (
// //     <header className="header-container">
// //       <nav className="nav-menu">
// //         <ul>
// //           {menuItems.map((item) => (
// //             <li key={item}>
// //               <button 
// //                 className={activeMenu === item ? 'active' : ''} 
// //                 onClick={() => onMenuClick(item)}
// //               >
// //                 {item}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //       <div style={{ textAlign: 'center' }}>
// //         <h1>Introduction à React</h1>
// //         <h3>Session 02 : Optimisation et Listes Dynamiques</h3>
// //       </div>
// //     </header>
// //   );
// // }

// // // --- COMPOSANT LISTE DES NOTES (Optimisé) ---
// // function NotesList() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [order, setOrder] = useState('asc');

// //   // Filtrage
// //   const filteredNotes = notesData.filter((item) =>
// //     item.matiere.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // Tri
// //   const sortedNotes = useMemo(() => {
// //     return [...filteredNotes].sort((a, b) => {
// //       if (order === 'asc') return a.note - b.note;
// //       return b.note - a.note;
// //     });
// //   }, [filteredNotes, order]);

// //   // Pagination
// //   const paginatedNotes = sortedNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   return (
// //     <Fade in={true} timeout={1000}>
// //       <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '20px auto', p: 2 }}>
// //         <Typography variant="h6" sx={{ mb: 2 }}>Gestion des Notes</Typography>
        
// //         <TextField 
// //           label="Rechercher une matière..." 
// //           variant="outlined"
// //           fullWidth 
// //           margin="normal"
// //           onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
// //         />

// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell><strong>Matière</strong></TableCell>
// //               <TableCell align="right">
// //                 <TableSortLabel
// //                   active={true}
// //                   direction={order}
// //                   onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
// //                 >
// //                   <strong>Note / 20</strong>
// //                 </TableSortLabel>
// //               </TableCell>
// //               <TableCell><strong>Appréciation</strong></TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedNotes.map((row) => (
// //               <TableRow key={row.id} hover>
// //                 <TableCell>{row.matiere}</TableCell>
// //                 <TableCell align="right">{row.note}</TableCell>
// //                 <TableCell>{row.appreciation}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>

// //         <TablePagination
// //           rowsPerPageOptions={[5, 10]}
// //           component="div"
// //           count={filteredNotes.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={(e, newPage) => setPage(newPage)}
// //           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
// //         />
// //       </TableContainer>
// //     </Fade>
// //   );
// // }

// // // --- COMPOSANT FOOTER ---
// // function Footer() {
// //   return (
// //     <footer className="footer" style={{ textAlign: 'center', padding: '20px' }}>
// //       <p>© {new Date().getFullYear()} - [Votre Nom], Tous droits réservés.</p>
// //     </footer>
// //   );
// // }

// // // --- COMPOSANT PRINCIPAL APP ---
// // function App() {
// //   const [activeMenu, setActiveMenu] = useState('Notes');

// //   const renderContent = () => {
// //     switch (activeMenu) {
// //       case 'Notes': return <NotesList />;
// //       case 'Etudiants': return <div className="placeholder">Liste des Étudiants</div>;
// //       case 'Matières': return <div className="placeholder">Liste des Matières</div>;
// //       case 'A propos': return <div className="placeholder">Projet React - Session 02</div>;
// //       default: return <NotesList />;
// //     }
// //   };

// //   return (
// //     <div className="app-container">
// //       <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
// //       <main>{renderContent()}</main>
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default App;
// import { useState, useMemo } from 'react';
// import { 
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
//   Paper, Typography, TextField, TablePagination, TableSortLabel, Fade, Box
// } from '@mui/material';
// import './App.css';
// import notesData from './data/data.json';

// // --- FONCTION UTILITAIRE POUR L'APPRÉCIATION ---
// const getAppreciation = (grade) => {
//   if (grade >= 90) return "Excellent";
//   if (grade >= 70) return "Très Bien";
//   if (grade >= 50) return "Passable";
//   return "Insuffisant";
// };

// // --- COMPOSANT HEADER ---
// function Header({ onMenuClick, activeMenu }) {
//   const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
//   return (
//     <header className="header-container">
//       <nav className="nav-menu">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item}>
//               <button 
//                 className={activeMenu === item ? 'active' : ''} 
//                 onClick={() => onMenuClick(item)}
//               >
//                 {item}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <Box sx={{ textAlign: 'center', my: 4 }}>
//         <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//           Gestion Académique
//         </Typography>
//         <Typography variant="h6" color="textSecondary">
//           Session 02 : Traitement de données JSON complexes
//         </Typography>
//       </Box>
//     </header>
//   );
// }

// // --- COMPOSANT LISTE DES NOTES (Mis à jour pour le nouveau JSON) ---
// function NotesList() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [order, setOrder] = useState('desc'); // Par défaut les meilleures notes en premier

//   // 1. Filtrage (Recherche par cours ou par nom d'étudiant)
//   const filteredNotes = notesData.filter((item) =>
//     item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.student.lastname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 2. Tri (Basé sur le champ 'grade')
//   const sortedNotes = useMemo(() => {
//     return [...filteredNotes].sort((a, b) => {
//       if (order === 'asc') return a.grade - b.grade;
//       return b.grade - a.grade;
//     });
//   }, [filteredNotes, order]);

//   // 3. Pagination
//   const paginatedNotes = sortedNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Fade in={true} timeout={1000}>
//       <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: '20px auto', p: 3, boxShadow: 3 }}>
//         <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>Liste des Résultats</Typography>
        
//         <TextField 
//           label="Rechercher un cours ou un étudiant..." 
//           variant="outlined"
//           fullWidth 
//           margin="normal"
//           placeholder="Ex: Math, Physics, Gonzalez..."
//           onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
//         />

//         <Table>
//           <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//             <TableRow>
//               <TableCell><strong>Cours</strong></TableCell>
//               <TableCell><strong>Étudiant</strong></TableCell>
//               <TableCell align="center"><strong>Date</strong></TableCell>
//               <TableCell align="right">
//                 <TableSortLabel
//                   active={true}
//                   direction={order}
//                   onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
//                 >
//                   <strong>Note / 100</strong>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell><strong>Appréciation</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedNotes.map((row) => (
//               <TableRow key={row.unique_id} hover>
//                 <TableCell>{row.course}</TableCell>
//                 <TableCell>{row.student.firstname} {row.student.lastname}</TableCell>
//                 <TableCell align="center">{row.date}</TableCell>
//                 <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.grade}</TableCell>
//                 <TableCell>
//                    <span className={`badge ${getAppreciation(row.grade).toLowerCase()}`}>
//                     {getAppreciation(row.grade)}
//                    </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredNotes.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//         />
//       </TableContainer>
//     </Fade>
//   );
// }

// // --- COMPOSANT FOOTER ---
// function Footer() {
//   return (
//     <footer className="footer" style={{ textAlign: 'center', padding: '40px 20px', marginTop: 'auto' }}>
//       <hr style={{ width: '50%', opacity: 0.2, marginBottom: '20px' }} />
//       <p>© {new Date().getFullYear()} - [Votre Prénom] [Votre Nom] - TD React EMSI</p>
//     </footer>
//   );
// }

// // --- COMPOSANT PRINCIPAL APP ---
// function App() {
//   const [activeMenu, setActiveMenu] = useState('Notes');

//   const renderContent = () => {
//     switch (activeMenu) {
//       case 'Notes': return <NotesList />;
//       case 'Etudiants': return <div className="placeholder">Module de gestion des étudiants (Prochaine étape)</div>;
//       case 'Matières': return <div className="placeholder">Liste des matières disponibles</div>;
//       case 'A propos': return <div className="placeholder">Application de gestion de notes v2.0</div>;
//       default: return <NotesList />;
//     }
//   };

//   return (
//     <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
//       <main style={{ flex: 1 }}>{renderContent()}</main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, TextField, TablePagination, TableSortLabel, Fade, Box 
} from '@mui/material';
import './App.css';
import notesData from './data/data.json';

// --- FONCTION UTILITAIRE : APPRÉCIATION ---
const getAppreciation = (grade) => {
  if (grade >= 90) return { label: "Excellent", class: "excellent" };
  if (grade >= 70) return { label: "Très Bien", class: "tres" };
  if (grade >= 50) return { label: "Passable", class: "passable" };
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
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Introduction à React</Typography>
        <Typography variant="subtitle1" color="textSecondary">Session 02 : Optimisation et Tableaux MUI</Typography>
      </Box>
    </header>
  );
}

// --- COMPOSANT : LISTE DES NOTES (Optimisé) ---
function NotesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('desc');

  // Filtrage
  const filteredData = notesData.filter((row) =>
    row.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.student.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      return order === 'asc' ? a.grade - b.grade : b.grade - a.grade;
    });
  }, [filteredData, order]);

  // Pagination
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Fade in={true} timeout={600}>
      <TableContainer component={Paper} sx={{ maxWidth: 950, margin: '20px auto', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Résultats des examens</Typography>
        
        <TextField 
          label="Rechercher (Cours ou Étudiant)..." 
          fullWidth margin="normal"
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
        />

        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Cours</TableCell>
              <TableCell>Étudiant</TableCell>
              <TableCell align="right">
                <TableSortLabel active direction={order} onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                  Note / 100
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
                  <TableCell align="right">{row.grade}</TableCell>
                  <TableCell>
                    <span className={`badge ${app.class}`}>{app.label}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
    <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #ddd', marginTop: '40px' }}>
      <Typography variant="body2">© 2025 - Réalisé par [Votre Nom] - EMSI</Typography>
    </footer>
  );
}

// --- COMPOSANT : APP (MAIN) ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState('Notes');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Notes': 
        return <NotesList />;
      case 'Etudiants': 
        return <Fade in timeout={600}><Box sx={{ p: 4, textAlign: 'center' }}><h3>Module Étudiants : {notesData.length} inscrits</h3></Box></Fade>;
      case 'Matières': 
        return <Fade in timeout={600}><Box sx={{ p: 4, textAlign: 'center' }}><h3>Liste des matières disponibles</h3></Box></Fade>;
      case 'A propos': 
        return (
          <Fade in timeout={600}>
            <Paper sx={{ p: 4, maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
              <Typography variant="h5" color="primary">Informations</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>Projet : Gestion de Notes React</Typography>
              <Typography variant="body1">Développeur : [Votre Nom]</Typography>
              <Typography variant="body2" color="textSecondary">Université EMSI - 2025</Typography>
            </Paper>
          </Fade>
        );
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
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom'; // Nouveaux imports
import { Typography, Fade, Box, Paper } from '@mui/material';
import './App.css';
import NotesList from './components/NotesList'; // Assure-toi que le chemin est correct
import notesData from './data/data.json';

// --- COMPOSANT : HEADER (Version Routage) ---
function Header() {
  return (
    <header className="header-container">
      <nav className="nav-menu">
        <ul>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Notes</NavLink></li>
          <li><NavLink to="/etudiants" className={({ isActive }) => isActive ? 'active' : ''}>Etudiants</NavLink></li>
          <li><NavLink to="/matieres" className={({ isActive }) => isActive ? 'active' : ''}>Matières</NavLink></li>
          <li><NavLink to="/a-propos" className={({ isActive }) => isActive ? 'active' : ''}>A propos</NavLink></li>
        </ul>
      </nav>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>Introduction à React</Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>Session 03 : Routage avec React Router</Typography>
      </Box>
    </header>
  );
}

// --- COMPOSANT : FOOTER ---
function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px' }}>
      <Typography variant="body2" sx={{ color: 'white' }}>
        © 2025 - Réalisé par <strong>Sarhani Aya</strong> - EMSI.
      </Typography>
    </footer>
  );
}

// --- COMPOSANT PRINCIPAL : APP ---
function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', background: '#1a0033' }}>
      <Header />
      
      <main>
        {/* Définition des chemins (URLs) pour chaque page */}
        <Routes>
          <Route path="/" element={<NotesList />} />
          
          <Route path="/etudiants" element={
            <Fade in timeout={600}>
              <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}>
                <h3>Gestion des Étudiants</h3>
                <p>Total : {notesData.length} enregistrements.</p>
              </Box>
            </Fade>
          } />

          <Route path="/matieres" element={
            <Fade in timeout={600}>
              <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}>
                <h3>Liste des Matières</h3>
              </Box>
            </Fade>
          } />

          <Route path="/a-propos" element={
            <Fade in timeout={600}>
              <Paper sx={{ p: 4, maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
                <Typography variant="h5" color="primary">Informations</Typography>
                <Typography sx={{ mt: 2 }}>Développeur : Sarhani Aya</Typography>
                <Typography variant="body2" color="textSecondary">Université EMSI - 2025</Typography>
              </Paper>
            </Fade>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
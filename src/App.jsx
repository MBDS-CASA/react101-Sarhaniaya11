import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function Header() {
  function Header() {
  // 1. Liste des éléments demandés pour le menu
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  // 2. Fonction qui affiche l'alerte avec le texte de l'élément
  const handleMenuClick = (item) => {
    alert(item);
  };

  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      {/* Menu de navigation en haut à gauche */}
      <nav>
        <ul style={{ 
          display: 'flex', 
          gap: '15px', 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          justifyContent: 'flex-start' // Aligné à gauche
        }}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => handleMenuClick(item)}
                style={{ cursor: 'pointer', padding: '5px 10px' }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Titres du projet */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Introduction à React</h1>
        <h3>A la découverte des premières notions de React</h3>
      </div>
    </header>
  );
}
  // Liste des éléments du menu
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  // Fonction pour gérer le clic et afficher l'alerte
  const handleMenuClick = (item) => {
    alert(item);
  };

  return (
    <header style={{ textAlign: 'left', padding: '10px' }}>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', padding: 0 }}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => handleMenuClick(item)}
                style={{ cursor: 'pointer', background: 'none', border: '1px solid #ccc', padding: '5px 10px' }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ textAlign: 'center' }}>
        <h1>Introduction à React</h1>
        <h3>A la découverte des premières notions de React</h3>
      </div>
    </header>
  );
}

function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="footer" style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>© {annee} - [Votre Prénom].[Votre Nom], Tous droits réservés.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <Todo />
      <Footer />
    </div>
  );
}

export default App;
 import { useState } from 'react'
import Emsi from './assets/logo_emsi.png'
import UCA from './assets/LOGO_UCA.jpg'
import './App.css'

// Composant Header : Logo, Titre et Sous-Titre
function Header() {
  return (
    <header>
      <div>
        <img src={Emsi} className="logo Emsi" alt="Emsi" />
        <img src={UCA} className="logo UCA" alt="UCA" />
      </div>
      <h1>Introduction à React</h1>
      <h3>A la découverte des premières notions de React</h3>
    </header>
  );
}

// Composant MainContent : Texte spécifique
function MainContent() {
  return (
    <main className="content">
      <p>Ici, nous afficherons des informations intéressantes :)</p>
    </main>
  );
}

// Composant Footer : Texte centré en bas
function Footer() {
  return (
    <footer className="footer">
      <p>Tous droits réservés - [Votre Nom] [Votre Prénom]</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
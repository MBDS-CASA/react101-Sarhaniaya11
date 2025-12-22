import { useState, useEffect } from 'react'
import Emsi from './assets/logo_emsi.png'
import UCA from './assets/LOGO_UCA.jpg'
import './App.css'

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

function MainContent() {
  const [now, setNow] = useState(new Date());

  // Mise à jour de l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formattage de la date : "Bonjour, on est le [Jour], [Mois], [Annee]..."
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  const dateAffichee = `${jours[now.getDay()]} ${now.getDate()} ${mois[now.getMonth()]} ${now.getFullYear()}`;
  const heureAffichee = now.toLocaleTimeString('fr-FR');

  return (
    <main className="content">
      <p>Bonjour, on est le {dateAffichee} et il est {heureAffichee}</p>
    </main>
  );
}

function Footer() {
  const anneeActuelle = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {anneeActuelle} - [Prénom].[Nom], Tous droits réservés.</p>
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
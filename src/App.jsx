 import { useState } from 'react';
import Todo from './components/Todo';
// Importez vos futurs composants ici

function App() {
  const [activeMenu, setActiveMenu] = useState('Notes'); // État pour le menu

  // Fonction pour afficher le bon composant selon le menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'Notes': return <Todo />; // Votre composant du TD03
      case 'Etudiants': return <div>Liste des Étudiants (MUI Table à venir)</div>;
      case 'Matières': return <div>Liste des Matières</div>;
      case 'A propos': return <div>Réalisé par [Prénom] [Nom]</div>;
      default: return <Todo />;
    }
  };

  return (
    <div className="app-container">
      {/* Passez setActiveMenu au Header pour changer l'onglet */}
      <Header onMenuClick={setActiveMenu} activeMenu={activeMenu} />
      <main className="content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
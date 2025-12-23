// import React from 'react';

// // Composant qui reçoit l'objet 'item' en prop
// export function NoteDetail({ item }) {
//   if (!item) return <p>Aucune donnée disponible</p>;
  
//   return (
//     <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '20px' }}>
//       <h3>Détails de la Note (TD03)</h3>
//       <p><strong>Matière :</strong> {item.matiere}</p>
//       <p><strong>Note :</strong> {item.note}/20</p>
//       <p><strong>Appréciation :</strong> {item.appreciation}</p>
//     </div>
//   );
// }

// // Composant principal Todo qui gère la logique aléatoire
// export default function Todo() {
//   // Importation dynamique ou simulation de sélection aléatoire
//   const notesData = [
//     { "id": 1, "matiere": "React", "note": 18, "appreciation": "Excellent" },
//     { "id": 2, "matiere": "Java", "note": 15, "appreciation": "Très bien" }
//   ];

//   const randomNote = notesData[Math.floor(Math.random() * notesData.length)];

//   return (
//     <div>
//       <NoteDetail item={randomNote} />
//     </div>
//   );
// }
import React from 'react';
import notesData from '../data/data.json'; // Notez le ../ pour remonter d'un dossier

export function NoteDetail({ item }) {
  return (
    <div className="note-card">
      <h3>Détails de la Note</h3>
      <p><strong>Matière :</strong> {item.matiere}</p>
      <p><strong>Note :</strong> {item.note}/20</p>
    </div>
  );
}

export default function Todo() {
  const randomNote = notesData[Math.floor(Math.random() * notesData.length)];
  return <NoteDetail item={randomNote} />;
}